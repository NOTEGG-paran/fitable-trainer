import customAxios from "./customAxios";
import multipartAxios from "./multipartAxios";
// get myinfo
export const getMyInfo = async () => {
    try {
        const response = await customAxios.get("/api/trainers/v1/info");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// update myinfo
export const updateMyInfo = async ({name, password}) => {
    try {
        const response = await customAxios.put("/api/trainers/v1/info", {name, password});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 프로필 조회
export const getTrainersProfileInfo = async() =>{
    try {
        const response = await customAxios.get("/api/trainers/v1/profile");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 프로필 설정
export const setTrainersProfileInfo = async(data) =>{
    try {
        const response = await multipartAxios.post("/api/trainers/v1/profile", data);
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

// 프로필 수정
export const updateTrainersProfileInfo = async(data) =>{
    try {
        const response = await multipartAxios.put("/api/trainers/v1/profile", data);
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

// 프로필 삭제
export const deleteTrainersProfileInfo = async() =>{
    try {
        const response = await customAxios.delete("/api/trainers/v1/profile");
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

// 푸쉬 알림 설정
export const setPushNotification = async(data) =>{
    try {
        const response = await customAxios.put("/api/trainers/v1/pushAlarm", data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 토큰삭제
export const deletefcmToken= async (alarmId) => {
    try {
        const response = await customAxios.delete("/api/trainers/v1/fcmToken");
        return response.data;
    } catch (error) {
        throw error;
    }
}