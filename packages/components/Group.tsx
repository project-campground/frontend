import { Stack, styled } from "@mui/joy";
import type { Property } from "csstype";

const Group = styled(Stack, {
    name: "CampgroundGroup",
    slot: "root",
    
})<{ wrap?: boolean; withMobile?: boolean; mobileDirection?: Property.FlexDirection }>(({ theme, wrap, withMobile, mobileDirection }) => ({
    flexDirection: "row",
    ...(withMobile || mobileDirection
        ? {
            [theme.breakpoints.down("sm")]: {
                flexDirection: mobileDirection ?? "column",
            }
        }
        : {}
    ),
    ...(wrap ? { flexWrap: "wrap" } : {}),
}));
export default Group;