import dataPesananService from "./data-pesanan.service.js";

$(document).ready(function () {
    const DataPesananService = new dataPesananService()
    
    DataPesananService.getDataPesanan();


    $('#form-search').on('keyup', function (e) {
        if(keyCode === 13) {
            DataPesananService.getDataPesanan();
        }
    });

    $('#form-search').on('change', function () {
        DataPesananService.getDataPesanan();
    });

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        DataPesananService.getDataPesanan();
    });

    $(document).on('click', '.delete-confirm', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        DataPesananService.deleteData(id);
    })

});