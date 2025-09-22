import React, { ReactNode } from "react";
import LandingFooter from "./LandingFooter";
import { Stack } from "@mui/joy";
import LandingBareboneWrapper from "./LandingBareboneWrapper";

type Props = {
    children: ReactNode[] | ReactNode;
};

export default class LandingPageWrapper extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { children } = this.props;

        return (
            <LandingBareboneWrapper>
                <Stack className="LandingPageWrapper content" component="article" direction="column" sx={{ width: "100%" }}>
                    {children}
                </Stack>
                <LandingFooter />
            </LandingBareboneWrapper>
        );
    }
}