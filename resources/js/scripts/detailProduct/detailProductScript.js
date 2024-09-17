import format from "../../helper/format"


class detailProductScript {
    static async getDataById(id) {
        try {
            const formatHelper = new format()
            const response = await axios.get(`/product-detail/${id}`)
            const responseData = await response.data
            if (responseData.message == 'Success get data by id') {
                const product = responseData.data
                return {
                    ...product,
                    priceFormat: formatHelper.formatCurrency(product.price)
                }
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        };
    }

    static async getDataDistributor(id) {
        try {
            const response = await axios.get(`/api/v1/distributor/${id}`)
            const responseData = await response.data
            console.log(responseData);
            if (responseData.message == 'Success get data by id') {
                return responseData.data
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        };
    }
}

export default detailProductScript;