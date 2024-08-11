class detailListDistributor {
    static async getListData(search = '', page, id) {
        try {
            const id_distributor = id
            const response = await axios.get(`${appUrl}/api/v1/product-by-distributor/${id_distributor}?search=${search}&page=${page}`);
            const responseData = response.data.data
            if(response.data.message == 'Success get data product by distributor'){
                return responseData
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        };
        
    }

    static async getDistributor(id) {
        try {
            const id_distributor = id
            const response = await axios.get(`${appUrl}/api/v1/distributor/${id_distributor}`);
            const responseData = response.data.data
            if(response.data.message == 'Success get data by id'){
                console.log(responseData);
                return responseData
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        };
        
    }
}

export default detailListDistributor;