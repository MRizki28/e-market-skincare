import { LazyLoadImage } from "react-lazy-load-image-component";
import loginBackground from "../../../../../public/loginBackground.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export function LoginForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/login', data)
            const responseData = response.data
            console.log(responseData)
            if (responseData.message == 'login success') {
                alert('Login berhasil')
                localStorage.setItem('token', responseData.data.token);

                localStorage.setItem('infoUser', JSON.stringify({
                    'name': responseData.data.name,
                    'email': responseData.data.email,
                    'address': responseData.data.address,
                    'phone': responseData.data.phone_number,
                }))
                window.location.href = '/'
            }
        } catch (error) {
            if (error.response.status == 401) {
                alert('Email atau password salah')
            }
            console.log(error)
        }
    };

    return (
        <div className="max-w-screen-xl p-4 mx-auto">
            <div className="border">
                <div className="flex h-screen">
                    <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                        <div className="w-full h-screen hidden lg:block">
                            <LazyLoadImage src={loginBackground} alt="Placeholder Image" className="object-cover w-full h-full" />
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                        <div className="max-w-md w-full p-6">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
                            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Daftar dan nikmati semua produk yang kami tawarkan</h1>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>email</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", { required: "Email wajib diisi" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register("password", { required: "Password is required" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                    )}
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black  focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
                                </div>
                            </form>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>Belum punya akun ? <Link to='register' className="text-black hover:underline">Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
