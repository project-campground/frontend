import { List, Stack, styled } from "@mui/joy";
import { ReactNode } from "react";

const PageSidebar = styled(Stack, {
    name: "PageSidebar"
})(() => ({
    padding: "20px 20px",
    width: 300,
}));
export function PageSidebarList({ children }: { children: ReactNode[] | ReactNode }) {
    return (
        <List size="lg">
            {children}
        </List>
    );
}
export default PageSidebar;