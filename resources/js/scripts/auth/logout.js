import { useDispatch } from "react-redux"
import SweetAlertService from "../../helper/sweetAlert"
import { login, logout as logoutRedux } from "../../redux/slices/checkLogin"
import store from "../../redux/store"

class logout {
    static async logout() {
        let token = localStorage.getItem('token')
        SweetAlertService.logoutAlert().then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${appUrl}/logout`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log('disini ajg', response)
                    const responseData = response.data
                    if (responseData.message == 'logout success') {
                        localStorage.removeItem('token')
                        window.location.reload()
                        store.dispatch(logoutRedux())
                    } else {
                        store.dispatch(login())
                        window.location.reload()
                    }
                } catch (error) {
                    console.log(error)
                    if (error.response && error.response.status === 401) {
                        store.dispatch(login())
                        SweetAlertService.sessionExpired().then(() => {
                            localStorage.removeItem('token')
                            window.location.reload()
                        })
                    }
                };
            }
        })
    }
}


export default logout