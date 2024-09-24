import distributorService from "./distributor.service.js";

$(document).ready(function () {
    const DistributorService = new distributorService()

    DistributorService.renderData();
   

    function validation() {
        $('#formDistributor').validate({
            rules: {
                image_distributor: {
                    required: true,
                    extension: 'jpg|jpeg|png'
                },
                name_distributor: {
                    required: true
                },
                phone_number: {
                    required: true
                },
                address: {
                    required: true
                },
                description: {
                    required: true,
                    minlength: 200
                }
            },
            messages: {
                image_distributor: {
                    required: 'Gambar distributor tidak boleh kosong',
                    extension: 'Format file harus jpg, jpeg, png'
                },
                name_distributor: {
                    required: 'Nama distributor tidak boleh kosong'
                },
                phone_number: {
                    required: 'Nomor telepon tidak boleh kosong'
                },
                address: {
                    required: 'Alamat tidak boleh kosong'
                },
                description: {
                    required: 'Deskripsi tidak boleh kosong',
                    minlength: 'Deskripsi minimal 200 karakter'
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

    $('#image_distributor').on('change', function () {
        $(this).valid();
        const file = $(this)[0].files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    })

    $('#name_distributor, #phone_number, #address, #description').on('input', function () {
        $(this).valid();
    })

    validation()

    $('#formDistributor').submit(function (e) {
        e.preventDefault();
        DistributorService.createAndUpdate(e);
    })
});