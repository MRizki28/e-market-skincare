import distributorService from "./distributor.service.js";

$(document).ready(function () {
    const DistributorService = new distributorService()

    DistributorService.renderData();
    $('#formDistributor').submit(function (e) {
        e.preventDefault();
        DistributorService.createAndUpdate(e);
    })

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
});