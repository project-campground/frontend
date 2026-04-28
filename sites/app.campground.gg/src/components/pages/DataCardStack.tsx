import { Box, Card, Checkbox, IconButton, Stack, styled } from "@mui/joy";
import { Group } from "campground-ui";
import React, { useState, type ReactNode } from "react";
import { RotatingCaret } from "../content/RotatingCaret";

export type DataCardStackProps<TItem> = {
    values: TItem[];
    unselectable?: boolean;
    onSelect?: (selected: TItem) => unknown;
    onSelectAll?: () => unknown;
    selected: TItem[];
    HeaderComponent: (props: { item: TItem }) => (ReactNode[] | ReactNode);
    Component?: (props: { item: TItem }) => (ReactNode[] | ReactNode);
};

const DataCardStackRoot = styled(Stack, {
    name: "DataTable",
    slot: "root",
})(({ theme }) => ({
    gap: theme.spacing(1),
}));

export default class DataCardStack<TItem> extends React.Component<DataCardStackProps<TItem>> {
    constructor(props: DataCardStackProps<TItem>, context: any) {
        super(props, context);
    }
    toggleSelect(item: TItem) {
        return this.props.onSelect?.(item);
    }
    toggleSelectAll() {
        return this.props.onSelectAll?.();
    }
    render(): React.ReactNode {
        const { values, unselectable, selected: selectedValues, Component, HeaderComponent } = this.props;

        return (
            <DataCardStackRoot>
                {values.map((x, i) =>
                    <DataCardStackCard
                        key={i}
                        item={x}
                        selected={selectedValues.includes(x)}
                        toggleSelect={() => this.toggleSelect(x)}
                        HeaderComponent={HeaderComponent}
                        Component={Component}
                    />
                )}
            </DataCardStackRoot>
        );
    }
}

function DataCardStackCard<T>({ item, toggleSelect, selected, unselectable, HeaderComponent, Component }: { item: T; toggleSelect: () => unknown; selected: boolean; } & Pick<DataCardStackProps<T>, "unselectable" | "HeaderComponent" | "Component">) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card>
            <Stack gap={1}>
                <Group gap={2} alignItems="center">
                    {!unselectable && <Checkbox
                        variant="soft"
                        color={selected ? "success" : "neutral"}
                        checked={selected}
                        onChange={() => toggleSelect()}
                    />}
                    <Box flex={1}>
                        <HeaderComponent item={item} />
                    </Box>
                    {Component && <IconButton size="sm" onClick={() => setExpanded(!expanded)}>
                        <RotatingCaret className={expanded ? "open" : ""} />
                    </IconButton>}
                </Group>
                <Box sx={{ transition: "height 0.3s", overflow: "hidden", height: expanded ? "min-content" : 0, }}>
                    {Component && <Component item={item} />}
                </Box>
            </Stack>
        </Card>
    );
}