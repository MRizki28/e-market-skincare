<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="key" content="{{ env('APP_KEY') }}">
    <title>LETS LOGIN</title>
    @include('Layouts.styles')
</head>

<body>
    <div class="d-flex justify-content-center align-items-center h-100 border-danger" style="min-height: 100vh">
        <div class="content-wrapper">
            <div class=" d-flex justify-content-center align-items-center"
                style="padding: 1.25rem 1.25rem; flex-grow: 1;">
                <form style="width: 20rem;" id="formLogin">
                    @csrf
                    <div class="card mb-0" style="border: -1px solid black !important;">
                        <div class="card-body">
                            <div class="text-center  ">
                                <img src="{{ asset('static/img/loginLogo.jpg') }}" class="" alt="login"
                                    width="140" height="100%">
                                <h5 class="mb-0 mt-4 font-weight-bold">Masuk ke akun Anda</h5>
                            </div>
                            <div>
                                <div class="form-group form-show-validation">
                                    <input type="email" class="form-control" placeholder="Email@mail.com" name="email">
                                </div>
                                <div class="form-group form-show-validation">
                                    <input type="password" class="form-control" placeholder="Password" name="password">
                                </div>

                            </div>
                            <div class="form-group mb-4">
                                <button type="submit" class="btn btn-outline-danger btn-block p-2">Login</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

@include('Layouts.scripts')
<script type="module" src="{{ asset('js/auth/auth.controller.js') }}"></script>
