import { Stack, Text } from "@mantine/core";
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
            <Stack gap="sm">
                <Text fw={900}>
                    <FormattedMessage id={header} />
                </Text>
                <Stack gap="xs">
                    {children}
                </Stack>
            </Stack>
        );
    }
}