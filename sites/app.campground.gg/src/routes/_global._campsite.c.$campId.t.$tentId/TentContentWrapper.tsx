import { Divider, Sheet, styled } from "@mui/joy";
import type { TentViewDetailed } from "types/tent";
import TentContentHeader from "./TentContentHeader";

type Props = React.PropsWithChildren & {
    tent: TentViewDetailed;
    sidebarToggle: (value: boolean) => unknown;
    sidebarOpen: boolean;
};

const TentContentBox = styled(Sheet)(({ theme }) => ({
    borderRadius: theme.vars.radius.xl,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
}));

const TentContentDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.body,
    height: 2,
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