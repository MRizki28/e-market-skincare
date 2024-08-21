import axios from "axios"

class historyScript {
    static async getHistory(search, page) {
        try {
            const response = await axios.get(`${appUrl}/v1/order/history?search=${search}&page=${page}`)
            const responseData = await response.data
            if (responseData.message == 'Success get history order') {
                return responseData
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default historyScript