import { Button, ColorPaletteProp, VariantProp } from "@mui/joy";
import React, { ReactNode } from "react";

export type Props = {
    children: ReactNode[] | ReactNode;
    href: string;
    active?: boolean;
    icon?: ReactNode;
    variant?: VariantProp;
    color?: ColorPaletteProp;
};

export default class LandingNavbarItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { variant, color, children, href } = this.props;
        return (
            <Button component="a" size="md" href={href} variant={variant ?? "plain"} color={color ?? "neutral"} className="IndexNavbarItem container">
                { children }
            </Button>
        );
    }
}