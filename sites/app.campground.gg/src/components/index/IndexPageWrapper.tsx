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
                <Stack direction="column" className="IndexPageWrapper body" overflow={{ overflowY: "auto", overflowX: "hidden", scrollBehavior: "smooth", width: "100%" }}>
                    <Stack className="IndexPageWrapper content" component="article" direction="column" sx={{ width: "100%" }}>
                        {children}
                    </Stack>
                    <IndexFooter />
                </Stack>
            </Stack>
        );
    }
}