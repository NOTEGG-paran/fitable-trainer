import customAxios from "./customAxios";

// 센터 목록 조회
export const getCenterList = async () => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/integration`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 연동 센터 추가
export const addCenterList = async (id) => {
    try {
        const response = await customAxios.post('/api/trainers/v1/centers/integration', {id});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
} 

// 센터 삭제
export const deleteCenterList = async (id) => {
    try {
        const response = await customAxios.delete(`/api/trainers/v1/centers/${id}/integration`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 센터 검색
export const searchCenterList = async (search) => {
    try {
        // const response = await customAxios.get(`/api/trainers/v1/centers/searchTerm=${search}`);
        const response = await customAxios.get(`/api/trainers/v1/centers?page=0&size=3000`, { params: { searchTerm: search } });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
