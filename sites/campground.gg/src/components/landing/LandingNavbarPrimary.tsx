import { Button, Link } from "@mui/joy";
import React, { ReactNode } from "react";


export type Props = {
    children: ReactNode[] | ReactNode;
    href: string;
    active?: boolean;
    icon?: ReactNode;
};

export default class LandingNavbarPrimary extends React.Component<Props> {

    render(): React.ReactNode {
        const { children, href } = this.props;
        return (
            <Link underline="none" href={href} tabIndex={-1}>
                <Button variant="glow" color="primary" component="button" size="md" className="LandingNavbarItem container">
                    { children }
                </Button>
            </Link>
        );
    }
}