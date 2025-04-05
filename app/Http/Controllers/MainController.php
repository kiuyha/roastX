<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormSubmission;
use App\Models\PreviousResponse;
use App\Models\ServiceLog;
use DOMDocument;
use DOMXPath;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Number;

class MainController extends Controller
{
    private $supportedLanguages = ['en', 'id'];

    public function detectLanguage(Request $request): RedirectResponse
    {
        // Get the browser's preferred language
        $preferredLanguage = substr($request->header('Accept-Language'), 0, 2); // e.g., 'en', 'id'

        //redirect to preferred language landing page;
        return to_route('main', ['lang' => in_array($preferredLanguage, $this->supportedLanguages) ? $preferredLanguage : 'en']);
    }

    public function mainPage(String $lang): View
    {
        if (!in_array($lang, $this->supportedLanguages)) abort(404);
        return view('index', ['lang' => $lang]);
    }

    public function fetchData(Request $request, String $lang): JsonResponse
    {
        if (!in_array($lang, $this->supportedLanguages)) abort(404);
        
        $data = $request->all();
        $username = $data['username'];
        
        // check username validation
        if (!$username || !is_string($username)){
            return response()->json([
                'success' => false,
                'message' => $lang == 'en' ? 
                    'Please enter a Twitter/X username.' :
                    'Silahkan masukkan username Twitter/X.'
            ], 400);
        } 

        $token = $data['turnstileToken'];
        $ip = $this->getUserIpAdress();

        if (!$this->checkTurnstile($token, $ip)) {
            return response()->json([
                'success' => false,
                'message' => $lang == 'en' ? 
                    'You have been detected as a robot.' :
                    'Kamu telah terdeteksi sebagai robot.'
            ], 400);
        }

        // check previous response
        $previousResponse = PreviousResponse::where('username', $username)->first();

        $save = fn() => FormSubmission::create([
            'ip_address' => $ip,
        ]);

        // if there's log previous response use it
        if ($previousResponse && array_key_exists($lang, $previousResponse->response) && $previousResponse->created_at >= today()->subDays(1)) {
            $save();
            return response()->json([
                'dataProfile' => $previousResponse->data,
                'roastText' => $previousResponse->response[$lang],
                'success' => true
            ]);
        // else return json with fetch api response
        } else if(FormSubmission::where('ip_address', $ip)
            ->whereDate('created_at', today())
            ->count() >= 10) {
            // block user if exceed daily limit
            return response()->json([
                'success' => false,
                'message' => $lang == 'en' ? 
                    'You have exceeded the daily limit of 10 times. Please try again tomorrow.' :
                    'Kamu telah melewati batas harian sebanyak 10 kali. Silahkan coba lagi besok.'
            ], 400);
        }else {
            $response = $this->getResponse($username, $previousResponse, $lang);
            $response['success'] ?? $save();
            return response()->json($response, ($response['success'] ? 200 : 400));
        };

    }

    protected function checkTurnstile(string $token, string $ip) : bool
    {
        [$body, $err, $http_code] = $this->curlRequest(
            isPost: true,
            url: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            payload: [
                'secret' => env('CF_TURNSTILE_SECRET'),
                'response' => $token,
                'remoteip' => $ip,
            ]
        );
        if ($err || $http_code != 200) {
            Log::error("Turnstile error: $err | $http_code");
            return false;
        }

        return json_decode($body)->success;
    }

