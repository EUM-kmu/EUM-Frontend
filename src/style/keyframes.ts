import { keyframes } from "styled-components";

import { colorTheme } from "./color-theme";

export const scaleUpDown = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 0 0 10px 0px ${colorTheme.orange400};
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 0 10px 5px ${colorTheme.orange400};
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 10px 0px ${colorTheme.orange400};
    }
`;

export const fadeInDown = keyframes`
0% {
    top: 0;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;
export const fadeOut = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
  }
`;
