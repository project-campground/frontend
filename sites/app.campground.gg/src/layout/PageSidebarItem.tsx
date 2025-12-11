import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, type ColorPaletteProp } from "@mui/joy";
import React, { ReactNode } from "react";

type Props = {
    href: string;
    active?: boolean;
    children: ReactNode[] | ReactNode;
    icon: ReactNode;
    color?: ColorPaletteProp;
};

export default class PageSidebarItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { children, active, href, icon, color } = this.props;
        return (
            <ListItem component="a" href={href} color={color} sx={{ textDecoration: "none" }}>
                <ListItemButton color={color ?? "neutral"} variant={active ? "soft" : "plain"} sx={(theme) => ({ borderRadius: theme.vars.radius.lg })}>
                    <ListItemDecorator>
                        {icon}
                    </ListItemDecorator>
                    <ListItemContent>
                        {children}
                    </ListItemContent>
                </ListItemButton>
            </ListItem>
        );
    }
}