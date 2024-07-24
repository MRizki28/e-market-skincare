import React, { useEffect } from "react";
import axios from "axios";

class bestProductScript {
    static async getBestProduct() {
        try {
            const response = await axios.get('/best-product')
            const responseData = await response.data
            if (responseData.message == 'Success get best product') {
                return responseData.data.map(product => bestProductScript.formatCurrency(product))
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
        if (!localStorage.getItem('token')) {
            confirm('You must login first to add product to cart')
            if (confirm) {
                window.location.href = '/login'
            }
            return
        }

        console.log(product)
    }


}

export default bestProductScript;

