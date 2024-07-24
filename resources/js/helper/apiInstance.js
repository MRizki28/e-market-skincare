import axios from "axios";

export const axiosInstance = axios.create({ baseURL: "http://localhost:8888" });

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        console.log('originalRequest', originalRequest)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshedToken = await refreshToken()
                localStorage.setItem('token', refreshedToken)
                axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + refreshedToken
                originalRequest.headers['Authorization'] = 'Bearer ' + refreshedToken
                return axiosInstance(originalRequest)
            } catch (error) {
                console.log(error);
            };
        }

        return Promise.reject(error);
    }
);
