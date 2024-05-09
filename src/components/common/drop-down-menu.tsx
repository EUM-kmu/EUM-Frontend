import { ButtonHTMLAttributes, Children, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

export const DropDownMenu = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      {Children.map(children, (child, i) => (
        <>
          {child}
          {i % 2 === 0 && <Divider />}
        </>
      ))}
    </Container>
  );
};

const MenuItem = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <MenuItemWrapper {...props}>{children}</MenuItemWrapper>;
};

DropDownMenu.MenuItem = MenuItem;

const Container = styled.div`
  position: absolute;
  display: flex;
  min-width: 260px;
  margin-top: 5px;
  background-color: white;
  border-radius: 1.3rem 0 1.3rem 1.3rem;
  flex-direction: column;
  top: 100%;
  right: 0;
  z-index: 10;
`;

const MenuItemWrapper = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: 1px solid transparent;
  font-size: 1.38rem;
  color: ${colorTheme.orange400};
`;

const Divider = styled.div`
  height: 2px;
  background-color: ${colorTheme.orange300};
`;
