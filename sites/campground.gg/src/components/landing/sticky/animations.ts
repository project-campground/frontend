import { keyframes } from "@emotion/react";

export const floatingAnimation = keyframes`
    0% {
        transform: translateY(15px);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(15px);
    }
`;