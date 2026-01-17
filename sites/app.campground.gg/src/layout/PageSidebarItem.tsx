import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, type ColorPaletteProp } from "@mui/joy";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
    href: string;
    active?: boolean;
    children: ReactNode[] | ReactNode;
    icon: ReactNode;
    color?: ColorPaletteProp;
};

export default function PageSidebarItem({ children, active, href, icon, color }: Props) {
    const navigate = useNavigate();

    return (
        <ListItem color={color} sx={{ textDecoration: "none" }} onClick={() => navigate(href)}>
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