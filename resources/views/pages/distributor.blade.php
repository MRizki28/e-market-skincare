@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Data distributor" headerIcon="fas fa-user"></x-base-header>
        <x-base-body>
            <div class="p-3">
                <form id="formDistributor">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="name_distributor">Name Distributor</label>
                                <input type="text" class="form-control" name="name_distributor" id="name_distributor" placeholder="Input here">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="phone_number">Phone number</label>
                                <input type="number" class="form-control" name="phone_number" id="phone_number" placeholder="Input here">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="address">Address</label>
                                <textarea class="form-control" name="address" id="address" placeholder="Input here" rows="4" cols="50"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end align-items-end mt-3 mr-3">
                        <button type="submit" id="btn-simpan" class="btn btn-outline-danger">Simpan</button>
                    </div>
                </form>
            </div>
        </x-base-body>
    </div>

@endsection

@section('js-service')
    <script type="module" src="{{ asset('js/distributor/distributor.controller.js') }}"></script>
@endsection
