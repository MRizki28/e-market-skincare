
class dataPesananService {
    async getDataPesanan(url) {
        const pagination = $('.pagination');
        const table = $('#table tbody');
        const dataNotFound = $('#dataNotFound');
        const totalData = $('#totalData');

        let params = $('#form-search').val();
        let endpoint = paramsUrl(url || '/v1/order/get-by-distributor', { search: params });
        const response = await axios.get(endpoint);
        const responseData = await response.data;
        table.empty();
        pagination.empty();

        let tableBody;

        console.log(responseData);

        if (responseData.message === 'success get data order by distributor') {
            $.each(responseData.data.data, function (index, item) {
                tableBody += "<tr>";
                tableBody += "<td>" + item.product.product_name + "</td>";
                tableBody += "<td>" + item.profile.name + "</td>";
                tableBody += "<td>" + formatDate(item.created_at) + "</td>";
                tableBody += "<td>Rp." + numberWithCommas(item.price) + "</td>";
                tableBody += "<td>" + item.profile.personal_phone_number + "</td>";
                tableBody += "<td>" + item.quantity + "</td>";
                tableBody += "<td>Rp." + numberWithCommas(item.total_price ) + "</td>";
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +
                    "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#productModal' data-id='" +
                    item.id + "'><i class='fas fa-edit'></i></button>" +
                    "<button type='submit' class='delete-confirm btn btn-sm' data-id='" +
                    item.id + "'><i class='fas fa-trash-alt'></i></button>" +
                    "</td>";
                tableBody += "</tr>";
            });
            dataNotFound.hide();
            table.append(tableBody);
            paginationLink(pagination, responseData);
            totalData.text(responseData.data.total);
        } else {
            table.empty();
            dataNotFound.show();
            pagination.empty();
            totalData.text('0');
        }


    }
}

export default dataPesananService;