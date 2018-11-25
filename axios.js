import * as axios from 'axios';
import {Platform} from "react-native";
import Config from "react-native-config/index";
import DeviceStorage from "./src/storage/DeviceStorage";

const endpoint = (Platform.OS === 'android' && process.env.NODE_ENV === 'development') ?
    Config.ANDROID_API_URL : Config.API_URL;

let instance = axios.create();
instance.defaults.baseURL = endpoint;
instance.defaults.timeout = 50000;

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const access_token = await new DeviceStorage().getItem('id_token');
    if (access_token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export {instance as default};