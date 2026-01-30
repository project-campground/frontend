import { Stack, styled } from "@mui/joy";
import type { Property } from "csstype";

const Group = styled(Stack, {
    name: "CampgroundGroup",
    slot: "root"
})<{ withMobile?: boolean; mobileDirection?: Property.FlexDirection }>(({ theme, withMobile, mobileDirection }) => ({
    flexDirection: "row",
    ...(withMobile || mobileDirection
        ? {
            [theme.breakpoints.down("sm")]: {
                flexDirection: mobileDirection ?? "column",
            }
        }
        : {}
    )
}));
export default Group;