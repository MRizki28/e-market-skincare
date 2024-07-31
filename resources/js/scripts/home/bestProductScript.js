import React, { useEffect } from "react";
import axios from "axios";
import format from "../../helper/format";

class bestProductScript {
    static async getBestProduct() {
        try {
            const formatHelper = new format()
            const response = await axios.get('/best-product')
            const responseData = await response.data
            if (responseData.message == 'Success get best product') {
                console.log(responseData)
                return responseData.data.map(product => ({
                    ...product,
                    price: formatHelper.formatCurrency(product.price)

                }))
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    static handleBuy(product) {
        const token = localStorage.getItem('token')
        if (!token || !token.startsWith('Bearer')) {
            window.location.href = '/login'
        }

        return `detail-product/${product.id}`;
    }
}

export default bestProductScript;

