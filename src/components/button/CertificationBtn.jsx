import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";

function CertifiactionBtn({children, onPress, isActive}) {
    const handlePress = () => {
        if(isActive){
            onPress();
        }
    }

    return (
        <GetCertificationNextBtn onPress={handlePress} isActive={isActive}>
            <GetCertificationNextText isActive={isActive}>{children}</GetCertificationNextText>
        </GetCertificationNextBtn>
    );
}

export default CertifiactionBtn;

const GetCertificationNextBtn = styled.TouchableOpacity`
    position: absolute;
    bottom: 40px;
    left: 10px;
    right: 10px;
    background-color: ${props => props.isActive ? COLORS.sub : COLORS.gray_100};
    border-radius: 90px;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
`;

const GetCertificationNextText = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
color: ${props => props.isActive ? COLORS.white : COLORS.gray_300};
`
// const GetCertificationNextBtn = styled.TouchableOpacity`
//     position: absolute;
//     bottom: 40px;
//     left: 10px;
//     right: 10px;
//     background-color: ${COLORS.gray_100};
//     /* background-color: ${COLORS.sub}; */
//     border-radius: 90px;
//     align-items: center;
//     justify-content: center;
//     padding: 14px 0;
// `;

// const GetCertificationNextText = styled.Text`
// font-size: 16px;
// font-weight: 600;
// line-height: 22.40px;
// color: ${COLORS.gray_300};
// /* color: ${COLORS.white}; */
// `