    protected function getUserIpAdress() : string
    {
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            return $_SERVER['HTTP_CF_CONNECTING_IP'];
        }
        if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
        } else {
            return $_SERVER['REMOTE_ADDR'];
        };
    }

    protected function getResponse(string $username , ?PreviousResponse $previousResponse, string $lang) : array
    {
        // delete data if it's older than 1 day
        if ($previousResponse && $previousResponse->created_at < today()->subDays(1)){
            $previousResponse->delete();
            $previousResponse = null;
        }

        $responseX = $previousResponse->data ?? $this->getResponseX($username, $lang);

        if (is_string($responseX)) {
            return [
                'success' => false,
                'message' => $responseX
            ];
        }

        $responseGemini = $this->getResponseGemini($username, $responseX, $lang);

        // only write if gemini's response is not null
        if ($responseGemini){
            if ($previousResponse){
                $previousResponse->update([
                    'response' => array_merge($previousResponse->response, ["$lang" => $responseGemini])
                ]);            
            }else{
                PreviousResponse::create([
                    'username' => $username,
                    'data' => $responseX,
                    'response' => [ "$lang" => $responseGemini]
                ]);
            }
        }

        return [
            'dataProfile' => $responseX,
            'roastText' => $responseGemini ?? 
            (
                $lang == 'en' ?
                "Sorry, we cannot create a roast for this profile at the moment.":
                "Maaf, kami tidak dapat membuat roasting untuk profil ini saat ini."
            ),
            'success' => true,
        ];
    }

    protected function getResponseX(string $username, string $lang) : array|string
    {
        // I using scraping because X api is too expensive
        try{
            // use curl because the Http not working properly with nitter
            [$body, $err, $http_code]  =$this->curlRequest(
                isPost:false,
                url:"https://nitter.net/$username",
                encoding:true
            );
            if($err) {
                Log::error("1. Error X response: $err");
                return $lang == 'en' ? 'Something went wrong' : 'Terjadi kesalahan';
            }else if (empty($body) || $http_code != 200) {
                return $lang == 'en' ? 'Username not found' : 'Username tidak ditemukan';
            }

            $dom = new DOMDocument();
            @$dom->loadHTML(mb_convert_encoding($body, 'HTML-ENTITIES', 'UTF-8'));
            $xpath = new DOMXPath($dom);

            // Checking if the profile exists
            $errorMsg = $xpath->query('//div[@class="error-panel"]/span/text()')->item(0);
            if ($errorMsg) {
                return $errorMsg->nodeValue;
            }

            // Extracting profile information
            $profilePicUrl = $xpath->query('//a[@class="profile-card-avatar"]/@href')->item(0)->nodeValue ?? null;
            $fullname = $xpath->query('//a[@class="profile-card-fullname"]/text()')->item(0)->nodeValue ?? null;
            $bioNodes = $xpath->query('//div[@class="profile-bio"]/p')->item(0) ?? null;
            $biography = $bioNodes ? $bioNodes->ownerDocument->saveXML($bioNodes) : null;
            $isVerified = $xpath->query('//a[@class="profile-card-fullname"]/div/span[contains(@class, "verified-icon")]')->item(0) ? true : false;
            $isPrivate = $xpath->query('//a[@class="profile-card-fullname"]/div/span[contains(@class, "icon-lock")]')->item(0) ? true : false;
            $tweetsCount = $xpath->query('//li[@class="posts"]/span[@class="profile-stat-num"]')->item(0)->nodeValue ?? null;
            $following = $xpath->query('//li[@class="following"]/span[@class="profile-stat-num"]')->item(0)->nodeValue ?? null;
            $followers = $xpath->query('//li[@class="followers"]/span[@class="profile-stat-num"]')->item(0)->nodeValue ?? null;

            // Scraping tweets and their details
            $tweets = [];
            foreach ($xpath->query('//div[@class="timeline-item "]') as $idx => $tweet) {
                if ($idx >= 5) break;
                $captionNode = $xpath->query('.//div[@class="tweet-content media-body"]', $tweet)->item(0) ?? null;
                                        
                $tweets[] = [
                    'date' => $xpath->query('.//span[@class="tweet-date"]/a/@title', $tweet)->item(0)->nodeValue ?? null,
                    'isRetweeted' => $xpath->query('.//div[@class="retweet-header"]', $tweet)->item(0) ? true : false,
                    'likesCount' => $xpath->query('.//span[@class="tweet-stat"]//div[@class="icon-container"]/span[@class="icon-heart"]/following-sibling::text()', $tweet)->item(0)->nodeValue ?? 0,
                    'retweetCount' => $xpath->query('.//span[@class="tweet-stat"]//div[@class="icon-container"]/span[@class="icon-retweet"]/following-sibling::text()', $tweet)->item(0)->nodeValue ?? 0,
                    'commentsCount' => $xpath->query('.//span[@class="tweet-stat"]//div[@class="icon-container"]/span[@class="icon-comment"]/following-sibling::text()', $tweet)->item(0)->nodeValue ?? 0,
                    'commentsCount' => $xpath->query('.//span[@class="tweet-stat"]//div[@class="icon-container"]/span[@class="icon-quote"]/following-sibling::text()', $tweet)->item(0)->nodeValue ?? 0,
                    'caption' => $captionNode ? $captionNode->ownerDocument->saveXML($captionNode) : null
                ];
            }

            return [
                'profilePicUrl' => env('APP_URL') . "/proxy-image?url=https://nitter.net$profilePicUrl",
                'fullName' => $fullname,
                'biography' => $biography,
                'isVerified' => $isVerified,
                'isPrivate' => $isPrivate,
                'tweetsCount' => $this->formatNumber( (int) str_replace(',', '', $tweetsCount) ),
                'followsCount' => $this->formatNumber( (int) str_replace(',', '', $following) ),
                'followersCount' => $this->formatNumber( (int) str_replace(',', '', $followers) ),
                'tweets' => $tweets,
            ];
        }catch(\Exception $e){
            Log::error("2. Error get response X, error: " . $e->getCode() . " " . $e->getMessage());
            return $lang == 'en' ? 'Something went wrong' : 'Terjadi kesalahan';
        }
        Log::error("3. Error get response X, error: there is no response");
        return $lang == 'en' ? 'Something went wrong' : 'Terjadi kesalahan';
    }

    protected function getResponseGemini(string $username, array $profileDataString, string $lang): ?string
    {
        // switch api key if limit exceeded
        $logQuery = ServiceLog::where('service', 'Gemini')->whereDate('created_at', today());
        $minuteCount = $logQuery
            ->whereRaw('HOUR(created_at) = ?', [now()->hour])
            ->whereRaw('MINUTE(created_at) = ?', [now()->minute])
            ->count();
        $totalCount = $logQuery->count();
        $count = max(floor($minuteCount / 15), floor($totalCount / 1500));
        $apiKey = explode(',', env('GEMINI_API_KEY'))[$count] ?? null;
        if ($apiKey == null) return null;

        try{
            $profileDataString = json_encode($profileDataString);
            [$body, $err, $http_code] = $this->curlRequest(
                isPost: true,
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey",
                encoding: true,
                payload:
                [
                    'contents' => [
                        [
                            'parts' => [
                                [
                                    'text' => $lang == 'en'?
    
                                    "Give a sarcastic, humiliating, and funny (but not too harsh) roast for Twitter/X profile \"{$username}\".
                                    IMPORTANT: Give ONLY text roast, without any opening or closing words like \"Ok, ready\" or \"Here's the roast for\". Just start with the roast.
                                    Occasionally use emoticon.
                                    Use **sarcastic and humiliating** until it gets mental,
                                    Use slang language, you can use vulgar words but don't go overboard,
                                    Don't talk about the profile picture being blur, except if you understand it
                                    use words that can be understood.
                                    You can roast the number of followers, tweets, bio, profile picture, or anything based on the following data (the data comes from Nitter, don't talk about it): {$profileDataString}" :
    
                                    "Berikan roasting sarkastik, kejam, dan menyindir secara lucu (tapi tidak terlalu kasar) untuk profil Twitter/X \"{$username}\" ini. 
                                    PENTING: Berikan HANYA teks roasting, tanpa kata pengantar atau pembuka apapun seperti \"Oke, siap\" atau \"Berikut roasting untuk\". Langsung mulai dengan roastingnya.
                                    sesekali gunakan emoticon.
                                    Gunakan **gaya sarkastik dan menyakitkan** sampai kena mental,
                                    Gunakan Bahasa Gaul, boleh menggunakan kata kata kasar tapi jangan berlebihan,
                                    Jangan berbicara tentang gambar profil yang blur, kecuali kamu paham dengan gambarnya
                                    gunakan kata kata yang bisa dipahami.
                                    Boleh menyindir jumlah followers, tweet, bio, gaya foto, atau apapun yang relevan berdasarkan data berikut (data ini berasal dari Nitter, jangan berbicara tentang itu):
                                    {$profileDataString}",
                                ],
                            ],
                        ],
                    ],
                ]
            );
            if ($err || $http_code != 200) {
                Log::error("1. Error get response Gemini, error: " . $http_code . " " . $err);
                return null;
            };
            ServiceLog::create(['service' => 'Gemini']);
        } catch(\Exception $e){
            Log::error("2. Error get response Gemini, error: " . $e->getCode() . " " . $e->getMessage());
            return null;
        };
        return json_decode($body, true)['candidates'][0]['content']['parts'][0]['text'] ?? null;
    }

    protected function formatNumber(int $number): string
    {
        if ($number < 1000) {
            return (string) Number::format($number, 0);
        }

        if ($number < 1000000) {
            return Number::format($number / 1000, 1) . 'K';
        }

        return Number::format($number / 1000000, 1) . 'M';
    }

    public function getImage(Request $request)
    {
        $imageUrl = $request->query('url'); // Get the 'url' query parameter

        // Check if the URL is provided
        if (!$imageUrl) {
            return response("Image URL is required", 400);
        }

        // Try to fetch the image content
        try {
            // using curl because it more faster than Http
            [$body, $err, $http_code, $headerValue] = $this->curlRequest(isPost:false, url:$imageUrl, headerKey:'Content-Type');
            if ($err || $http_code != 200) {
                return response("Failed to fetch image", $http_code);
            }    

            // Return the image with the appropriate content type
            return Response::make($body, 200, [
                'Content-Type' => $headerValue ?? 'image/jpeg',
                'Cache-Control' => 'public, max-age=86400', // Cache for 1 day
            ]);

        } catch (\Exception $e) {
            // Log the error and return a server error response
            Log::error('Error proxying image: ' . $e->getMessage());
            return response("Failed to proxy image", 500);
        }
    }

    public function getPeopleRoasted(Request $request): JsonResponse
    {
        $peopleRoasted = PreviousResponse::count();
        return response()->json(['roastedPeople' => $peopleRoasted]);
    }

    protected function curlRequest(bool $isPost, string $url, ?string $headerKey=null ,bool $encoding = false, ?array $payload = null): array
    { 
        $curl = curl_init();
        $headerValue = null;

        $curlOptions = [
            CURLOPT_URL => $url,
            CURLOPT_ENCODING => $encoding ? "" : "identity",
            CURLOPT_RETURNTRANSFER => true,  // Ensure response is returned as a string
            CURLOPT_HEADER => false,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_2_0, // Use HTTP/2
            CURLOPT_HTTPHEADER => [
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language: en-US,en;q=0.5',
            ], // Include headers in the request
        ];

        if ($headerKey) {
            $curlOptions[CURLOPT_HEADERFUNCTION] = function($curl, $header) use (&$headerValue, $headerKey) {
                if (stripos($header, $headerKey . ':') === 0) {
                    $headerValue = trim(substr($header, strlen($headerKey) + 1));
                }
                return strlen($header);
            };
        }

        if ($isPost) {
            $curlOptions[CURLOPT_POST] = true;
            $curlOptions[CURLOPT_POSTFIELDS] = json_encode($payload);
            $curlOptions[CURLOPT_HTTPHEADER][] = 'Content-Type: application/json';
        }
        curl_setopt_array($curl, $curlOptions);

        $body = curl_exec($curl);
        $err = curl_error($curl);
        $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        
        curl_close($curl);
        return [$body, $err, $http_code, $headerValue];
    }
}
