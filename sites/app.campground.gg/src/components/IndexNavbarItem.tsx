import { UnstyledButton } from "@mantine/core";
import React, { ReactNode } from "react";

export type Props = {
    children: ReactNode[] | ReactNode;
    href: string;
    active?: boolean;
    icon?: ReactNode;
};

export default class IndexNavbarItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { children, href } = this.props;
        return (
            <UnstyledButton component="a" href={href} className="IndexNavbarItem container">
                { children }
            </UnstyledButton>
        );
    }
}