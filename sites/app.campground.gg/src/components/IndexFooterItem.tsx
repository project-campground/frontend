import { Group, Text, UnstyledButton } from "@mantine/core";
import React, { ReactNode } from "react";

export type Props = {
    children: ReactNode[] | ReactNode;
    icon?: ReactNode;
    href?: string;
};

export default class IndexFooterItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { icon, href, children } = this.props;

        return (
            <UnstyledButton component="a" className="IndexFooterItem container" href={href}>
                <Group gap="xs">
                    {icon}
                    <Text>
                        {children}
                    </Text>
                </Group>
            </UnstyledButton>
        );
    }
}