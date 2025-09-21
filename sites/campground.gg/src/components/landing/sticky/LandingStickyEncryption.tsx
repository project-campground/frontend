import { Alert, Avatar, Card, CardContent, ColorPaletteProp, Stack, Typography } from "@mui/joy";
import { Theme } from "@mui/joy/styles/types";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { IconLockFilled } from "@tabler/icons-react";
import React from "react";

const cardWidth = 500;

export default function LandingStickyEncryption() {
    return (
        <Stack sx={{ position: "relative", width: "100%" }} spacing={2}>
            <Stack spacing={1} sx={(theme) => ({
                position: "relative",
                width: cardWidth + 60,
                "::after": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10,
                    background: `linear-gradient(to bottom, transparent, ${theme.vars.palette.background.body})`
                }
            })}>
                <LandingStickyEncryptedMessage username="Joe" color="success" />
                <LandingStickyEncryptedMessage username="Sarah" color="primary" sx={{ left: 30 }} />
                <LandingStickyEncryptedMessage username="Lee" color="danger" sx={{ left: 60 }} />
                <LandingStickyEncryptedMessage username="William" color="info" sx={{ left: 30 }} />
            </Stack>
            <Alert variant="soft" color="info" startDecorator={<IconLockFilled />}>
                Chat is protected with encryption
            </Alert>
        </Stack>
    )
}

type State = {
    text: string;
};
type Props = {
    sx?: SystemStyleObject<Theme>;
    color: ColorPaletteProp;
    username: string;
};

const aCharCode = "A".charCodeAt(0);
const zCharCode = "z".charCodeAt(0);

function randomizeCharacter() {
    return String.fromCharCode(Math.floor(Math.random() * (zCharCode - aCharCode) + aCharCode));
}
function randomizeText() {
    return Array(30).join().split(",").map(randomizeCharacter).join("");
}

class LandingStickyEncryptedMessage extends React.Component<Props, State> {
    interval?: NodeJS.Timeout;
    constructor(props: Props) {
        super(props);

        this.state = {
            text: randomizeText(),
        }
    }
    componentDidMount(): void {
        this.interval = setInterval(() => this.setState({ text: randomizeText() }), 100);
    }
    componentWillUnmount(): void {
        clearInterval(this.interval);
    }
    render() {
        const { sx, color, username } = this.props;
        const { text } = this.state;

        return (
            <Card variant="plain" sx={{ width: cardWidth, ...sx }}>
                <CardContent>
                    <Stack className="LandingStickyEncryptedMessage container" direction="row" spacing={2}>
                        <Avatar color={color} variant="solid" size="lg">
                            {username[0]}
                        </Avatar>
                        <Stack spacing={0}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Typography level="title-lg" fontWeight={900}>{username}</Typography>
                                <Typography level="body-sm" textColor="neutral.400">Today at 12:43pm</Typography>
                            </Stack>
                            <Typography level="body-lg">{text}</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
}

