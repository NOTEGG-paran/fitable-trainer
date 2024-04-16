import axios from "axios";
import Config from 'react-native-config';
import customAxios from "./customAxios";
const baseURL = Config.API_URL;
// 인증번호 받기
export const getCertificationNumber = async (phone) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/messages/certification-numbers`, { phone });
        return response.data;
    } catch (error) {
        throw error.response;
    }
}


// 강사앱 인증번호 확인
export const checkCertificationNumberTrainer = async ({name, phone, number}) => {
    try {
        const response = await axios.post(`${baseURL}/api/trainers/v1/messages/certification-numbers/valid`, { name, phone, number});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 바밀번호 변경
export const changePassword = async ({phone, password}) => {
    try {
        const response = await axios.put(`${baseURL}/api/trainers/v1/password`, { phone, password});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 휴대폰 번호 변경
export const changePhone = async (phone) => {
    try {
        const response = await customAxios.put(`/api/trainers/v1/phone`, {phone});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}