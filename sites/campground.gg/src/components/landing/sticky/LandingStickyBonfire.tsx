import { Avatar, Box, Card, ColorPaletteProp, Sheet, Stack, Typography } from "@mui/joy";
import { Theme } from "@mui/joy/styles/types";
import { IconCaretDownFilled, IconClockFilled, IconFileTextFilled, IconHash, IconMessageFilled, IconMountainFilled } from "@tabler/icons-react";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import React, { ReactNode } from "react";
import { floatingAnimation } from "./animations";

export default function LandingStickyBonfires() {
    return (
        <Box sx={{ position: "relative", width: "100%" }}>
            <LandingStickyCampfire name="Moderation Campfire" description="Discuss campsite's moderation" color="warning" sx={{ animation: `${floatingAnimation} 5s infinite`, animationDelay: `1s`, top: 0, left: 0, opacity: 0.5, rotate: "-2deg" }}>
                <LandingStickyBonfiresCategory name="Discussions" />
                <LandingStickyBonfiresChannel highlighted icon={<IconHash />} name="Mod discussions" />
                <LandingStickyBonfiresChannel icon={<IconMessageFilled />} name="Suspicious activity" />
                <LandingStickyBonfiresCategory name="Info" />
                <LandingStickyBonfiresChannel icon={<IconClockFilled />} name="Mod Schedule" />
                <LandingStickyBonfiresChannel icon={<IconMessageFilled />} name="Warnings" />
            </LandingStickyCampfire>
            <LandingStickyCampfire name="Minecraft Server" description="Our guild's Minecraft server" color="success" sx={{ animation: `${floatingAnimation} 5s infinite`, animationDelay: `0.5s`, top: 0, left: 300, opacity: 0.8, rotate: "2deg" }}>
                <LandingStickyBonfiresCategory name="Discussions" />
                <LandingStickyBonfiresChannel highlighted icon={<IconHash />} name="Game discussions" />
                <LandingStickyBonfiresChannel icon={<IconMountainFilled />} name="Media" />
            </LandingStickyCampfire>
            <LandingStickyCampfire name="D&D Campfire" description="Our clan's D&D / RP playing group" color="danger" sx={{ animation: `${floatingAnimation} 5s infinite`, top: 100, left: 100, rotate: "2deg", boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)" }}>
                <LandingStickyBonfiresCategory name="Discussions" />
                <LandingStickyBonfiresChannel highlighted icon={<IconHash />} name="Chat" />
                <LandingStickyBonfiresChannel icon={<IconClockFilled />} name="Player Schedule" />
                <LandingStickyBonfiresChannel icon={<IconMessageFilled />} name="Suggestions" />
                <LandingStickyBonfiresCategory name="Game channels" />
                <LandingStickyBonfiresChannel icon={<IconFileTextFilled />} name="Slayer's Profile" />
                <LandingStickyBonfiresChannel icon={<IconHash />} name="Slayer's Gameplay" />
            </LandingStickyCampfire>
        </Box>
    )
}
function LandingStickyCampfire({ sx, name, description, color, children }: { sx?: SystemStyleObject<Theme>, name: string, description: string, color: ColorPaletteProp, children: ReactNode[] | ReactNode }) {
    return (
        <Card className="LandingStickyCampfire container" sx={(theme) => ({ position: "absolute", minWidth: 400, boxShadow: theme.vars.shadow.xl, ...sx })}>
            <Box className="LandingStickyBonfires group" sx={{ px: 3, py: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar color={color} variant="solid" size="lg">
                        {name[0]}
                    </Avatar>
                    <Stack direction="column">
                        <Typography level="title-lg" fontWeight={900}>{name}</Typography>
                        <Typography level="body-md">{description}</Typography>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ px: 2, py: 1 }}>
                <Stack spacing={1}>
                    {children}
                </Stack>
            </Box>
        </Card>
    );
}
function LandingStickyBonfiresChannel({ highlighted, icon, name }: { highlighted?: boolean, icon: React.ReactNode, name: string }) {
    return (
        <Sheet sx={(theme) => ({ borderRadius: 8, px: 2, py: 1, backgroundColor: highlighted ? theme.vars.palette.background.level2 : "transparent" })}>
            <Stack spacing={1} direction="row">
                {icon}
                <Typography level="title-lg" textColor={highlighted ? "neutral.100" : "neutral.200"}>{name}</Typography>
            </Stack>
        </Sheet>
    )
}
function LandingStickyBonfiresCategory({ name }: { name: string }) {
    return (
        <Box sx={{ borderRadius: 8, px: 0, py: 1 }}>
            <Stack spacing={1} direction="row">
                <IconCaretDownFilled />
                <Typography level="title-lg" textColor="neutral.300" fontWeight={500}>{name}</Typography>
            </Stack>
        </Box>
    )
}