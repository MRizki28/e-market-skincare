import axios from "axios";

class ProductAll {
    static async getAllData(search, page) {
        try {
            const response = await axios.get(`${appUrl}/v1/product?search=${search}&page=${page}`)
            const responseData = response.data
            if (responseData.message == 'Success get data product') {
                return responseData
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        };
        
    }
}

export default ProductAll;