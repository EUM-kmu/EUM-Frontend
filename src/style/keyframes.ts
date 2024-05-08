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
