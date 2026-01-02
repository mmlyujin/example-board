// Axios 인스턴스 (기본 설정 모음)
// 기본 주소와 공통 설정이 탑재된 Axios를 만든다.
// axiosInstance는 서버로 데이터를 보내는 도구를 실체화 시킨것
import axios from "axios";
import {HOST_API} from "../config.js";

const axiosInstance = axios.create({
    baseURL:HOST_API, // 모든 요청은 이 주소가 앞에 자동으로 붙는다.
    headers: {
        'Content-Type' : 'application/json',
    }
})

// 응답 인터셉터 설정
// 서버에서 에러가 왔을 때 공통 처리하는 곳
axiosInstance.interceptors.response.use(
    (response) => response,
    (error)=> {
        console.error("API Error", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;