import customAxios from "./customAxios";


// 상담상세조회
export const getConsultDetail = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/consulting/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 알림 목록 조회
export const getAlarmList = async ({id, type}) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/alarms/${type}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}