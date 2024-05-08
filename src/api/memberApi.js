import customAxios from "./customAxios";

// 회원등록
export const registerMember = async (data) => {
    try {
        const response = await customAxios.post("/api/trainers/v1/member", data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 기간 횟수 조회
export const getMemberConditions = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/tickets/${id}/conditions`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


// 즐겨찾는 이용권 목록 조회
export const getBookmarkTickets = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/tickets/bookmark?page=0&size=100`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 회원 상세 조회
export const getMemberDetail = async ({id,memberId}) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/members/${memberId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 회원 쿠폰 목록 조회
export const getMemberCoupons = async ({id,memberId}) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/members/${memberId}/coupons`);
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

// 회원 관리 조회
// export const getMemberManage = async ({centerId,type}) => {
//     try {
//         const response = await customAxios.get(`/api/trainers/v1/centers/${centerId}/members/type/${type}`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }


// export const getMemberManage = async ({centerId, type, searchTerm, member, ticket, leftTime}) => {
//     try {
//         const response = await customAxios.get(`/api/trainers/v1/centers/${centerId}/members/type/${type}?searchTerm`, {
//             params: {
//                 searchTerm?,
//                 member?,
//                 ticket?,
//                 leftTime?
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }
export const getMemberManage = async ({centerId, type, searchTerm, member, ticket, leftTime}) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${centerId}/members/type/${type}?page=0&size=3000`, {
            params: {
                ...(searchTerm && {searchTerm}),
                ...(member && {member}),
                ...(ticket && {ticket}),
                ...(leftTime && {leftTime})
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


// 계약서 목록 조회
export const getMemberContractList = async (id) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${id}/contracts`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// 계약서 이용권 목록 조회
export const getMemberContractTicketList = async ({centerId, memberId}) => {
    try {
        const response = await customAxios.get(`/api/trainers/v1/centers/${centerId}/members/${memberId}/contracts/tickets`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


// 결제 링크 전송
export const sendPaymentLink = async (data) => {
    try {
        const response = await customAxios.post(`/api/trainers/v1/paymentLink`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}