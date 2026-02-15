import { Menu } from "@mui/joy";
import { createContext, useContext, useState, type MouseEvent, type ReactNode } from "react";
import { ClickAwayListener } from "@mui/base";


interface RightClickInternal<T> {
    onCreate: (props: { ItemComponent: (props: T) => ReactNode | ReactNode[], props: T, top: number, left: number }) => unknown;
}
export interface RightClick<TElem> {
    listeners: { onContextMenu: (ev: MouseEvent<TElem>) => false; };
}

const RightClickContext = createContext<RightClickInternal<any>>(null!);
export function useRightClick<TElem, TProps>({ MenuComponent, menuProps }: { menuProps: TProps, MenuComponent: (props: TProps) => ReactNode | ReactNode[] }): RightClick<TElem> {
    const rightClick = useContext(RightClickContext);

    return {
        listeners: {
            // onContextMenu: defaultOnContextMenu,
            onContextMenu: (ev: MouseEvent<TElem>) => {
                ev.preventDefault();
                rightClick.onCreate({ ItemComponent: MenuComponent, props: menuProps, left: ev.pageX, top: ev.pageY });
                return false;
            }
        }
    };
}
export function RightClickProvider({ children }: React.PropsWithChildren) {
    const [menu, setMenu] = useState<{ ItemComponent: (props: any) => ReactNode | ReactNode[], props: any, top: number, left: number } | null>(null);
    const removeMenu = () => setMenu(null);

    return (
        <RightClickContext.Provider value={{ onCreate: setMenu }}>
            {children}
            {menu && <ClickAwayListener onClickAway={removeMenu}>
                <Menu variant="soft" onClose={removeMenu} open={true} onClick={() => setMenu(null)} style={{ left: menu.left, top: menu.top }}>
                    <menu.ItemComponent {...menu.props} />
                </Menu>
            </ClickAwayListener>}
        </RightClickContext.Provider>
    )
}