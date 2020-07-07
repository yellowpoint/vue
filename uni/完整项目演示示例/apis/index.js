import http from "./http.js";
import config from "@/config/index.config.js";


//鉴权方法
export const GetAuthMethodModel = (method,data) => http.AuthUniCloudModel(method, data);
//通用方法
export const GetMethodModel = (method,data) => http.UniCloudModel(method, data);

