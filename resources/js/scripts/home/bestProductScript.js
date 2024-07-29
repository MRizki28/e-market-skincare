import React, { useEffect } from "react";
import axios from "axios";

class bestProductScript {
    static async getBestProduct() {
        try {
            const response = await axios.get('/best-product')
            const responseData = await response.data
            if (responseData.message == 'Success get best product') {
                return responseData.data.map(product => bestProductScript.formatCurrency(product))
            }else{
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    static formatCurrency(product){
        return {
            ...product,
            price: new Intl.NumberFormat('id', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(product.price)
        }
    }

    static handleAddToCart(product){
        const token = localStorage.getItem('token')
        if (!token || !token.startsWith('Bearer')) {
            if (confirm('Please login if you want to add to cart') == true) {
                window.location.href = '/login'
            }else{
                return
            }
        }

        console.log(product)
    }


}

export default bestProductScript;

