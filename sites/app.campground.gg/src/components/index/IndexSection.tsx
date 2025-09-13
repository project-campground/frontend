import { Grid, Link, Stack, Typography } from "@mui/joy";
import { IconArrowRight } from "@tabler/icons-react";
import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import PrimaryButton from "../PrimaryButton";

type Props = {
    subtitle: string;
    title: string;
    description: string;
    icon: ReactNode[] | ReactNode;
    learnMore: string;
    learnMoreHref: string;
};

export default class IndexSection extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { subtitle, title, description, learnMore, learnMoreHref, icon } = this.props;

        return (
            <Grid gridColumn={1} className="IndexSection container" sx={{ height: 800 }}>
                <Stack direction="column" className="IndexSection wrapper" gap={1} alignItems="start">
                    <Stack direction="row" gap={1} alignItems="center">
                        <Typography level="title-sm" textColor="neutral.300">
                            {icon}
                        </Typography>
                        <Typography level="title-sm" fontWeight={900} textColor="neutral.300">
                            <FormattedMessage id={subtitle} />
                        </Typography>
                    </Stack>
                    <Stack direction="column" gap={1}>
                        <Typography level="h1">
                            <FormattedMessage id={title} />
                        </Typography>
                        <Typography level="body-md">
                            <FormattedMessage id={description} />
                        </Typography>
                    </Stack>
                    <Link href={learnMoreHref} underline="none" tabIndex={-1} sx={{ mt: 2 }}>
                        <PrimaryButton endDecorator={<IconArrowRight />}>
                            <FormattedMessage id={learnMore} />
                        </PrimaryButton>
                    </Link>
                </Stack>
            </Grid>
        )
    }
}