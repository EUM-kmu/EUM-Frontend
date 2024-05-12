import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting6 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [title, setTitle] = useState(posting.title);
  const [errorModal, setErrorModal] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, title: title };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <PostingAppBar onCustomClick={() => handleSave()} nowPage={6} />
      <PostingBoldText>활동 제목을 적어보세요</PostingBoldText>
      <PostingInput.InputTitle
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      {errorModal && (
        <Modal onClose={() => setErrorModal(false)}>
          <Modal.Title text="활동 제목은\n필수 항목입니다." />
        </Modal>
      )}
      <BottomFixed alignDirection="row">
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            handleSave();
            navigate(-1);
          }}
        >
          이전
        </BottomFixed.Button>
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            handleSave();
            if (!title.length) {
              setErrorModal(true);
              return;
            }
            navigate("/posting/7");
          }}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
