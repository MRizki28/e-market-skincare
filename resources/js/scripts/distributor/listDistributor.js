class listDistributor {
    static async getData(search = '', page) {
        try {
            const response = await axios.get(`${appUrl}/api/v1/distributor?search=${search}&page=${page}`);
            const responseData = response.data.data;
            if(response.data.message == 'Success get data distributor'){
                console.log(responseData)
                return responseData
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default listDistributor;