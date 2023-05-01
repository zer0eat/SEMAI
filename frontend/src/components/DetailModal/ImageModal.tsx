import React from 'react';
import {CloseButton, Modal, ModalBackground, ModalImageContainer} from "./ModalComponents";
import CloseIcon from '@mui/icons-material/Close';
import Title from "../Title";
import {ImageModalProps} from "../../_utils/Types";
import styled from "styled-components";

const CloseDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ImageDiv = styled.div<{ imageUrl: string | undefined }>`
  flex: 1;
  background-image: url(${props => props.imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const ButtonDiv = styled.div`
  margin: 20px 0 0 0;
  
  display: flex;
  justify-content: center;
  & > button {
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
function ImageModal({detailInfo, handleModalClose}: ImageModalProps) {
  return (
    <Modal>
      <ModalBackground />
      <ModalImageContainer>
        <CloseDiv>
          <Title title="볼트 이미지 상세보기" />
          <CloseButton onClick={handleModalClose}><CloseIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        </CloseDiv>
        <ImageDiv imageUrl={detailInfo.imageUrl}/>
        <ButtonDiv>{detailInfo.buttons}</ButtonDiv>
      </ModalImageContainer>
    </Modal>
  );
}

export default ImageModal;