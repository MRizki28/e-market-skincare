import SweetAlertService from "../../helper/sweetAlert"

class logout {
    static async logout(setLogin) {
        try {
            SweetAlertService.logoutAlert().then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.post('/logout')
                    const responseData = response.data
                    console.log(responseData)
                    if (responseData.message == 'logout success') {
                        localStorage.removeItem('token')
                        setLogin(false)
                    }
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}


export default logout