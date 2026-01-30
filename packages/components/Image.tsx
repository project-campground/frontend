import { styled, type Radius } from "@mui/joy";

const Image = styled("img", {
    name: "Image",
    slot: "root",
})<{ mh?: number; radius?: keyof Radius; noRadius?: boolean; }>(({ theme, mh, radius, noRadius }) => ({
    maxHeight: mh,
    width: "min-content",
    borderRadius: noRadius ? "none" : theme.vars.radius[radius ?? "sm"],
}));
export default Image;