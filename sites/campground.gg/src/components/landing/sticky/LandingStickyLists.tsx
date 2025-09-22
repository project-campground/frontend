import { keyframes } from "@emotion/react";
import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/joy";
import { Theme } from "@mui/joy/styles/types";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

const appearAnimation = keyframes`
    0% {
        opacity: 0;
    }
    5% {
        opacity: 100%;
    }
    65% {
        opacity: 100%;
    }
    70% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

export default function LandingStickyLists() {
    return (
        <Stack sx={{ position: "relative", width: "100%" }} spacing={1}>
            <LandingStickyListItem animationDelay="0s" title="Setup the tents" description="Create appropriate tents/channels for discussion" />
            <LandingStickyListSubItem animationDelay="0s" title="Media tents" description="Meme tents, cat tents" />
            <LandingStickyListItem animationDelay="1s" title="Setup the campfires" description="Create moderation and D&D campfires" />
            <LandingStickyListItem noCompletionAnimation title="Setup the roles" description="Create various roles" />
            <LandingStickyListSubItem animationDelay="2s" title="Staff roles" description="Roles for various levels of staff" />
            <LandingStickyListSubItem noCompletionAnimation title="Level roles" description="Level roles for active members" />
        </Stack>
    )
}

type Props = {
    sx?: SystemStyleObject<Theme>;
    noCompletionAnimation?: boolean;
    animationDelay?: string;
    title: string;
    description: string;
};

function LandingStickyListSubItem(props: Props) {
    return (
        <Stack direction="row">
            <Box sx={(theme) => ({ mt: -8, ml: 3, height: 112, width: 30, borderBottomLeftRadius: 12, borderBottom: `solid 3px ${theme.vars.palette.neutral[500]}`, borderLeft: `solid 3px ${theme.vars.palette.neutral[500]}` })}>

            </Box>
            <LandingStickyListItem {...props} />
        </Stack>
    )
}

class LandingStickyListItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { sx, noCompletionAnimation, animationDelay, title, description } = this.props;

        return (
            <Card sx={{ height: 96, width: 500, ...sx }}>
                <CardContent>
                    <Stack className="LandingStickyEncryptedMessage container" direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: "relative", width: "2.5rem", height: "2.5rem" }}>
                            <Avatar sx={{ position: "absolute", top: 0, left: 0 }} color="danger" variant="soft" size="md">
                                <IconX />
                            </Avatar>
                            <Avatar sx={{ position: "absolute", opacity: 0, animation: noCompletionAnimation ? `` : `${appearAnimation} 7s infinite`, animationDelay, top: 0, left: 0 }} color="success" variant="soft" size="md">
                                <IconCheck />
                            </Avatar>
                        </Box>
                        <Stack spacing={0}>
                            <Stack direction="column" spacing={0}>
                                <Typography level="title-lg" fontWeight={900}>{title}</Typography>
                                <Typography level="body-md">{description}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
}

