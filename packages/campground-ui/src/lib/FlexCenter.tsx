import type { PropsWithChildren } from "react";
import { styled } from "@mui/joy";
import { jsx } from "react/jsx-runtime";

type Props = PropsWithChildren;

const FlexCenterVertical = styled("div", {
    name: "FlexCenter",
    slot: "root",
})(() => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    width: "100%",
}));
const FlexCenterHorizontal = styled("div", {
    name: "FlexCenter",
    slot: "sub",
})(() => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
}));

export default function FlexCenter({ children }: Props) {
    return (
        jsx(FlexCenterVertical, {
            children: jsx(FlexCenterHorizontal, { children })
        })
    );
}