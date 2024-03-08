import axios from "axios";
import urlJoin from "url-join";

const apiUrl = "http://localhost:3001/api"

export function apiPublicUrl(path: string) {
    return urlJoin(apiUrl, 'public', path)
}

export function apiAdminUrl(path: string) {
    return urlJoin(apiUrl, 'admin', path)
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    console.error("✉️ ", error);
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    if(response.status === 401) {
         alert("You are not authorized");
    }
    return response.data;
}, (error) => {
    return {success: false, message: error.response.data || error.message}
});

export default axios
