import { Container, Group, NavLink, Text } from "@mantine/core";
import React, { ReactNode } from "react";

export type Props = {
    children: ReactNode[] | ReactNode;
    icon?: ReactNode;
};

export default class IndexFooterItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { icon, children } = this.props;

        return (
            <NavLink className="IndexFooterItem container">
                <Group gap="xs">
                    {icon && <Container>
                        {icon}
                    </Container>}
                    <Text>
                        {children}
                    </Text>
                </Group>
            </NavLink>
        );
    }
}