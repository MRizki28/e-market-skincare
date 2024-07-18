@extends('Layouts.Base')
@section('content')
    <div class="page-inner">
        <x-base-header headerName="Change password" headerIcon="fas fa-user"></x-base-header>
        <div class="p-3 mt-3">
            <div class="row">
                <div class="col-lg-12 mb-4">
                    <!-- Simple Tables -->
                    <div class="card">
                        <div class="row gutters">
                            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <div class="account-settings">
                                            <div class="user-profile">
                                                <div class="user-avatar">
                                                    <img src="{{ asset('profile.png') }}" width="100%" height="100%"
                                                        alt="User">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <div class="row gutters">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h2 class="mb-2">Change Password</h2>
                                            </div>
                                            <form id="formSetting" class="w-100">
                                                @csrf
                                                <div class="col-md-12">
                                                    <div class="form-group form-show-validation">
                                                        <label for="password_old">Password Lama</label>
                                                        <input type="password" class="form-control" name="password_old"
                                                            id="password_old" placeholder="Input here">
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group form-show-validation">
                                                        <label for="password">Password Baru</label>
                                                        <input type="password" class="form-control" name="password" id="password"
                                                            placeholder="Input here">
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group form-show-validation">
                                                        <label for="password_confirmation">Konfirmasi password</label>
                                                        <input type="password" class="form-control"
                                                            name="password_confirmation" id="password_confirmation" placeholder="Input here">
                                                    </div>
                                                </div>

                                                <div class="d-flex justify-content-end mr-5 mt-5">
                                                    <div class="text-right">
                                                        <button type="submit" class="btn btn-outline-danger">Update
                                                            Data</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            function validationSetting() {
                $('#formSetting').validate({
                    rules: {
                        password_old: {
                            required: true,
                            rangelength: [5, 15]
                        },
                        password: {
                            required: true,
                            rangelength: [5, 50]
                        },
                        password_confirmation: {
                            required: true,
                            rangelength: [5, 50]
                        },
                    },
                    messages: {
                        password_old: {
                            required: "Field ini wajib diisi",
                            rangelength: "Password old minimal 5 karakter dan maksimal 15 karakter"
                        },
                        password: {
                            required: "Field ini wajib diisi",
                            rangelength: "Password minimal 5 karakter dan maksimal 15 karakter"
                        },
                        password_confirmation: {
                            required: "Field ini wajib diisi",
                            rangelength: "Password confirmasi minimal 5 karakter dan maksimal 15 karakter"
                        }
                    },
                    highlight: function(element) {
                        $(element).closest('.form-group').removeClass('has-success').addClass(
                            'has-error');
                    },

                    success: function(element) {
                        $(element).closest('.form-group').removeClass('has-error').addClass(
                            'has-success');
                    }
                });
            }

            validationSetting()
            $('#password_old, #password, #password_confirmation').on('input', function() {
                $(this).valid();
            });

            $('#formSetting').submit(function(e) {
                changePassword(e)
            })

            const changePassword = async (e) => {
                e.preventDefault();
                let submitButton = $(e.target).find(':submit')
                try {
                    let formData = new FormData(e.target)

                    submitButton.attr('disabled', true)
                    const response = await axios.post('v1/auth/changepassword', formData)
                    const responseData = await response.data
                    console.log(responseData)
                    if (responseData.status == "success") {
                        successAlert().then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/login'
                            }
                        })
                        
                        submitButton.attr('disabled', false)
                    }
                } catch (error) {
                    submitButton.attr('disabled', false)
                    console.log(error);
                    if (error.response.data.password == 'Password baru tidak sama dengan konfirmasi password') {
                        Swal.fire({
                            title: 'Peringatan',
                            text: 'Password konfirmasi tidak sama !',
                            icon: 'warning',
                            timer: 5000,
                            showConfirmButton: true
                        });
                    }else if(error.response.data.message == 'Password lama anda salah'){
                        Swal.fire({
                            title: 'Peringatan',
                            text: 'Password lama salah !',
                            icon: 'warning',
                            timer: 5000,
                            showConfirmButton: true
                        });
                    } else if (error.response.status == 422) {
                        warningAlert();
                    } else {
                        errorAlert();
                    }
                };


            }
        });
    </script>
@endsection
