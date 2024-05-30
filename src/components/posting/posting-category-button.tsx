import { styled } from "styled-components";

import { SelectToggleType } from "./type";

import CheckSVG from "@/assets/images/check.svg";
import { colorTheme } from "@/style/color-theme";

export const PostingCategoryButton = ({
  state,
  onClick,
  children,
}: SelectToggleType) => {
  return (
    <CheckTypeStyle
      style={{
        backgroundColor: state ? colorTheme.orange400 : colorTheme.blue300,
      }}
      onClick={onClick}
    >
      <CheckBoxContainer>
        <CheckBox></CheckBox>
        {state ? <CheckImg src={CheckSVG} /> : <></>}
      </CheckBoxContainer>
      <TypeSpan>{children}</TypeSpan>
    </CheckTypeStyle>
  );
};

const CheckTypeStyle = styled.button`
  width: 100%;
  height: 6.3rem;
  font-size: 1rem;
  color: #ffffff;
  border: 0;
  border-radius: 1.39rem;
  display: flex;
  flex-direction: column;
  padding: 5.26% 7% 19.8% 7%;
`;

const CheckImg = styled.img`
  width: 1.78rem;
  height: 1.28rem;
  position: absolute;
  top: -1%;
  right: 0;
  left: -1%;
`;

const CheckBoxContainer = styled.div`
  position: relative;
`;

const CheckBox = styled.div`
  position: relative;
  /* margin: 8% 0% 0% 4%; */
  width: 1.56rem;
  height: 1.56rem;
  background-color: #ffffff;
  border-radius: 0.56rem;
`;

const TypeSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
