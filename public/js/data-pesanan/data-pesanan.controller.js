import dataPesananService from "./data-pesanan.service.js";

$(document).ready(function () {
    const DataPesananService = new dataPesananService()
    
    DataPesananService.getDataPesanan();
});