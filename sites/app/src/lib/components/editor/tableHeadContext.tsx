import { createContext, useContext } from 'react';
import type { Path } from 'slate';
import type { BlockAlignment } from '~/editor/element';

export const TableContext = createContext<{ tablePosition: Path; rows: number; columns: number }>({
	tablePosition: [],
	rows: 0,
	columns: 0,
});
export const useTableContext = () => useContext(TableContext);

export function TableContextProvider({
	tablePosition,
	rows,
	columns,
	children,
}: React.PropsWithChildren & { tablePosition: Path; rows: number; columns: number }) {
	return (
		<TableContext.Provider value={{ tablePosition, rows, columns }}>{children}</TableContext.Provider>
	);
}

export const TableRowContext = createContext<number>(0);
export const useTableRowContext = () => useContext(TableRowContext);

export function TableRowContextProvider({
	nth,
	children,
}: React.PropsWithChildren & { nth: number }) {
	return <TableRowContext.Provider value={nth}>{children}</TableRowContext.Provider>;
}

export type TableAlign = { column: number; allAligns: BlockAlignment[] | undefined | null };

export const TableColumnContext = createContext<TableAlign>({ column: 0, allAligns: [] });
export const useTableColumnContext = () => useContext(TableColumnContext);

export function TableColumnContextProvider({
	value,
	children,
}: React.PropsWithChildren & { value: TableAlign }) {
	return <TableColumnContext.Provider value={value}>{children}</TableColumnContext.Provider>;
}
