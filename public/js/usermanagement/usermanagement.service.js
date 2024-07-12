class userManagementService {
    async getAllData(url) {
        const pagination = $('.pagination')
        const table = $('#table tbody')
        const dataNotFound = $('#dataNotFound')
        const totalData = $('#data-total')

        try {
            let params = $("#form-search").val();
            let endpoint = paramsUrl(url || '/v1/user', { search: params });
            const response = await axios.get(endpoint);
            const responseData = await response.data;

            table.empty()
            pagination.empty()
            let tableBody

            if (response.status === 200) {
                $.each(responseData.data.data, function (index, item) {
                    tableBody += "<tr>";
                    tableBody += "<td>" + item.email + "</td>"
                    tableBody += "<td>" + item.role + "</td>"
                    tableBody +=
                        "<td style='padding: 0 10px !important;'  class='text-center '>" +
                        "<button class='btn btn-sm edit-modal mr-1' data-toggle='modal' data-target='#userModal' data-id='" +
                        item.id + "'><i class='fas fa-edit'></i></button>" +
                        "<button type='submit' class='delete-confirm btn btn-sm' data-id='" +
                        item.id +"'><i class='fas fa-trash-alt'></i></button>" +
                        "</td>";
                    tableBody += "</tr>";
                    dataNotFound.hide()
                })
                table.append(tableBody)
                paginationLink(pagination, responseData)
                totalData.text(responseData.data.total)
            }
        } catch (error) {
            table.empty()
            dataNotFound.show()
            pagination.empty()
            totalData.text('0')
            console.error(error);
        }
    }
}

export default userManagementService;