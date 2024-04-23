import customAxios from "./customAxios";


// 수업 등록 가능 여부 조회
export const getLessonAvailable = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/valid`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 월별 수업 가능 일자 조회 (달력)
export const getLessonCalendar = async ({id, year, month}) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/dates/year/${year}/month/${month}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 일별 수업 목록 조회
export const getLessonList = async (id, date) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/lessons/date/${date}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


// 수업 상세 api
export const getLessonDetail = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/lessons/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 수업 회원 상세 api
export const getLessonMemberDetail = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/lessons/members/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


// 예약 가능한 회원 조회
export const getLessonReservationMembers = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/lessons/${id}/members/reservation/valid`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 회원 예약
export const postLessonReservation = async ({lessonId, memberTicketId}) => {
    try {
        const response = await customAxios.post(`/api/trainers/v1/lessons/reserve`, {lessonId, memberTicketId});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 수업 예약 취소
export const cancelLessonReservation = async (id) => {
    try {
        const response = await customAxios.post(`/api/trainers/v1/lessons/cancel`, {id});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


// 수업 출석 처리
export const postLessonAttendance = async (id) => {
    try {
        const response = await customAxios.post(`/api/trainers/v1/lessons/attendance`, {id});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 수업 결석 처리
export const postLessonAbsent = async (id) => {
    try {
        const response = await customAxios.post(`/api/trainers/v1/lessons/absent`, {id});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}