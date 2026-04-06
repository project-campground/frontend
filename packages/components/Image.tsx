import { styled, type Radius } from "@mui/joy";

const Image = styled("img", {
    name: "Image",
    slot: "root",
})<{ mh?: number; mw?: number; radius?: keyof Radius; noRadius?: boolean; }>(({ theme, mh, mw, radius, noRadius }) => ({
    maxHeight: mh,
    maxWidth: mw,
    width: "min-content",
    height: "min-content",
    borderRadius: noRadius ? "none" : theme.vars.radius[radius ?? "sm"],
}));
export default Image;