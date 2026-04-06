import React, { ReactNode } from "react";
import LandingNavbar from "./LandingNavbar";
import { Stack } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

type Props = {
    sx?: SxProps;
    bodySx?: SxProps;
    children: ReactNode[] | ReactNode;
};

export default class LandingBareboneWrapper extends React.Component<Props> {


    render() {
        const { sx, bodySx, children } = this.props;

        return (
            <Stack component="main" direction="column" className="LandingBareboneWrapper container" sx={{ scrollBehavior: "smooth", width: "100%", minHeight: "100%", ...sx }}>
                <LandingNavbar page="home" />
                <Stack direction="column" className="LandingBareboneWrapper body" sx={{ minHeight: "100%", flex: 1, width: "100%", ...bodySx }}>
                    {children}
                </Stack>
            </Stack>
        );
    }
}