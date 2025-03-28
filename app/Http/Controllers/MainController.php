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
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
        if ($username == null) return response()->json([
            'success' => false,
            'message' => $lang == 'en' ? 
                'Please enter a Twitter/X username.' :
                'Silahkan masukkan username Twitter/X.'
        ], 400);

        // save user log
        $ip = $this->getUserIpAdress();
        
        // block user if exceed daily limit
        if(FormSubmission::where('ip_address', $ip)
            ->whereDate('created_at', today())
            ->count() >= 5) {
            return response()->json([
                'success' => false,
                'message' => $lang == 'en' ? 
                    'You have exceeded the daily limit of 5 times. Please try again tomorrow.' :
                    'Kamu telah melewati batas harian sebanyak 5 kali. Silahkan coba lagi besok.'
            ], 429);
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
        }else{
            $response = $this->getResponse($username, $previousResponse, $lang);
            $response['success'] ?? $save();
            return response()->json($response, ($response['success'] ? 200 : 502));
        };

    }

    public function getUserIpAdress() : string
    {
        if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
        } else {
            return $_SERVER['REMOTE_ADDR'];
        };
    }

    public function getResponse(string $username , PreviousResponse | null $previousResponse, string $lang) : array
    {
        if ($previousResponse && $previousResponse->created_at >= today()->subDays(1)){
            $responseX = $previousResponse->data;
        }else if($previousResponse){
            $previousResponse->delete();
            $previousResponse = null;
        }

        $responseX = $this->getResponseX($username, $lang);
        if (is_string($responseX)) {
            return [
                'success' => false,
                'message' => $responseX
            ];
        }

        $responseGemini = $this->getResponseGemini($username, $responseX, $lang);

        if ($previousResponse) {
            $previousResponse->update([
                'response' => [ "$lang" => $responseGemini]
            ]);
        }else if ($responseGemini){
            PreviousResponse::create([
                'username' => $username,
                'data' => $responseX,
                'response' => [ "$lang" => $responseGemini]
            ]);
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

    public function getResponseX(string $username, string $lang) : array | string
    {
        // I using scraping because X api is too expensive
        try{
            // use curl because the Http not working properly with nitter
            $curl = curl_init();
            curl_setopt_array($curl, [
                CURLOPT_URL => "https://nitter.net/$username",
                CURLOPT_ENCODING => "",
                CURLOPT_RETURNTRANSFER => true,  // Ensure response is returned as a string
                CURLOPT_HEADER => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_2_0,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_HTTPHEADER => [
                  'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                  'Accept-Language: en-US,en;q=0.5',
                ], // Include headers in the response
              ]);           

            $response = curl_exec($curl);
            $err = curl_error($curl);
            $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            
            $headerSize = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
            $body = substr($response, $headerSize);
            
            curl_close($curl);
            if($err) {
                Log::error("1. Error X response: $err");
                return $lang == 'en' ? 'Something went wrong' : 'Terjadi kesalahan';
            }else if (empty($body) || $http_code != 200) {
                return $lang == 'en' ? 'Username not found' : 'Username tidak ditemukan';
            }

            $dom = new DOMDocument();
            @$dom->loadHTML(mb_convert_encoding($body, 'HTML-ENTITIES', 'UTF-8'));
            $xpath = new DOMXPath($dom);


            // Extracting profile information
            $profilePicUrl = $xpath->query('//a[@class="profile-card-avatar"]/@href')->item(0)->nodeValue ?? null;
            $fullname = $xpath->query('//a[@class="profile-card-fullname"]/text()')->item(0)->nodeValue ?? null;
            $bioNodes = $xpath->query('//div[@class="profile-bio"]/p')->item(0) ?? null;
            $biography = $bioNodes ? $bioNodes->ownerDocument->saveXML($bioNodes) : null;

            // Checking if the profile is verified
            $isVerifiedNode = $xpath->query('//a[@class="profile-card-fullname"]/@class')->item(0);
            $isVerified = ($isVerifiedNode && strpos($isVerifiedNode->nodeValue, 'icon-container') !== false) ? true : false;

            $tweetsCount = $xpath->query('//li[@class="posts"]/span[@class="profile-stat-num"]')->item(0)->nodeValue ?? null;
            $following = $xpath->query('//li[@class="following"]/span[@class="profile-stat-num"]')->item(0)->nodeValue ?? null;
            $followers = $xpath->query('//li[@class="followers"]/span[@class="profile-stat-num"]')->item(0)->nodeValue ?? null;

            // Scraping tweets and their details
            $tweets = [];
            foreach ($xpath->query('//div[@class="timeline-item"]') as $idx => $tweet) {
                if ($idx >= 5) break;
                                        
                $tweets[] = [
                    'date' => $xpath->query('.//span[@class="tweet-date"]/a/@title', $tweet)->item(0)->nodeValue ?? null,
                    'likesCount' => $xpath->query('.//div[.//span[@class="icon-heart"]]/text()', $tweet)->item(0)->nodeValue ?? null,
                    'retweetCount' => $xpath->query('.//div[.//span[@class="icon-retweet"]]/text()', $tweet)->item(0)->nodeValue ?? null,
                    'commentsCount' => $xpath->query('.//div[.//span[@class="icon-comment"]]/text()', $tweet)->item(0)->nodeValue ?? null,
                    'quoteCount' => $xpath->query('.//div[.//span[@class="icon-quote"]]/text()', $tweet)->item(0)->nodeValue ?? null,
                    'caption' => $xpath->query('.//tweet-content/text()', $tweet)->item(0)->nodeValue ?? null,
                ];
            }

            return [
                'profilePicUrl' => "https://nitter.net$profilePicUrl",
                'fullname' => $fullname,
                'biography' => $biography,
                'isVerified' => $isVerified,
                'tweetsCount' => $tweetsCount,
                'followsCount' => $following,
                'followersCount' => $followers,
                'tweets' => $tweets,
            ];
        }catch(\Exception $e){
            Log::error("2. Error get response X, error: " . $e->getCode() . " " . $e->getMessage());
            return $lang == 'en' ? 'Something went wrong' : 'Terjadi kesalahan';
        }
        Log::error("3. Error get response X, error: there is no response");
        return $lang == 'en' ? 'Something went wrong' : 'Terjadi kesalahan';
    }

    public function getResponseGemini(string $username, array $profileDataString, string $lang): string | null
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
            $responseGemini = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey",
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
                                use words that can be understood based on the following data: {$profileDataString}" :

                                "Berikan roasting sarkastik, kejam, dan menyindir secara lucu (tapi tidak terlalu kasar) untuk profil Twitter/X \"{$username}\" ini. 
                                PENTING: Berikan HANYA teks roasting, tanpa kata pengantar atau pembuka apapun seperti \"Oke, siap\" atau \"Berikut roasting untuk\". Langsung mulai dengan roastingnya.
                                sesekali gunakan emoticon.
                                Gunakan **gaya sarkastik dan menyakitkan** sampai kena mental,
                                Gunakan Bahasa Gaul, boleh menggunakan kata kata kasar tapi jangan berlebihan,
                                gunakan kata kata yang bisa dipahami.
                                Boleh menyindir jumlah followers, tweet, bio, gaya foto, atau apapun yang relevan berdasarkan data berikut: {$profileDataString}",
                            ],
                        ],
                    ],
                ],
            ]);
            if ($responseGemini->failed()) {
                Log::error("1. Error get response Gemini, error: " . $responseGemini->status() . " " . json_encode($responseGemini->body()));
                return null;
            };
            ServiceLog::create(['service' => 'Gemini']);
        } catch(\Exception $e){
            Log::error("2. Error get response Gemini, error: " . $e->getCode() . " " . $e->getMessage());
            return null;
        };
        return $responseGemini->json()['candidates'][0]['content']['parts'][0]['text'] ?? null;
    }
}
