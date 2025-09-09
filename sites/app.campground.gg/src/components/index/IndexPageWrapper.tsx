import React, { ReactNode } from "react";
import IndexNavbar from "./IndexNavbar";
import IndexFooter from "./IndexFooter";
import { Stack } from "@mui/joy";

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
            <Stack component="main" direction="column" className="IndexPageWrapper container" sx={{ overflow: "hidden", height: "100%" }}>
                <IndexNavbar page="home" />
                <Stack direction="column" className="IndexPageWrapper body" overflow={{ overflow: "auto" }}>
                    <Stack className="IndexPageWrapper content" component="article" direction="column">
                        {children}
                    </Stack>
                    <IndexFooter />
                </Stack>
            </Stack>
        );
    }
}