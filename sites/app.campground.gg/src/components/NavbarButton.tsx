import { Stack } from "@mui/joy";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { GlobalNavbarItem } from "~/layout/GlobalNavbarItem";

type Props = {
    isActive?: boolean;
    children: ReactNode | ReactNode[];
    href: string;
};

export default function NavbarButton(props: Props) {
    const navigate = useNavigate();
    const { children, isActive, href } = props;

    return (
        <GlobalNavbarItem sx={{ px: 1.5, py: 0.5, height: 48, width: 48 }} className={isActive ? "active" : ""} onClick={() => navigate(href)}>
            <Stack alignItems="center">
                { children }
            </Stack>
        </GlobalNavbarItem>
    );
}