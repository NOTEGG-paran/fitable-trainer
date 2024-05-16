import customAxios from "./customAxios";

// 앱버전 조회
export const getAppVersionCheck = async (token) => {
    try {
        const response = await customAxios.get('/api/v1/version');
        return response.data;
    } catch (error) {
        throw error;
    }
}