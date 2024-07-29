import productService from "./product.service.js";


$(document).ready(function () {
    const ProductServie = new productService();
    ProductServie.getAllData();

    $(document).on('input', '#price', function () {
        this.value = formatCurrency(this.value);
        localStorage.setItem('price', this.value.split('.').join(''));
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
        $('#modal-title').text('Edit Product');
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
                    required: true,
                    minlength:50
                }
            },
            messages: {
                product_name: {
                    required: 'Product name tidak boleh kosong'
                },
                price: {
                    required: 'Price tidak boleh kosong'
                },
                product_image: {
                    required: 'Product image tidak boleh kosong'
                },
                description: {
                    required: 'Description tidak boleh kosong',
                    minlength: 'Description minimal 50 karakter'
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

    $('#product_name, #price, #description').on('input', function () {
        $(this).valid();
    })

    $('#product_image').on('change', function () {
        $(this).valid();
    })

    $('#formTambah').submit(function (e) { 
        e.preventDefault();
        ProductServie.createData(e, isEditMode)
    })

    $(document).on('click', '.edit-modal', function () {
        isEditMode = true
        const id = $(this).data('id')
        ProductServie.getDataById(id, showModal)
    });

    $(document).on('click', '.delete-confirm', function () {
        const id = $(this).data('id')
        ProductServie.deleteData(id)
    });

    $('#productModal').on('hidden.bs.modal', function () {
        isEditMode = false
        $('#id').val('')
        $('#product_name').val('')
        $('#price').val('')
        $('#description').val('')
        $('#product_image').val('')
        $('#modal-title').text('Tambah Data');
        $('.button-footer button[type="submit"]').text('Simpan');
        $('.form-group').removeClass('has-error').removeClass('has-success')
        $('.form-group').find('.error').remove()
        $('.form-validate').remove()
        $('#preview').attr('src', '')
    })
});