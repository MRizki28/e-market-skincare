@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Product" headerIcon="fas fa-user"></x-base-header>
        <x-base-body>
            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                modalUpdateStatus="#updateStatusModal" buttonAdd="true" headerAddButton="Tambah Data"
                modalId="#productModal"></x-base-sorting>
            <x-base-table initId="table">
                <x-slot name="thead">
                    <tr class="text-center">
                        <th>Nama produk</th>
                        <th>Harga</th>
                        <th>Deskripsi</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
    </div>

    <x-product.product-modal></x-product.product-modal>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/product/product.controller.js') }}"></script>
@endsection
