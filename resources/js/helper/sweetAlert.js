import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class SweetAlertService {
    static async logoutAlert() {
        return MySwal.fire({
            title: 'Logout?',
            text: 'Anda ingin keluar dari aplikasi?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonText: 'Ya',
            reverseButtons: true,
        });
    }

    static async sessionExpired() {
        return MySwal.fire({
            title: 'Session Expired',
            text: 'Sesi anda telah berakhir, silahkan login kembali',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
    }
}

export default SweetAlertService;
