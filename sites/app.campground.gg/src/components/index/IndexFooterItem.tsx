import { Link } from "@mui/joy";
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
            <Link component="a" startDecorator={icon} color="neutral" className="IndexFooterItem container" href={href}>
                {children}
            </Link>
        );
    }
}