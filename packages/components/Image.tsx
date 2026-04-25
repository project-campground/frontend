import { styled, type Radius } from "@mui/joy";

const Image = styled("img", {
    name: "Image",
    slot: "root",
})<{ mh?: number; mw?: number; radius?: keyof Radius; noRadius?: boolean; }>(({ theme, width, height, mh, mw, radius, noRadius }) => ({
    maxHeight: mh,
    maxWidth: mw,
    width: width ?? "min-content",
    height: height ?? "min-content",
    borderRadius: noRadius ? "none" : theme.vars.radius[radius ?? "sm"],
}));
export default Image;