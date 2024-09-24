import managementProductAdminService from "./management-product-admin.service.js";

$(document).ready(function () {
    const ManagementProductAdminService = new managementProductAdminService();

    ManagementProductAdminService.getAllData();

    $(document).on('input', '#price', function () {
        this.value = formatCurrency(this.value);
        localStorage.setItem('price', this.value.split(',').join(''));
    })

    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        console.log(url)
        const fullUrl = url.pathname + url.search;
        ManagementProductAdminService.getAllData(fullUrl);
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            ManagementProductAdminService.getAllData();
        }
    })

    $(document).on('click', '#search-button', function () {
        ManagementProductAdminService.getAllData();
    })
});