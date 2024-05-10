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

export const fadeIn = keyframes`
0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

export const fadeInDown = keyframes`
0% {
    transform:translateY(-20px); 
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

export const fadeInUp = keyframes`
0% {
    transform:translateY(20px); 
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

export const slideUp = keyframes`
from {
  transform: translateY(100%);
}
  to {
    transform: translateY(0);
  }
`;

export const widthUp = keyframes`
0% {
  width: 0;
    flex: 0;
  }
  100% {
    flex: 1;
  }
}
`;
