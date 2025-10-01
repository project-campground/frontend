import { Stack } from "@mui/joy";
import React, { ReactNode } from "react";
import GlobalNavbar from "./GlobalNavbar";

type Props = {
    page: string | null;
    children: ReactNode[] | ReactNode;
};

export default class GlobalLayout extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { page, children } = this.props;

        return (
            <Stack direction="column" alignItems="stretch" sx={{ width: "100%", height: "100%" }}>
                <GlobalNavbar page={page} />
                <Stack sx={{ flex: 1, height: "100%" }}>
                    { children }
                </Stack>
            </Stack>
        )
    }
}