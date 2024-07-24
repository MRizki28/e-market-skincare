class productService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/product', { search: params });
        const response = await axios.get(endpoint);
        const responseData = await response.data;

        table.empty();
        pagination.empty();

        let tableBody
        if (responseData.message === 'Success get data product') {
            $.each(responseData.data.data, function (index, item) {
                let imageUrl = "cms/admin/uploads/product/" + item.product_image;
                let sliceUrlImage = imageUrl.replace('cms/admin', '')

                tableBody += "<tr>";
                tableBody += "<td>" + item.product_name + "</td>"
                tableBody += "<td>" + "Rp. " + numberWithCommas(item.price) + "</td>"
                tableBody += "<td>" + item.description + "</td>"
                tableBody += "<td><a href='" + sliceUrlImage + "' target='_blank'><img src='" + sliceUrlImage + "' class='img-thumbnail' width='50' height='50'></a></td>";
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

    async createData(e, isEditMode) {
        let submitButton = $(e.target).find(':submit')
        try {
            let formData = new FormData(e.target)
            formData.append('price', localStorage.getItem('price'))
            if (isEditMode) {
                let id = $('#id').val()
                submitButton.attr('disabled', true)
                const response = await axios.post(`/v1/product/update/${id}`, formData)
                const responseData = await response.data
                if (responseData.status == 'success') {
                    successUpdateAlert().then(function () {
                        $('#productModal').modal('hide')
                    })
                    this.getAllData()
                    submitButton.attr('disabled', false)
                }
            } else {
                submitButton.attr('disabled', true)
                const response = await axios.post('/v1/product/create', formData)
                const responseData = await response.data
                console.log(responseData)
                if (responseData.status == 'success') {
                    successAlert().then(function () {
                        $('#productModal').modal('hide')
                    })
                    this.getAllData()
                    submitButton.attr('disabled', false)
                } else if (responseData.message == 'Data distributor not found') {
                    distributorNotFountAlert()
                    submitButton.attr('disabled', false)
                }
            }
        } catch (error) {
            console.log(error);
            submitButton.attr('disabled', false)
            if (error.response.status == 422) {
                warningAlert();
            } else {
                errorAlert();
            }
        };
    }

    async getDataById(id, isEditMode) {
        try {
            const response = await axios.get(`/v1/product/get/${id}`)
            const responseData = await response.data
            if (responseData.status == 'success') {
                const priceAsString = responseData.data.price.toString();
                const formattedPrice = formatCurrency(priceAsString);

                let imageUrl = 'cms/admin/uploads/product/' + responseData.data.product_image;
                imageUrl = imageUrl.replace('cms/admin', '');

                localStorage.setItem('price', responseData.data.price);
                $('#product_name').val(responseData.data.product_name)
                $('#price').val(formattedPrice)
                $('#description').val(responseData.data.description)
                $('#preview').attr('src', imageUrl);

                $('#product_image').on('change', function () {
                    const file = $(this)[0].files[0];
                    const fileReader = new FileReader();
                    fileReader.onloadend = function () {
                        $('#preview').attr('src', fileReader.result);
                    }
                    fileReader.readAsDataURL(file);
                });

                const fileUrl = imageUrl;
                const fileNames = fileUrl.split('/').pop();
                const blob = await fetch(fileUrl).then(r => r.blob());
                const file = new File([blob], fileNames);
                const fileList = new DataTransfer();
                fileList.items.add(file);
                $('#product_image').prop('files', fileList.files);
                isEditMode(true, responseData.data.id)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteData(id) {
        try {
            const response = await axios.delete('/v1/product/delete/' + id)
            deleteAlert().then(async (result) => {
                if (result.isConfirmed) {
                    const responseData = await response.data
                    if (responseData.status == 'success') {
                        successDeleteAlert()
                        this.getAllData()
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default productService;