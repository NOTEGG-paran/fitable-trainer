import { COLORS } from "../../constants/color";
import { TextInput } from "react-native";
import styled from 'styled-components/native';

function ProfileTextArea({maxLength,value,onChangeText,profileInfo,isEditMode}) {
    return (
        <TextInputWrapper>
        <TextAreaInput
            // placeholder="소개는 10자 이상 150자 이하로 작성 가능합니다"
            placeholder={isEditMode? profileInfo :"소개는 10자 이상 150자 이하로 작성 가능합니다"}
            multiline={true}
            // numberOfLines={15}
            placeholderTextColor={COLORS.gray_300}
            maxLength={maxLength}
            value={value}
            onChangeText={onChangeText}
            // 리턴
            // returnKeyType="done"
        />
    </TextInputWrapper>
    );
}

export default ProfileTextArea;

const TextInputWrapper = styled.View`
    width: 100%;
    height: 250px;
    /* margin-top: 12px; */
`;

const TextAreaInput = styled.TextInput.attrs({
  textAlignVertical: 'top', 
})`
    flex: 1;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 15px;
    padding: 26px 16px;
    background-color: ${COLORS.white};
    font-size: 14px;
    color: ${COLORS.sub};
`;