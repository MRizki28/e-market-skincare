import userManagementService from "./usermanagement.service.js";

$(document).ready(function () {
    const usermanagementservice = new userManagementService();
    usermanagementservice.getAllData();
    $(document).on('click', '.page-link', function (e) {
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

    function validation() {
        $('#formTambah').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                role: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: 'Email tidak boleh kosong',
                    email: 'Email tidak valid'
                },
                role: {
                    required: 'Role tidak boleh kosong'
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

    $('#email').on('input', function () {
        $(this).valid()
    })

    $('#role').on('change', function () {
        $(this).valid()
    })

    let isEditMode = false

    function showModal(editModal = false, id = '') {
        isEditMode = editModal
        $('#modal-title').text('Edit Member');
        $('.button-footer button[type="submit"]').text('Update');

        $('#id').val(id);
        console.log('disini idnya', id)
        $('#userManagementModal').modal('show');
    }


    $('#formTambah').submit(function (e) {
        e.preventDefault();
        usermanagementservice.createData(e, isEditMode)
    });

    $(document).on('click', '.edit-modal', function (e) {
        isEditMode = true
        const id = $(this).data('id')
        usermanagementservice.getDataById(id, showModal)
    })  

    $(document).on('click', '.delete-confirm', function (e) {
        e.preventDefault()
        const id = $(this).data('id')
        usermanagementservice.deleteData(id)
    })


    $('#userManagementModal').on('hidden.bs.modal', function () {
        isEditMode = false
        $('#id').val('')
        $('#email').val('')
        $('#role').val('').trigger('change')
        $('#modal-title').text('Tambah Data');
        $('.button-footer button[type="submit"]').text('Simpan');
        $('.form-group').removeClass('has-error').removeClass('has-success')
        $('.form-group').find('.error').remove()
        $('.form-validate').remove()
    })
});