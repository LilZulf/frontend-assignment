import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import authConfig from '@/config/auth';

// Define the type for your token retrieval function
type GetToken = () => string | null;

// optionaly add base url
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
    timeout: 30000,
});

const getToken: GetToken = () => {
    const token: string | null = localStorage.getItem(authConfig.accessTokenKeyName);
    return token;
};

const request = <T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const token = getToken();

    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const onSuccess = (response: AxiosResponse<T>) => response;
    const onError = (error: AxiosError) => {
        // Optionally catch errors and add some additional logging here
        return Promise.reject(error);
    };

    return api(options).then(onSuccess).catch(onError);
};

export default request;
