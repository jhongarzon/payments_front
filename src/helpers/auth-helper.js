import API from "../lib/api.js"

const TOKEN_KEY = "SecurityTokenKey";

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function isLoggedIn() {
    return getToken() != null;
}
export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
}
export function deleteToken() {
    return localStorage.removeItem(TOKEN_KEY);
}
export function initAxiosInterceptors() {
    API.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    });

    API.interceptors.response.use((response) => {
        if (response.status === 401) {
            alert("You are not authorized");
        }
        return response;
    }, (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    });
}