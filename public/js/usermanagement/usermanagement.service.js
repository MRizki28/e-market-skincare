class userManagementService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $("#form-search").val();
        let endpoint = paramsUrl(url || '/v1/user', { search: params });
        const response = await axios.get(endpoint);
        console.log(response)
        const responseData = await response.data;
        console.log('ini response', responseData)

        table.empty()
        pagination.empty()
        let tableBody

        if (responseData.message === 'Success get data user') {
            $.each(responseData.data.data, function (index, item) {
                tableBody += "<tr>";
                tableBody += "<td>" + item.email + "</td>"
                tableBody += "<td>" + item.role + "</td>"
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#userModal' data-id='" +
                    item.id + "'><i class='fas fa-edit'></i></button>" +
                    "<button type='submit' class='delete-confirm btn btn-sm' data-id='" +
                    item.id + "'><i class='fas fa-trash-alt'></i></button>" +
                    "</td>";
                tableBody += "</tr>";
                dataNotFound.hide()
            })
            table.append(tableBody)
            paginationLink(pagination, responseData)
            totalData.text(responseData.data.total)
        } else {
            table.empty()
            dataNotFound.show()
            pagination.empty()
            totalData.text('0')
        }
    }

    async createData(e, isEditMode) {
        let submitButton = $(e.target).find(':submit')
        try {
            let formData = new FormData(e.target)
            if (isEditMode) {
                let id = $('#id').val()
                submitButton.attr('disabled', true)
                const response = await axios.post(`${appUrl}/v1/user/update/${id}`, formData)
                const responseData = await response.data
                if (responseData.status == 'success') {
                    successUpdateAlert().then(function () {
                        $('#userManagementModal').modal('hide')
                    })
                    this.getAllData()
                    submitButton.attr('disabled', false)
                }
            } else {
                submitButton.attr('disabled', true)
                const response = await axios.post(`${appUrl}/v1/user/register`, formData)
                const responseData = await response.data
                console.log(responseData)
                if (responseData.status == 'success') {
                    successAlert().then(function () {
                        $('#userManagementModal').modal('hide')
                    })
                    this.getAllData()
                    submitButton.attr('disabled', false)
                }
            }
        } catch (error) {
            submitButton.attr('disabled', false)
            if (error.response.data.data.email == 'The email has already been taken.') {
                emailTakenAlert();
            } else if (error.response.status == 422) {
                warningAlert();
            } else {
                errorAlert();
            }
        };

    }

    async getDataById(id, isEditMode) {
        try {
            const response = await axios.get(`${appUrl}/v1/user/get/` + id)
            const responseData = await response.data
            console.log('here', responseData)
            if (responseData.status == 'success') {
                isEditMode(true, responseData.data.id)
                $('#email').val(responseData.data.email)
                $('#role').val(responseData.data.role).trigger('change')
                if(responseData.data.role == 'admin'){
                    $('#rolechange').empty()
                }else{
                    $('#name').val(responseData.data.profile.name)
                    $('#personal_address').val(responseData.data.profile.personal_address)
                    $('#personal_phone_number').val(responseData.data.profile.personal_phone_number)
                }
            }
        } catch (error) {
        }
    }

    async deleteData(id) {
        deleteAlert().then(async (result) => {
            try {

                if (result.isConfirmed) {
                    const response = await axios.delete(`${appUrl}/v1/user/delete/` + id)
                    const responseData = await response.data
                    console.log(response)
                    if (responseData.status == 'success') {
                        successDeleteAlert()
                        this.getAllData()
                    }
                }
            } catch (error) {
                console.log(error)
                if (error.response.status == 400) {
                    Swal.fire({
                        title: 'Warning',
                        text: 'Tidak bisa hapus diri sendiri',
                        icon: 'warning',
                        timer: 5000,
                        showConfirmButton: true
                    })
                } else if (error.response.status == 500) {
                    failedDeleteDataAlert()
                }
            };
        })
    }
}

export default userManagementService;