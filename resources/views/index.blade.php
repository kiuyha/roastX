<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RoastX - Roast akun X anda dengan AI</title>
    <meta name="description" content= {{ $lang == 'en'?
    "RoastX uses AI to roast your X (Twitter) profile with funny and spicy roasts. Get ready to be roasted!" :
    "RoastX menggunakan AI untuk mengejek profil X Anda dengan komentar lucu dan pedas. Bersiaplah untuk di-roasting!"
    }}>
    <meta name="keywords" content="twitter roast,ai roast,social media roast,twitter profile,funny roast, x roast, x profile">
    <meta name="author" content="kiuyha">
    <link rel="icon" href="/favicon.ico">
    <link preload href="/roastxlogo.webp" type="image/webp">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="manifest" href="manifest.json">
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])
</head>
<body>    
    <div id="app" data-lang="{{ $lang }}"></div>
</body>
</html>