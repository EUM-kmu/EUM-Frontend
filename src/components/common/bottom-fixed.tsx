import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

type ButtonProps = {
  rounded?: boolean;
  color?: "blue" | "orange";
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type BottomFixedProps = {
  alignDirection?: "row" | "column";
  children: React.ReactNode;
};

const Button = ({ rounded = true, color = "blue", ...props }: ButtonProps) => {
  return (
    <StyledButton $rounded={rounded} color={color} {...props}>
      {props.children}
    </StyledButton>
  );
};

export const BottomFixed = ({
  alignDirection = "row",
  children,
}: BottomFixedProps) => {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState<string[]>([]);
  const [resizeHeight, setResizeHeight] = useState<number>(0);

  useEffect(() => {
    setCurrentUrl(getCurrentPage(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const resizeHandler = (event: Event) => {
      setResizeHeight(
        window.innerHeight - (event.currentTarget as VisualViewport)?.height,
      );
    };
    visualViewport && visualViewport.addEventListener("resize", resizeHandler);

    return () => visualViewport?.removeEventListener("resize", resizeHandler);
  }, []);

  function getCurrentPage(url: string): string[] {
    return url.split("/");
  }

  return (
    <BottomFixedContainer
      $alignDirection={alignDirection}
      style={{
        paddingBottom: `calc(${
          currentUrl[1] == "post" ||
          (currentUrl[1] == "chat" && !currentUrl[2]) ||
          currentUrl[1] == "mypage"
            ? "4rem"
            : "2.2rem"
        } + ${!resizeHeight ? 0 : resizeHeight - 20}px)`,
        paddingTop: `calc(${
          currentUrl[1] == "post" ||
          (currentUrl[1] == "chat" && !currentUrl[2]) ||
          currentUrl[1] == "mypage"
            ? "0.5rem" // 네비바(3.5rem)와 BottomFixedContainer(4rem)사이의 간격 만큼 TOP 을 추가함
            : "0rem"
        } + ${!resizeHeight ? 0 : resizeHeight - 20}px)`,
      }}
    >
      {children}
    </BottomFixedContainer>
  );
};

BottomFixed.Button = Button;

const BottomFixedContainer = styled.div<{ $alignDirection: string }>`
  display: flex;
  position: fixed;
  padding: 0 2rem;
  flex-direction: ${({ $alignDirection }) => $alignDirection};
  gap: 11px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
`;

const StyledButton = styled.button<{
  $rounded: boolean;
  color: "blue" | "orange";
}>`
  position: relative;
  width: 100%;
  max-width: calc(480px - 3.2rem);
  margin: auto;
  padding: 12px;
  border: 1px solid transparent;
  ${({ color }) =>
    color === "blue"
      ? `background-color: ${colorTheme.blue900};
    &:active{
      background-color: #fff;
      color: ${colorTheme.blue900};
      border: 1px solid ${colorTheme.blue900};
    }
    `
      : `background-color: ${colorTheme.orange400}; 
      &:active{
      background-color: #fff;
      color: ${colorTheme.orange400};
      border: 1px solid ${colorTheme.orange400};
    }`};

  ${({ $rounded }) => $rounded && "border-radius: 50px;"}
  color: white;
  font-size: 1.3rem;
`;
