<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormSubmission;
use App\Models\PreviousResponse;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MainController extends Controller
{
    public function index(): View
    {
        return view('index');
    }

    public function submit(Request $request):View | string
    {
        $data = $request->all();
        $request->validate([
            'username' => 'required|string',
        ]);

        // save user log
        $ip = $this->getUserIpAdress();
        FormSubmission::create([
            'ip_address' => $ip,
        ]);

        // check previous response
        $previousResponse = PreviousResponse::where('username', $data['username'])->first();
        if ($previousResponse) {
            return view('result', [
                'username' => $data['username'],
                'data' => $previousResponse->data,
                'gemini_response' => $previousResponse->response
            ]);
        }else if(FormSubmission::where('ip_address', $ip)->count() >= 5) {
            return redirect()->back()->with('error', 'Kamu telah melewati batas harian sebanyak 5 kali. Silahkan coba lagi besok.');
        }else{
            return view('result', $this->getResponse($data['username']));
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

    public function getResponse(string $username, int $count = 0) : array | RedirectResponse
    {
        $apiKey = explode(',', env('X_API_KEY'))[$count];
        if ($count >= count(explode(',', env('X_API_KEY')))) {
            return redirect()->back()->with('error', 'Server telah melewati batas, silahkan coba lain kali.');
        };
        try{
            $responseX = Http::withHeader([
                'Authorization' => "Bearer $apiKey",
                'Accept' => 'application/json'
            ])->get("https://api.twitter.com/2/users/by/username/$username?user.fields=affiliation,description,public_metrics,verified_followers_count,verified,verified_type&tweet.fields=article,attachments,created_at,text,public_metrics");
            if ($responseX->failed()) {
                return $this->getResponse($username, $count + 1);
            };
        }catch(\Exception $e){
            Log::error(" Error get response X, error: " . $e->getCode() . " " . $e->getMessage());
        }

        $responseGemini = $this->getResponseGemini($username, $responseX->json());
        PreviousResponse::create([
            'username' => $username,
            'data' => $responseX->json(),
            'response' => $responseGemini
        ]);

        return [
            'username' => $username,
            'data' => $responseX->json(),
            'gemini_response' => $responseGemini,
        ];
    }

    public function getResponseGemini(string $username, string $profileDataString,int $count = 0): string 
    {
        $apiKey = explode(',', env('GEMINI_API_KEY'))[$count];
        if ($count >= count(explode(',', env('GEMINI_API_KEY')))) {
            return 'Maaf, tidak dapat membuat roast untuk profil ini saat ini.';
        };
        try{
            $responseGemini = Http::withHeader([
                'Content-Type' => 'application/json'
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey", [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => "Berikan roasting sarkastik, kejam, dan menyindir secara lucu (tapi tidak terlalu kasar) untuk profil Instagram \"{$username}\" ini. 

                                PENTING: Berikan HANYA teks roasting, tanpa kata pengantar atau pembuka apapun seperti \"Oke, siap\" atau \"Berikut roasting untuk\". Langsung mulai dengan roastingnya.
                                sesekali gunakan emoticon.
                                Gunakan **gaya sarkastik dan menyakitkan** sampai kena mental,
                                Gunakan Bahasa Gaul, boleh menggunakan kata kata kasar tapi jangan berlebihan,
                                gunakan kata kata yang bisa dipahami.
                                Boleh menyindir jumlah followers, postingan, bio, gaya foto, atau apapun yang relevan berdasarkan data berikut: {$profileDataString}",
                            ],
                        ],
                    ],
                ],
            ]);
            if ($responseGemini->failed()) {
                return $this->getResponseGemini($username, $profileDataString, $count + 1);
            };
        } catch(\Exception $e){
            Log::error(" Error get response Gemini, error: " . $e->getCode() . " " . $e->getMessage());
        };
        return $responseGemini->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'Maaf, tidak dapat membuat roast untuk profil ini saat ini.';
    }
}
