import { styled, Tab, TabList, type TabListProps } from "@mui/joy";
import { useRef, type ReactNode } from "react";
import { useTabsList } from "@mui/base";
import { jsx, Fragment } from "react/jsx-runtime";

const SmoothTabListRoot = styled(TabList, {
    name: "SmoothTabList",
    slot: "root",
})(() => ({
    position: "relative",
    overflow: "hidden",
}));
const SmoothTabListBackground = styled("div", {
    name: "SmoothTabList",
    slot: "background",
})(({ theme }) => ({
    position: "absolute",
    transition: "left ease-out 0.2s",
    height: "100%",
    backgroundColor: theme.vars.palette.background.level2,
}));
const SmoothTab = styled(Tab, {
    name: "SmoothTab",
    slot: "root",
})(({ theme }) => ({
    transition: "color 0.2s",
    "&.Mui-selected": {
        backgroundColor: "transparent",
    },
    "&:hover, &:not(&.Mui-selected, [aria-selected=\"true\"]):hover": {
        backgroundColor: "transparent",
        color: theme.vars.palette.text.secondary,
    }
}));

type SmoothTabListProps = Omit<TabListProps, "children"> & {
    tabs: Array<{
        id: string | number | boolean;
        name: ReactNode[] | ReactNode;
        startDecorator?: ReactNode[] | ReactNode;
        endDecorator?: ReactNode[] | ReactNode;
    }>;
}

export default function SmoothTabList({ tabs, onChange, ...props }: SmoothTabListProps) {
    const ref = useRef(null);
    const { selectedValue } = useTabsList({ rootRef: ref });
    const currentTabIndex = tabs.findIndex((x) => x.id === selectedValue);
    const tabWidth = 100 / tabs.length;

    return (
        jsx(SmoothTabListRoot, {...props, ref, children: [
            jsx(SmoothTabListBackground, { sx: { left: `${currentTabIndex * tabWidth}%`, width: `${tabWidth}%` } }, "background"),
            ...tabs.map((x) =>
                jsx(SmoothTab, {children: [
                    jsx(Fragment, { children: x.startDecorator }, "start"),
                    jsx(Fragment, { children: x.name }, "name"),
                    jsx(Fragment, { children: x.endDecorator }, "end"),
                ]}, x.id.toString())
            )
        ]})
    );
}