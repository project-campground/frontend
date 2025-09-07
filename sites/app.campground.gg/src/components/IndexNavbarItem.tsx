import { Button, ButtonVariant } from "@mantine/core";
import React, { ReactNode } from "react";

export type Props = {
    children: ReactNode[] | ReactNode;
    href: string;
    active?: boolean;
    icon?: ReactNode;
    variant?: ButtonVariant;
};

export default class IndexNavbarItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { variant, children, href } = this.props;
        return (
            <Button component="a" size="md" href={href} variant={variant ?? "transparent"} color="default" className="IndexNavbarItem container">
                { children }
            </Button>
        );
    }
}