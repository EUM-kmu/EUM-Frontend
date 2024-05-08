import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

export const DropDownMenu = ({ children }: PropsWithChildren) => {
  return <MenuContainer>{children}</MenuContainer>;
};

const MenuItem = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <MenuItemWrapper {...props}>{children}</MenuItemWrapper>;
};

DropDownMenu.MenuItem = MenuItem;

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  width: auto;
  max-width: 100px;
  padding: 10px 7px;
  box-shadow: 0px 0px 8px 2px ${colorTheme.blue300};
  background-color: white;
  border-radius: 5px;
  flex-direction: column;
  gap: 10px;
  top: 100%;
  right: 0;
`;

const MenuItemWrapper = styled.button`
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 1rem;
`;
