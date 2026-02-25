import { Stack, styled } from "@mui/joy";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import type { StackProps } from "@mui/joy";

export interface GroupProps extends React.PropsWithChildren, StackProps {
    wrap?: boolean;
    withMobile?: boolean;
    withMobileReversed?: boolean;
    className?: string;
}

const GroupRoot = styled(Stack, {
    name: "CampgroundGroup",
    slot: "root",
})<{ ownerState: GroupProps }>(({ theme }) => ({
    flexDirection: "row",
    "&.wrap": {
        flexWrap: "wrap",
    },
    "&.CampgroundGroup-mobile": {
        flexWrap: "wrap",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        }
    },
    "&.CampgroundGroup-mobile.CampgroundGroup-mobile-reverse": {
        flexWrap: "wrap-reverse",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
        }
    },
}));


const Group = forwardRef<HTMLDivElement, GroupProps>(function GradientTypography(props, ref) {
    const { wrap, withMobile, withMobileReversed, className, ...other } = props;
    const ownerState = other;

    return (
        jsx(GroupRoot, {
            ref,
            ownerState,
            className: [
                `CampgroundGroup-root`,
                (withMobile || withMobileReversed) && `CampgroundGroup-mobile`,
                withMobileReversed && `CampgroundGroup-mobile-reverse`,
                className,
            ].filter(Boolean).join(" "),
            ...other
        })
    )
});

export default Group;