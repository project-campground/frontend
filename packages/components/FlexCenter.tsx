import type { PropsWithChildren } from "react";
import { styled } from "@mui/joy";

type Props = PropsWithChildren;

const FlexCenterVertical = styled("div", {
    name: "FlexCenter",
    slot: "root",
})(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    width: "100%",
}));
const FlexCenterHorizontal = styled("div", {
    name: "FlexCenter",
    slot: "sub",
})(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
}));

export default function FlexCenter({ children }: Props) {
    return (
        <FlexCenterVertical>
            <FlexCenterHorizontal>
                {children}
            </FlexCenterHorizontal>
        </FlexCenterVertical>
    )
}