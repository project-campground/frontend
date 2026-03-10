import { Divider, Sheet, styled } from "@mui/joy";
import type { TentViewDetailed } from "types/tent";
import TentContentHeader from "./TentContentHeader";

type Props = React.PropsWithChildren & {
    tent: TentViewDetailed;
    sidebarToggle: (value: boolean) => unknown;
    sidebarOpen: boolean;
};

export const TentContentBox = styled(Sheet)(({ theme }) => ({
    borderRadius: theme.vars.radius.xl,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // overflow: "hidden",
    boxShadow: theme.vars.shadow.lg,
    border: `solid 1px ${theme.vars.palette.neutral.border}`,
    position: "relative",
    backgroundColor: theme.vars.palette.background.surface,
    color: theme.vars.palette.text.secondary,
}));

export const TentContentDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.body,
    height: 2,
    left: "-1px",
    right: "-1px",
    zIndex: 200,
    // position: "absolute",
}));

export default function TentContentWrapper({ sidebarOpen, sidebarToggle, tent, children }: Props) {
    return (
        <TentContentBox sx={{ width: "100%", height: "100%" }}>
            <TentContentHeader tent={tent} sidebarToggle={sidebarToggle} sidebarOpen={sidebarOpen} />
            <TentContentDivider />
            {children}
        </TentContentBox>
    )
}