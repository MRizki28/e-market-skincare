import { LazyLoadImage } from "react-lazy-load-image-component";
import loginBackground from "../../../../../public/loginBackground.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SweetAlertService from "../../../helper/sweetAlert";

export function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = () => async (data) => {
        try {
            const response = await axios.post(`${appUrl}/api/v1/register-user`, data)
            const responseData = response.data
            console.log(responseData)
            if (responseData.message == 'register success') {
                SweetAlertService.successRegister().then(() => {
                    window.location.href = '/login'
                })
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data.data.password == 'The password field confirmation does not match.') {
                SweetAlertService.passwordNotMatch()
            } else if (error.response && error.response.data.data.email == 'The email has already been taken.') {
                SweetAlertService.emailAlreadyExist()
            } else {
                SweetAlertService.errorAlert()
            }
        }
    }

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
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up</h1>
                            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Daftar dan nikmati semua produk yang kami tawarkan</h1>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>email</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit())} className="space-y-4">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Type Akun</label>
                                    <select
                                        id="role"
                                        {...register('role', { required: "Type akun wajib diisi" })}
                                        className={`mt-1 p-2 w-full border rounded-md outline-none transition-colors duration-300 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                                        defaultValue=""
                                    >
                                        <option value="user">User</option>
                                        <option value="distributor">Distributor</option>
                                    </select>
                                    {errors.role && (
                                        <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", { required: "Email wajib diisi", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })}
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
                                        {...register("password", { required: "Password wajib diisi" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Password konfirmasi</label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        {...register("password_confirmation", { required: "Password konfirmasi wajib diisi" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password_confirmation.message}</p>
                                    )}
                                </div>
                                <>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register("name", { required: "Nama wajib diisi" })}
                                            className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="personal_address" className="block text-sm font-medium text-gray-700">Alamat</label>
                                        <input
                                            type="text"
                                            id="personal_address"
                                            {...register("personal_address", { required: "Alamat wajib diisi" })}
                                            className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.personal_address ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.personal_address && (
                                            <p className="text-red-500 text-xs mt-1">{errors.personal_address.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="personal_phone_number" className="block text-sm font-medium text-gray-700">Nomor Handphone</label>
                                        <input
                                            type="number"
                                            id="personal_phone_number"
                                            {...register("personal_phone_number", { required: "Nomor hp wajib diisi" })}
                                            className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.personal_phone_number ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.personal_phone_number && (
                                            <p className="text-red-500 text-xs mt-1">{errors.personal_phone_number.message}</p>
                                        )}
                                    </div>
                                </>
                                <div>
                                    <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black  focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
                                </div>
                            </form>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>Sudah punya akun ? <Link to='/login' className="text-black hover:underline">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
