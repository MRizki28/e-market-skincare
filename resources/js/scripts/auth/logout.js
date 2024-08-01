import SweetAlertService from "../../helper/sweetAlert"

class logout {
    static async logout(setLogin) {
        try {
            let token = localStorage.getItem('token')
            SweetAlertService.logoutAlert().then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post('logout', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        console.log('disini ajg', response)
                        const responseData = response.data
                        if (responseData.message == 'logout success') {
                            localStorage.removeItem('token')
                            setLogin(false)
                            window.location.reload()
                        } else {
                            setLogin(true)
                            window.location.reload()
                        }
                    } catch (error) {
                        if(error.response.status == 401) {
                            setLogin(true)
                            SweetAlertService.sessionExpired().then(() => {
                                localStorage.removeItem('token')
                                window.location.reload()
                            })
                        }
                    };
                }
            })
        } catch (error) {
            setLogin(true)
        }
    }
}


export default logout