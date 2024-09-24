@props(['headerIcon', 'headerName'])
<div>
    <div class="page-header d-flex justify-content-between align-items-center">
        <h1 class="page-title"><i class="{{ $headerIcon }} mr-2"></i>{{ $headerName }}</h1>
    </div>
</div>