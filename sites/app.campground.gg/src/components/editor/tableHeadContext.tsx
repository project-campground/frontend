import { createContext, useContext } from "react";
import type { BlockAlignment } from "~/editor/element";

export const TableHeadContext = createContext<boolean>(false);
export const useTableHeadContext = () => useContext(TableHeadContext);

export function TableHeadContextProvider({ isHead, children }: React.PropsWithChildren & { isHead?: boolean; }) {
    return (
        <TableHeadContext.Provider value={isHead ?? false}>
            {children}
        </TableHeadContext.Provider>
    )
}

export type TableAlign = {
    align: BlockAlignment;
    allAligns: BlockAlignment[] | undefined | null;
};

export const TableAlignContext = createContext<TableAlign>({ align: "left", allAligns: [] });
export const useTableAlignContext = () => useContext(TableAlignContext);

export function TableAlignContextProvider({ value, children }: React.PropsWithChildren & { value: TableAlign; }) {
    return (
        <TableAlignContext.Provider value={value}>
            {children}
        </TableAlignContext.Provider>
    )
}