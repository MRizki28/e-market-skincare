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
}

export default managementProductAdminService;