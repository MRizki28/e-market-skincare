import distributorService from "./distributor.service.js";

$(document).ready(function () {
    const DistributorService = new distributorService()

    DistributorService.renderData();
   

    function validation() {
        $('#formDistributor').validate({
            rules: {
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

    $('#name_distributor, #phone_number, #address, #description').on('input', function () {
        $(this).valid();
    })

    validation()

    $('#formDistributor').submit(function (e) {
        e.preventDefault();
        DistributorService.createAndUpdate(e);
    })
});