import userManagementService from "./usermanagement.service.js";

$(document).ready(function () {
    const usermanagementservice = new userManagementService();
    usermanagementservice.getAllData();
    $(document).on('click', '.page-link' , function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        const fullUrl = url.pathname + url.search;
        usermanagementservice.getAllData(fullUrl);
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            usermanagementservice.getAllData();
        }
    });

    $(document).on('click', '#search-button', function () {
        usermanagementservice.getAllData();
    });
});