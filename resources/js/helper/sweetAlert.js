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

    static async successRegister() {
        return MySwal.fire({
            title: 'Registrasi Berhasil',
            text: 'Registrasi berhasil, silahkan login',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    }

    static async successLogin() {
        return MySwal.fire({
            title: 'Login Berhasil',
            text: 'Login berhasil',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    }

    static async passwordNotMatch() {
        return MySwal.fire({
            title: 'Password tidak sama',
            text: 'Pastikan password yang anda masukkan sama',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
    }

    static async emailAlreadyExist() {
        return MySwal.fire({
            title: 'Email sudah terdaftar',
            text: 'Email yang anda masukkan sudah terdaftar, Silahkan gunakan email lain',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
    }

    static async emailOrPasswordMistant() {
        return MySwal.fire({
            title: 'Email atau password salah',
            text: 'Email atau password anda salah, silahkan coba lagi',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
    }

    static async errorAlert() {
        return MySwal.fire({
            title: 'Error',
            text: 'Server sedang maintenance, silahkan coba beberapa saat lagi',
            icon: 'error',
            confirmButtonText: 'OK',
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

    static async stockNotEnough() {
        return MySwal.fire({
            title: 'Stock tidak cukup',
            text: 'Stock barang yang anda pilih tidak cukup',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
    }
}

export default SweetAlertService;
