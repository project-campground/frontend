import { Avatar, Box, ColorPaletteProp, Sheet, Stack, Typography } from "@mui/joy";
import { Theme } from "@mui/joy/styles/types";
import { IconCaretDown, IconClockFilled, IconFileTextFilled, IconHash, IconMessageFilled, IconMountainFilled } from "@tabler/icons-react";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import React, { ReactNode } from "react";
import { floatingAnimation } from "./animations";

export default function LandingStickyCampfires() {
    return (
        <Box sx={{ position: "relative", width: "100%" }}>
            <LandingStickyCampfire name="Moderation Campfire" description="Discuss campsite's moderation" color="warning" sx={{ animation: `${floatingAnimation} 5s infinite`, animationDelay: `1s`, top: 0, left: 0, opacity: 0.5, rotate: "-2deg" }}>
                <LandingStickyCampfiresCategory name="Discussions" />
                <LandingStickyCampfiresChannel highlighted icon={<IconHash />} name="Mod discussions" />
                <LandingStickyCampfiresChannel icon={<IconMessageFilled />} name="Suspicious activity" />
                <LandingStickyCampfiresCategory name="Info" />
                <LandingStickyCampfiresChannel icon={<IconClockFilled />} name="Mod Schedule" />
                <LandingStickyCampfiresChannel icon={<IconMessageFilled />} name="Warnings" />
            </LandingStickyCampfire>
            <LandingStickyCampfire name="Minecraft Server" description="Our guild's Minecraft server" color="success" sx={{ animation: `${floatingAnimation} 5s infinite`, animationDelay: `0.5s`, top: 0, left: 300, opacity: 0.8, rotate: "2deg" }}>
                <LandingStickyCampfiresCategory name="Discussions" />
                <LandingStickyCampfiresChannel highlighted icon={<IconHash />} name="Game discussions" />
                <LandingStickyCampfiresChannel icon={<IconMountainFilled />} name="Media" />
            </LandingStickyCampfire>
            <LandingStickyCampfire name="D&D Campfire" description="Our clan's D&D / RP playing group" color="danger" sx={{ animation: `${floatingAnimation} 5s infinite`, top: 100, left: 100, rotate: "2deg", boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)" }}>
                <LandingStickyCampfiresCategory name="Discussions" />
                <LandingStickyCampfiresChannel highlighted icon={<IconHash />} name="Chat" />
                <LandingStickyCampfiresChannel icon={<IconClockFilled />} name="Player Schedule" />
                <LandingStickyCampfiresChannel icon={<IconMessageFilled />} name="Suggestions" />
                <LandingStickyCampfiresCategory name="Game channels" />
                <LandingStickyCampfiresChannel icon={<IconFileTextFilled />} name="Slayer's Profile" />
                <LandingStickyCampfiresChannel icon={<IconHash />} name="Slayer's Gameplay" />
            </LandingStickyCampfire>
        </Box>
    )
}
function LandingStickyCampfire({ sx, name, description, color, children }: { sx?: SystemStyleObject<Theme>, name: string, description: string, color: ColorPaletteProp, children: ReactNode[] | ReactNode }) {
    return (
        <Sheet className="LandingStickyCampfire container" sx={(theme) => ({ position: "absolute", minWidth: 400, background: theme.vars.palette.background.level2, borderRadius: 16, boxShadow: theme.vars.shadow.xl, ...sx })}>
            <Box className="LandingStickyCampfires group" sx={{ px: 3, py: 2 }}>
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
        </Sheet>
    );
}
function LandingStickyCampfiresChannel({ highlighted, icon, name }: { highlighted?: boolean, icon: React.ReactNode, name: string }) {
    return (
        <Sheet sx={(theme) => ({ borderRadius: 8, px: 2, py: 1, backgroundColor: highlighted ? theme.vars.palette.background.level4 : theme.vars.palette.background.level2 })}>
            <Stack spacing={1} direction="row">
                {icon}
                <Typography level="title-lg" textColor={highlighted ? "neutral.100" : "neutral.200"}>{name}</Typography>
            </Stack>
        </Sheet>
    )
}
function LandingStickyCampfiresCategory({ name }: { name: string }) {
    return (
        <Sheet sx={(theme) => ({ borderRadius: 8, px: 0, py: 1, backgroundColor: theme.vars.palette.background.level2 })}>
            <Stack spacing={1} direction="row">
                <IconCaretDown />
                <Typography level="title-lg" textColor="neutral.300" fontWeight={500}>{name}</Typography>
            </Stack>
        </Sheet>
    )
}