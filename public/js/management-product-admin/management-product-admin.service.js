class managementProductAdminService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/product/get-all-product-for-admin', { search: params });
        const response = await axios.get(endpoint);
        const responseData = await response.data;
        console.log('ini response', responseData)

        table.empty();
        pagination.empty();

        let tableBody
        if (responseData.message === 'Success get data product') {
            $.each(responseData.data.data, function (index, item) {
                tableBody += "<tr>";
                tableBody += "<td>" + item.product_code + "</td>"
                tableBody += "<td>" + item.product_name + "</td>"
                tableBody += "<td>" + item.distributor.name_distributor + "</td>"
                tableBody += "<td>" + "Rp. " + numberWithCommas(item.price) + "</td>"
                tableBody += "<td>" + item.stock + "</td>"
                tableBody += "<td class='text-center'>" + insertLineBreaks(item.description, 15) + "</td>"
                tableBody += `
                <td>
                    <a href="${appUrl}/uploads/product/${item.product_image}" target="_blank">
                        <img src="${appUrl}/uploads/product/${item.product_image}" class="img-thumbnail" width="50" height="50">
                    </a>
                </td>
                `;
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#productModal' data-id='" +
                    item.id + "'><i class='fas fa-edit'></i></button>" +
                    "<button type='submit' class='delete-confirm btn btn-sm' data-id='" +
                    item.id + "'><i class='fas fa-trash-alt'></i></button>" +
                    "</td>";
                tableBody += "</tr>";
                dataNotFound.hide()
            });

            table.append(tableBody);
            paginationLink(pagination, responseData);
            totalData.text(responseData.data.total);
        } else {
            table.empty()
            dataNotFound.show()
            pagination.empty()
            totalData.text('0')
        }

    }

    async updateData(e) {
        let submitButton = $(e.target).find(':submit')
        try {
            let formData = new FormData(e.target)
            formData.append('price', localStorage.getItem('price'))
            let id = $('#id').val()
            console.log(id)
            submitButton.attr('disabled', true)
            const response = await axios.post(`${appUrl}/v1/product/update/${id}`, formData)
            const responseData = await response.data
            if (responseData.status == 'success') {
                successUpdateAlert().then(function () {
                    $('#productModal').modal('hide')
                })
                this.getAllData()
                submitButton.attr('disabled', false)
            }
        } catch (error) {
            console.log(error);
            submitButton.attr('disabled', false)
            if (error.response.status == 422) {
                warningAlert();
            } else {
                errorAlert();
            }
        }
    }

    async getDataById(id) {
        try {
            const response = await axios.get(`${appUrl}/v1/product/get/${id}`)
            const responseData = await response.data
            if (responseData.status == 'success') {
                const priceAsString = responseData.data.price.toString();
                const formattedPrice = formatCurrency(priceAsString);

                localStorage.setItem('price', responseData.data.price);
                $('#id').val(responseData.data.id)
                $('#product_name').val(responseData.data.product_name)
                $('#price').val(formattedPrice)
                $('#description').val(responseData.data.description)
                $('#preview').attr('src', `${appUrl}/uploads/product/${responseData.data.product_image}`);
                $('#stock').val(responseData.data.stock)
                $('#product_image').on('change', function () {
                    const file = $(this)[0].files[0];
                    const fileReader = new FileReader();
                    fileReader.onloadend = function () {
                        $('#preview').attr('src', fileReader.result);
                    }
                    fileReader.readAsDataURL(file);
                });

                const fileUrl = `${appUrl}/uploads/product/${responseData.data.product_image}`;
                const fileNames = fileUrl.split('/').pop();
                const blob = await fetch(fileUrl).then(r => r.blob());
                const file = new File([blob], fileNames);
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $('#product_image').prop('files', fileList.files);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteData(id) {
        deleteAlert().then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${appUrl}/v1/product/delete/` + id)
                    const responseData = await response.data
                    if (responseData.message == 'Success delete') {
                        successDeleteAlert()
                        this.getAllData()
                    } else {
                        failedDeleteDataAlert()
                    }
                } catch (error) {
                    errorAlert()
                };
            }
        })
    }
}

export default managementProductAdminService;