<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ asset('logo2.png') }}" type="image/svg+xml" />
    <title>E-SKINCARE</title>
    <script>
        let appUrl = '{{ env('API_URL_BE') }}';
   </script>
   <script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js"
   data-client-key="SB-Mid-client-2iJJEoVghf7BAXJE"></script>
</head>
<body>
    @viteReactRefresh
    @vite('resources/js/index.jsx')
    <div id="frontend-app"></div>
</body>
</html>