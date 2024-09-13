import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';  
import ImagePicker from 'react-native-image-crop-picker';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Alert } from 'react-native';
import { upLoadImage, removeImage } from '../../api/contractApi';

function ReceiptImageGrid({ img, setImg }) {
    const imgIcon = require('../../assets/img/receipticon.png');
    const closeIcon = require('../../assets/img/close.png');
    const openImagePicker = async () => {
        try {
            const result = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: false,
                multiple: false,
                compressImageQuality: 0.8,
                compressImageMaxWidth: 750,
                compressImageMaxHeight: 750,
            });

            if (!result) return;

            const imageUri = result.path;
            console.log('Selected image URI:', imageUri);

            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                name: 'receipt.jpg',
                type: 'image/jpeg'
            });

            console.log('FormData:', formData);

            // 이미지 업로드 API 호출
            const uploadResponse = await upLoadImage(formData);
            console.log('Upload response:', uploadResponse);

            if (uploadResponse && uploadResponse.path) {
                const uploadedUrl = uploadResponse.path;
                setImg(uploadedUrl); // 부모 컴포넌트에 이미지 URL 설정
                console.log('Uploaded Image URL:', uploadedUrl); // 추가 로그
            } else {
                Alert.alert('이미지 업로드 실패', '이미지를 업로드하는 동안 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Image picking error:', error);
            Alert.alert('이미지 업로드 실패', '이미지를 업로드하는 동안 오류가 발생했습니다.');
        }
    };

    const deleteImage = async () => {
        try {
            // 이미지 삭제 API 호출
            await removeImage({ url: img });
            setImg(null); // 부모 컴포넌트에서 이미지 URL 삭제
        } catch (error) {
            console.error('Image deletion error:', error);
            Alert.alert('이미지 삭제 실패', '이미지를 삭제하는 동안 오류가 발생했습니다.');
        }
    };

    return (
        <ImgContainer>
            {img ? (
                <ImagePreviewContainer>
                    <ImagePreview source={{ uri: img }} />
                    <DeleteButton onPress={deleteImage}>
                        <DeleteButtonText
                            source={closeIcon}
                        />
                    </DeleteButton>
                </ImagePreviewContainer>
            ) : (
                <ImgAddBtn onPress={openImagePicker}>
                    <AddImg source={imgIcon} />
                    <ImgText>이미지 첨부</ImgText>
                </ImgAddBtn>
            )}
        </ImgContainer>
    );
}

export default ReceiptImageGrid;

const ImgContainer = styled.View`
    margin-top: 20px;
    display: flex;
    align-items: flex-end;
`;

const ImagePreviewContainer = styled.View`
    position: relative;
`;

const ImagePreview = styled(FastImage)`
    width: 80px;
    height: 80px;
    border-radius: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    border: 1px solid ${COLORS.sub};
    padding: 4px;
`;

const DeleteButtonText = styled(FastImage)`
    width: 16px;
    height: 16px;
`;

const ImgAddBtn = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    border: 1px solid ${COLORS.gray_300};
    background-color: ${COLORS.gray_100};
    justify-content: center;
    align-items: center;
`;

const AddImg = styled(FastImage)`
    width: 24px;
    height: 24px;
`;

const ImgText = styled.Text`
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    margin-top: 6px;
    color: ${COLORS.sub};
`;
