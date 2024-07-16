@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Account Management" headerIcon="fas fa-user"></x-base-header>
        <x-base-body>
            <x-base-sorting addSearching="true" addNotificationAll="false" addUpdateStatus="false"
                modalUpdateStatus="#updateStatusModal" buttonAdd="true" headerAddButton="Tambah Data"
                modalId="#userManagementModal"></x-base-sorting>
            <x-base-table initId="table">
                <x-slot name="thead">
                    <tr class="text-center">
                        <th>email</th>
                        <th>Role</th>
                        <th>Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
    </div>

    <x-usermanagement.usermanagement-modal></x-usermanagement.usermanagement-modal>
@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/usermanagement/usermanagement.controller.js') }}"></script>
@endsection
