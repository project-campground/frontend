import React, { ReactNode } from "react";
import IndexNavbar from "./IndexNavbar";
import { Flex } from "@mantine/core";
import IndexFooter from "./IndexFooter";

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
            <Flex component="main" direction="column" className="IndexPageWrapper container">
                <IndexNavbar page="home" />
                <Flex direction="column" className="IndexPageWrapper body">
                    <Flex className="IndexPageWrapper content" component="article" direction="column">
                        {children}
                    </Flex>
                    <IndexFooter />
                </Flex>
            </Flex>
        );
    }
}