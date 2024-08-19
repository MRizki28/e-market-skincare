<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Frontend</title>
    <script>
        let appUrl = '{{ env('API_URL_BE') }}';
   </script>
   <script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js"
   data-client-key="SB-Mid-client-wMSrDf1bMOIJq1iD"></script>
</head>
<body>
    @viteReactRefresh
    @vite('resources/js/index.jsx')
    <div id="frontend-app"></div>
</body>
</html>