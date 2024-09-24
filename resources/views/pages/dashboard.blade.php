@extends('Layouts.Base')
@section('content')
    <div class="panel-header  mb-3" style="background-color: #C5705D">
        <div class="page-inner py-5">
            <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                <div>
                    <h2 class="text-white pb-2 fw-bold">Dashboard</h2>
                    <h5 class="text-white op-7 mb-2">Sistem E-Skincare</h5>
                </div>
            </div>
        </div>
    </div>
    <div class="p-2 mt--5">
        <div class="row">
            @if (auth()->user()->role == 'admin')
                <div class="col-sm-6 col-md-6">
                    <div class="card card-stats card-round">
                        <div class="card-body ">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-primary bubble-shadow-small">
                                        <i class="flaticon-box-2"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ml-3 ml-sm-0">
                                    <div class="numbers">
                                        <p class="card-category">Total Produk</p>
                                        <h4 class="card-title" id="totalProductByDistributor"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-6">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-info bubble-shadow-small">
                                        <i class="flaticon-archive"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ml-3 ml-sm-0">
                                    <div class="numbers">
                                        <p class="card-category">Total Pengguna</p>
                                        <h4 class="card-title" id="totalPengguna"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @else
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body ">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-primary bubble-shadow-small">
                                        <i class="flaticon-box-2"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ml-3 ml-sm-0">
                                    <div class="numbers">
                                        <p class="card-category">Total Produk</p>
                                        <h4 class="card-title" id="totalProduct"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-info bubble-shadow-small">
                                        <i class="flaticon-archive"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ml-3 ml-sm-0">
                                    <div class="numbers">
                                        <p class="card-category">Total Pesanan lunas</p>
                                        <h4 class="card-title" id="totalOrderSuccess"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-success bubble-shadow-small">
                                        <i class="flaticon-graph"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ml-3 ml-sm-0">
                                    <div class="numbers">
                                        <p class="card-category">Total Pesanan belum lunas</p>
                                        <h4 class="card-title" id="totalOrderNotSuccess"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-secondary bubble-shadow-small">
                                        <i class="flaticon-success"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ml-3 ml-sm-0">
                                    <div class="numbers">
                                        <p class="card-category">Rp</p>
                                        <h4 class="card-title" id="totalMonay"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endif

        </div>
        <div>
            <div class="col-lg-12 mb-4 order-0">
                <div class="card">
                    <div class="d-flex align-items-end row">
                        <div class="col-sm-7">
                            <div class="card-body">
                                <h5 class="card-title text-primary">Selamat datang di e-skincare <b><span id="name"></span></b> 🎉
                                </h5>
                                <i class="fa-sharp fa-solid fa-face-smile text-warning mt-3"></i>
                                <a href="javascript:;" class="">Enjoy your work !!!</a>
                            </div>
                        </div>
                        <div class="col-sm-5 text-center text-sm-left">
                            <div class="card-body pb-0 px-0 px-md-4">
                                <img class="img-fluid mb-4 p-3" src="{{ asset('shop.svg') }}" alt="shop" height="350">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $.ajax({
                type: "GET",
                url: `${appUrl}/v1/dashboard`,
                dataType: "json",
                success: function(response) {
                    const data = response.data;
                    console.log(response);
                    $('#totalProduct').text(data.product);
                    $('#totalPengguna').text(data.user);
                    $('#totalProductByDistributor').text(data.product_by_distributor);
                    $('#totalOrderSuccess').text(data.order_success_payment);
                    $('#totalOrderNotSuccess').text(data.order_not_success_payment);
                    $('#totalMonay').text(numberWithCommas(data.total_money));
                }
            });

            function getNameUser() {
                $.ajax({
                    type: "GET",
                    url: `${appUrl}/v1/user/get-personal`,
                    dataType: "json",
                    success: function(response) {
                        console.log('here', response)
                        if (response.message == 'Success get data personal user') {
                            response.product != null ? $('#name').text(response.data.profile.name ? 'Admin' : response.data.profile.name) : $('#name').text('Admin')
                        } else {
                            $('#name').text('Developer')
                        }
                    }
                });
            }

            getNameUser()
        });
    </script>
@endsection
