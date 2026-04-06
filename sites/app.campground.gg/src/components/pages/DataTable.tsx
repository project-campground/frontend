import { Checkbox, styled, Table } from "@mui/joy";
import { IconSlash } from "@tabler/icons-react";
import React, { type ReactNode } from "react";
import type { Breakpoint } from "@mui/system";

export type DataTableColumn<TItem> = {
    id: string;
    name: ReactNode[] | ReactNode;
    width?: number;
    screenSize?: Breakpoint;
    Component: (props: { item: TItem; }) => ReactNode | ReactNode[];
};

export type DataTableProps<TItem> = {
    values: TItem[];
    unselectable?: boolean;
    onSelect?: (selected: TItem) => unknown;
    onSelectAll?: () => unknown;
    selected: TItem[];
    columns: DataTableColumn<TItem>[];
};

const DataTableRoot = styled(Table, {
    name: "DataTable",
    slot: "root",
})(({ theme }) => ({
    borderRadius: theme.vars.radius.md,
    border: "solid 1px transparent",
    "--TableCell-paddingY": theme.spacing(1.5),
    "--TableCell-paddingX": theme.spacing(1),
}));
const TableRow = styled("tr", {
    name: "DataTable",
    slot: "row",
})(() => ({
}));
const TableColumn = styled("td", {
    name: "DataTable",
    slot: "column",
})(({ theme }) => ({
    [theme.breakpoints.keys.map((x) => `&.${x}`).join(", ")]: {
        display: "none",
    },
    [theme.breakpoints.up("xs")]: {
        "&.xs": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("sm")]: {
        "&.sm": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("md")]: {
        "&.md": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("lg")]: {
        "&.lg": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("xl")]: {
        "&.xl": {
            display: "table-cell",
        },
    },
}));
const TableHeadColumn = styled("th", {
    name: "DataTable",
    slot: "headColumn",
})(({ theme }) => ({
    [theme.breakpoints.keys.map((x) => `&.${x}`).join(", ")]: {
        display: "none",
    },
    [theme.breakpoints.up("xs")]: {
        "&.xs": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("sm")]: {
        "&.sm": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("md")]: {
        "&.md": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("lg")]: {
        "&.lg": {
            display: "table-cell",
        },
    },
    [theme.breakpoints.up("xl")]: {
        "&.xl": {
            display: "table-cell",
        },
    },
}));

export default class DataTable<TItem> extends React.Component<DataTableProps<TItem>> {
    constructor(props: DataTableProps<TItem>, context: any) {
        super(props, context);
    }
    toggleSelect(item: TItem) {
        return this.props.onSelect?.(item);
    }
    toggleSelectAll() {
        return this.props.onSelectAll?.();
    }
    render(): React.ReactNode {
        const { values, columns, unselectable, selected: selectedValues } = this.props;

        return (
            <DataTableRoot variant="outlined">
                <thead>
                    <tr>
                        {!unselectable && <TableHeadColumn style={{ width: 48 }}>
                            <Checkbox
                                variant="soft"
                                color={selectedValues.length === values.length && selectedValues.length ? "success" : selectedValues.length ? "warning" : "neutral"}
                                checked={Boolean(selectedValues.length)}
                                checkedIcon={selectedValues.length === values.length ? undefined : <IconSlash size={20} />}
                                onChange={() => this.toggleSelectAll()}
                                sx={{ alignSelf: "end" }}
                            />
                        </TableHeadColumn>}
                        {columns.map((x) =>
                            <TableHeadColumn key={x.id} className={x.screenSize} style={{ width: x.width }}>{x.name}</TableHeadColumn>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {values.map((y, i) =>
                        <TableRow key={i}>
                            {!unselectable && <td>
                                <Checkbox
                                    variant="soft"
                                    color={selectedValues.includes(y) ? "success" : "neutral"}
                                    checked={selectedValues.includes(y)}
                                    onChange={() => this.toggleSelect(y)}
                                />
                            </td>}
                            {columns.map(({ id, screenSize, Component }) =>
                                <TableColumn key={id} className={screenSize}>
                                    <Component item={y} />
                                </TableColumn>
                            )}
                        </TableRow>
                    )}
                </tbody>
            </DataTableRoot>
        );
    }
}