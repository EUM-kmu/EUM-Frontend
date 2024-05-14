import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { ReactComponent as LoginIcon } from "@/assets/icons/login-icon.svg";
import { Modal } from "@/components/common/modal";
import { GoogleButton } from "@/components/login/google-button";
import { KakaoButton } from "@/components/login/kakao-button";
import { colorTheme } from "@/style/color-theme";
import { devLog } from "@/utils/dev-log";

export const LoginPage = () => {
  const [ready, _] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem("isLoading") === "true") setIsLoading(true);
  }, []);

  return (
    <Layout>
      <Content>
        <Header>간편하게 로그인</Header>
        <LoginIcon width="5rem" />
        {isLoading ? (
          <>로딩중입니다</>
        ) : (
          <ButtonContainer>
            <GoogleButton setIsLoading={setIsLoading} />
            <KakaoButton />
          </ButtonContainer>
        )}
      </Content>
      {ready && (
        <Modal onClose={() => devLog("blodk")}>
          <Modal.Title text="지금 서비스를\n재정비중이에요!\n\n내일 오전 6시 이후\n다시 접속부탁드려요🤗" />
        </Modal>
      )}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  font-size: 0.88rem;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.78rem;
`;

const Header = styled.h2`
  font-size: 1.67rem;
  color: ${colorTheme.orange400};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
