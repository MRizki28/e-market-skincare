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
                        <th width="50">Username</th>
                        <th>Role</th>
                        <th width="120">Aksi</th>
                    </tr>
                </x-slot>
            </x-base-table>
        </x-base-body>
    </div>

    {{-- <x-usermanagement.admin-staff-modal></x-usermanagement.admin-staff-modal> --}}
@endsection
