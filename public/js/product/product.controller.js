import productService from "./product.service.js";


$(document).ready(function () {
    const ProductServie = new productService();
    ProductServie.getAllData();

    let price = 0;

    $(document).on('input', '#price', function () {
        this.value = formatCurrency(this.value);
        price = this.value.split('.').join('');
    })

    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const url = new URL($(this).attr('href'));
        console.log(url)
        const fullUrl = url.pathname + url.search;
        ProductServie.getAllData(fullUrl);
    });

    $('#product_image').on('change', function () {
        const file = $(this)[0].files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            $('#preview').attr('src', fileReader.result);
        }
        fileReader.readAsDataURL(file);
    });

    let isEditMode = false

    function showModal(editModal = false, id = '') {
        isEditMode = editModal
        $('#modal-title').text('Edit Member');
        $('.button-footer button[type="submit"]').text('Update');

        $('#id').val(id);
        console.log('disini idnya', id)
        $('#userManagementModal').modal('show');
    }

    function validation() {
        $('#formTambah').validate({
            rules: {
                product_name: {
                    required: true
                },
                price: {
                    required: true
                },
                product_image: {
                    required: true
                },
                description: {
                    required: true
                }
            },
            messages: {
                product_name: {
                    required: 'Product name cannot be empty'
                },
                price: {
                    required: 'Price cannot be empty'
                },
                product_image: {
                    required: 'Product image cannot be empty'
                },
                description: {
                    required: 'Description cannot be empty'
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

    $('#formTambah').submit(function (e) { 
        e.preventDefault();
        ProductServie.createData(e, isEditMode, price)
    })

    $(document).on('click', '.edit-modal', function () {
        isEditMode = true
        const id = $(this).data('id')
        ProductServie.getDataById(id, showModal, function (updatePrice) {
            price = updatePrice
        })
    });

    $(document).on('click', '.delete-confirm', function () {
        const id = $(this).data('id')
        ProductServie.deleteData(id)
    });

});