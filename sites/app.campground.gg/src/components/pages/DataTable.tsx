import { Checkbox, styled, Table } from "@mui/joy";
import { IconSlash } from "@tabler/icons-react";
import React, { type ReactNode } from "react";

export type DataTableColumn<TItem> = {
    id: string;
    name: ReactNode[] | ReactNode;
    width?: number;
    Component: (props: { item: TItem; }) => ReactNode | ReactNode[];
};

export type DataTableProps<TItem> = {
    values: TItem[];
    columns: DataTableColumn<TItem>[];
};
type State<TItem> = {
    selectedValues: TItem[];
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
})(() => ({
}));
const TableHeadColumn = styled("td", {
    name: "DataTable",
    slot: "headColumn",
})(() => ({
}));

export default class DataTable<TItem> extends React.Component<DataTableProps<TItem>, State<TItem>> {
    state: State<TItem> = {
        selectedValues: [],
    };
    constructor(props: DataTableProps<TItem>, context: any) {
        super(props, context);
    }
    toggleSelect(item: TItem) {
        return this.setState({
            selectedValues: this.state.selectedValues.includes(item)
                ? this.state.selectedValues.filter((x) => x !== item)
                : [...this.state.selectedValues, item]
        });
    }
    toggleSelectAll() {
        return this.setState({
            selectedValues: this.state.selectedValues.length === this.props.values.length
            ? []
            : this.props.values
        });
    }
    render(): React.ReactNode {
        const { values, columns } = this.props;
        const { selectedValues } = this.state;

        return (
            <DataTableRoot variant="outlined">
                <thead>
                    <tr>
                        <TableHeadColumn style={{ width: 48 }}>
                            <Checkbox
                                variant="soft"
                                color={selectedValues.length === values.length && selectedValues.length ? "success" : selectedValues.length ? "warning" : "neutral"}
                                checked={Boolean(selectedValues.length)}
                                checkedIcon={selectedValues.length === values.length ? undefined : <IconSlash size={20} />}
                                onChange={() => this.toggleSelectAll()}
                                sx={{ alignSelf: "end" }}
                            />
                        </TableHeadColumn>
                        {columns.map((x) =>
                            <TableHeadColumn key={x.id} style={{ width: x.width }}>{x.name}</TableHeadColumn>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {values.map((y, i) =>
                        <TableRow key={i}>
                            <td>
                                <Checkbox
                                    variant="soft"
                                    color={selectedValues.includes(y) ? "success" : "neutral"}
                                    checked={selectedValues.includes(y)}
                                    onChange={() => this.toggleSelect(y)}
                                />
                            </td>
                            {columns.map(({ id, Component }) =>
                                <TableColumn key={id}>
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