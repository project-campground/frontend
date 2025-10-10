import { Link } from "@mui/joy";
import React, { ReactNode } from "react";
import PrimaryButton from "components/PrimaryButton";

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
                <PrimaryButton component="button" size="md" className="LandingNavbarItem container">
                    { children }
                </PrimaryButton>
            </Link>
        );
    }
}