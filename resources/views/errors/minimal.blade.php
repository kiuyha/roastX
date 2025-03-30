<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @php
        $statusCode = $exception->getStatusCode() ?? 500;
        $lang = Str::startsWith(request()->path(), 'en') ? 'en' : 'id';
    @endphp
    <title>Error {{ $statusCode }}</title>
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])
</head>
<body>
    <div id="error" data-lang="{{ $lang }}" data-error-code="{{ $statusCode }}"></div>
</body>
</html>