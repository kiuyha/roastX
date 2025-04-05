import { renderToStaticMarkup } from 'react-dom/server';
import Home from './pages/main';
import Error from './pages/error';

export function renderHome(lang= 'en') {
    const html = renderToStaticMarkup(<Home lang={lang} />);
    const head = `<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="alternate" hreflang="en" href="{{ url('/')}}/en" />
        <link rel="alternate" hreflang="id" href="{{ url('/')}}/id" />
        <title>RoastX - Roast akun X anda dengan AI</title>
        <meta name="description" content= {{ $lang == 'en'?
        "RoastX uses AI to roast your X (Twitter) profile with funny and spicy roasts. Get ready to be roasted!" :
        "RoastX menggunakan AI untuk mengejek profil X Anda dengan komentar lucu dan pedas. Bersiaplah untuk di-roasting!"
        }}>
        <meta name="keywords" content="twitter roast,ai roast,social media roast,twitter profile,funny roast, x roast, x profile">
        <meta name="author" content="kiuyha">
        <link rel="icon" href="/favicon.ico">
        <link preload href="/roastxlogo.webp" type="image/webp">
        <link rel="manifest" href="manifest.json">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
    return wrapHtml('app', html, head, { 'data-lang': "$lang" });
    
}

export function renderError( lang= 'en', errorCode= '500' ) {
    const html = renderToStaticMarkup(<Error lang={lang} errorCode={errorCode} />);
    const head = `<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        @php
            $errorCode = $exception->getStatusCode() ?? 500;
            $lang = Str::startsWith(request()->path(), 'en') ? 'en' : 'id';
        @endphp
        <title>Error {{ $statusCode }}</title>`
    return wrapHtml('error',html, head, { 'data-lang': "$lang", 'data-error-code': "$errorCode" });

}

// helper function
function wrapHtml(id: string, inner: string, head: string, attrs: Record<string, string>) {
    const attrString = Object.entries(attrs).map(([key, val]) => `${key}="{{${val}}}"`).join(' ');
    return `<!DOCTYPE html>
    <html lang="${attrs['data-lang'] ?? 'en'}">
        <head>
            ${head}
            @vite(['resources/js/app.tsx', 'resources/css/app.css'])
        </head>
        <body>
            <div id="${id}" ${attrString}>
                ${inner}
            </div>
        </body>
    </html>`;
}