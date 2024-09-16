
class dataPesananService {

    async getDataPesanan(url) {
        const pagination = $('.pagination');
        const table = $('#table tbody');
        const dataNotFound = $('#dataNotFound');
        const totalData = $('#data-total');

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
                let personalPhoneNumber = item.profile.personal_phone_number;
                tableBody += "<tr>";
                tableBody += "<td>" + item.product.product_name + "</td>";
                tableBody += "<td>" + item.profile.name + "</td>";
                tableBody += "<td>" + formatDate(item.created_at) + "</td>";
                tableBody += "<td>Rp." + numberWithCommas(item.price) + "</td>";
                tableBody += "<td>" + `<a href="https://wa.me/${personalPhoneNumber}" target=_blank><i class="fab fa-whatsapp fa-xl text-success "></i></a>` + "</td>";
                tableBody += "<td>" + item.quantity + "</td>";
                tableBody += "<td>Rp." + numberWithCommas(item.total_price) + "</td>";
                tableBody += "<td>" + statusInfo(item.status) + "</td>";
                tableBody +=
                    "<td style='padding: 0 10px !important;'  class='text-center '>" +

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

    async deleteData(id) {
        deleteAlert().then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`/v1/order/delete/${id}`);
                if (response.data.message === 'success delete order') {
                    successAlert(response.data.message);
                    dataPesananService.getDataPesanan();
                } else {
                    errorAlert(response.data.message);
                }
            }
        })
    }
}

export default dataPesananService;