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

    $('#product_image').on('change', function () {
        const file = $(this)[0].files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            $('#preview').attr('src', fileReader.result);
        }
        fileReader.readAsDataURL(file);
    });

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
                    required: true,
                    extension: "jpg|jpeg|png"
                },
                description: {
                    required: true,
                    minlength:50
                },
                stock: {
                    required: true
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
                    required: 'Product image tidak boleh kosong',
                    extension: 'Format file harus jpg, jpeg, png'
                },
                description: {
                    required: 'Description tidak boleh kosong',
                    minlength: 'Description minimal 50 karakter'
                },
                stock: {
                    required: 'Stock tidak boleh kosong'
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

    let isEditMode = false

    function changeTitleModal() {
        if (isEditMode == true) {
            $('#modal-title').text('Edit Data');
            $('.button-footer button[type="submit"]').text('Update');
        }
    }

    $('#formTambah').submit(function (e) { 
        e.preventDefault();
        ManagementProductAdminService.updateData(e)
    })

    $(document).on('click', '.edit-modal', function () {
        isEditMode = true
        changeTitleModal()
        const id = $(this).data('id')
        ManagementProductAdminService.getDataById(id, )
    });

    $(document).on('click', '.delete-confirm', function () {
        const id = $(this).data('id')
        ManagementProductAdminService.deleteData(id)
    });

    $('#productModal').on('hidden.bs.modal', function () {
        $('#id').val('')
        $('#product_name').val('')
        $('#price').val('')
        $('#description').val('')
        $('#product_image').val('')
        $('#stock').val('')
        $('#modal-title').text('Tambah Data');
        $('.button-footer button[type="submit"]').text('Simpan');
        $('.form-group').removeClass('has-error').removeClass('has-success')
        $('.form-group').find('.error').remove()
        $('.form-validate').remove()
        $('#preview').attr('src', '')
    })
});