import React, { ReactNode } from "react";
import IndexNavbar from "./IndexNavbar";
import { Stack } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

type Props = {
    sx?: SxProps;
    bodySx?: SxProps;
    children: ReactNode[] | ReactNode;
};

export default class IndexBareboneWrapper extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { sx, bodySx, children } = this.props;

        return (
            <Stack component="main" direction="column" className="IndexBareboneWrapper container" sx={{ scrollBehavior: "smooth", minHeight: "100%", ...sx }}>
                <IndexNavbar page="home" />
                <Stack direction="column" className="IndexBareboneWrapper body" sx={{ overflowX: "hidden", minHeight: "100%", flex: 1, width: "100%", ...bodySx }}>
                    {children}
                </Stack>
            </Stack>
        );
    }
}