import { styled } from "@mui/joy";
import { IconCaretRightFilled } from "@tabler/icons-react";

export const RotatingCaret = styled(IconCaretRightFilled)(() => ({
    transform: "rotate(0deg)",
    transition: "transform 0.5s",
    "&.open": {
        transform: "rotate(90deg)",
    }
}));