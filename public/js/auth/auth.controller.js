import authService from "./auth.service.js";


$(document).ready(function () {
    const AuthService = new authService()

    function validation() {
        $('#formLogin').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: 'Email tidak boleh kosong',
                    email: 'Email tidak valid'
                },
                password: {
                    required: 'Password tidak boleh kosong'
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error')
            },

            success: function (element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success')
            }
        })
    }

    validation()

    $("#formLogin").submit(function (e) {
        e.preventDefault();
        AuthService.login(e);
    })
});