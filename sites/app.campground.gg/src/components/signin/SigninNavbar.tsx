import React from "react";
import BrandLogo from "../BrandLogo";
import { Box, Link, Stack } from "@mui/joy";

export type Props = {
    page: string;
};

export default class SigninNavbar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Box sx={{ position: "absolute", top: 0, zIndex: 20, backgroundColor: "transparent" }}>
                <Stack direction="row" component="nav" className="SigninNavbar container" sx={{ px: 8, py: 2 }}>
                    <Stack direction="row" className="SigninNavbar menu" alignItems="center" flex={1} gap={0}>
                        <Link component="a" href="/" color="neutral" className="IndexNavbarItem container" underline="none" sx={{ px: -2, py: 0.5 }}>
                            <BrandLogo includeText />
                        </Link>
                    </Stack>
                </Stack>
            </Box>
        );
    }
}