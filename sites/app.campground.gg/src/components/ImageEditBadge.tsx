import { Badge, styled } from "@mui/joy";

const ImageEditBadge = styled(Badge)(({ theme }) => ({
    cursor: "pointer",
    color: theme.vars.palette.text.tertiary,
    width: "min-content",
    "& > .MuiBadge-badge": {
        backgroundColor: theme.vars.palette.background.level3,
        padding: 0,
        transitionProperty: "background, color",
        transitionDuration: "0.3s",
    },
    "&:hover > .MuiBadge-badge": {
        backgroundColor: theme.vars.palette.background.level4,
        color: theme.vars.palette.text.secondary,
    },
}));
export default ImageEditBadge;