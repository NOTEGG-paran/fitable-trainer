import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Platform ,TouchableOpacity} from 'react-native';
import { COLORS } from "../../constants/color";
import CheckBox from '@react-native-community/checkbox';
function ClassDateCheckBtn({ isLesson,setIsLesson,setMember,isAssigningMember}) {


    //toggle
    const handleCheckboxChange = () => {
        console.log('ddd')
        if (isAssigningMember) return; 
        setIsLesson(!isLesson);
        if(!isLesson){
            setMember(null)
        }
    }

    if (isAssigningMember) {
        return null; // isAssigningMember가 true일 경우 아무것도 렌더링하지 않음
    }

    return (
        <>
     {
        Platform.OS === 'ios' ? (
            <CheckBoxWrapper
            onPress={handleCheckboxChange}
            disabled={isAssigningMember} 
            >
            <CheckBoxStyle
            value={!isLesson}
            tintColors={{ true: COLORS.sub, false: COLORS.gray_200 }}
            animationDuration={0}
            onCheckColor={COLORS.main}
            onFillColor={COLORS.box}
            onTintColor={COLORS.box}
            boxType={'square'}
            tintColor={COLORS.gray_200}
            // lineWidth={2}
            // style={isAssigningMember ? { opacity: 0.1 } : {}}
            // style={isAssigningMember ? { opacity: 0.0 } : {}}
            />
    
            <CheckText isChecked={!isLesson}>수업 외 일정</CheckText>
    
            
            </CheckBoxWrapper>
        ):(
            <CheckBoxWrapper
            onPress={handleCheckboxChange}
            disabled={isAssigningMember} 
            >
    
            <CheckBoxStyle
            value={!isLesson}
            disabled={isAssigningMember} 
            tintColors={{ true: COLORS.sub, false: COLORS.gray_200 }}
            animationDuration={0}
            onCheckColor={COLORS.main}
            onFillColor={COLORS.box}
            onTintColor={COLORS.box}
            boxType={'square'}
            tintColor={COLORS.gray_200}
            // lineWidth={2}
            onValueChange={handleCheckboxChange}
            />
    
            <CheckText isChecked={!isLesson}>수업 외 일정</CheckText>
    
            
            </CheckBoxWrapper>
        )
     }
     </>
    );
}

export default ClassDateCheckBtn;

const CheckBoxWrapper = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom:30px;
    margin-left: ${Platform.OS === 'ios' ? '2px' : '0px'};

`


const CheckText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${props => props.isChecked ? COLORS.sub : COLORS.gray_300};
    margin-left: 12px;
`;

const CheckBoxStyle = styled(CheckBox)`
width: 24px;
height: 24px;
`;
