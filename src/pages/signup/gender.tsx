import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import FemaleSVG from "@/assets/images/female.svg";
import MaleSVG from "@/assets/images/male.svg";
import { Header } from "@/components/signup/header";
import { profileState } from "@/recoil/atoms/profile-state";

type GenderType = "male" | "female";

export const GenderPage = () => {
  const [gender, setGender] = useState<GenderType>();
  const navigate = useNavigate();

  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    if (gender !== undefined) {
      setProfile((profile) => ({
        ...profile,
        gender,
      }));
      navigate("/signup/3");
    }
  }, [gender]);

  return (
    <ContentLayout>
      <Header text="성별을 골라주세요!" />
      <GenderContainer>
        <GenderCard onClick={() => setGender("female")}>
          <img width="100%" src={FemaleSVG} />
          <span>여성</span>
        </GenderCard>
        <GenderCard onClick={() => setGender("male")}>
          <img width="100%" src={MaleSVG} data-caption="남성" />
          <span>남성</span>
        </GenderCard>
      </GenderContainer>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  margin-top: 86px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const GenderContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const GenderCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  font-size: 25px;
`;