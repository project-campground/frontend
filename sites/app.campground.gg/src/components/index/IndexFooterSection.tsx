import { Grid, Stack, Typography } from "@mui/joy";
import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export type Props = {
    header: string;
    children?: ReactNode[];
};

export default class IndexFooterSection extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render(): React.ReactNode {
        const { header, children } = this.props;

        return (
            <Grid gap={0.5}>
                <Typography level="title-md">
                    <FormattedMessage id={header} />
                </Typography>
                <Stack direction="column" gap={0.5}>
                    {children}
                </Stack>
            </Grid>
        );
    }
}