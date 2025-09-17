import React, { ReactNode } from "react";
import IndexFooter from "./IndexFooter";
import { Stack } from "@mui/joy";
import IndexBareboneWrapper from "./IndexBareboneWrapper";

type Props = {
    children: ReactNode[] | ReactNode;
};

export default class IndexPageWrapper extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { children } = this.props;

        return (
            <IndexBareboneWrapper>
                <Stack className="IndexPageWrapper content" component="article" direction="column" sx={{ width: "100%" }}>
                    {children}
                </Stack>
                <IndexFooter />
            </IndexBareboneWrapper>
        );
    }
}