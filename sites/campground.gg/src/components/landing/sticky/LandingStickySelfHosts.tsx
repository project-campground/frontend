import { AspectRatio, Avatar, Box, Card, CardContent, CardOverflow, ColorPaletteProp, Link, Sheet, Stack, Typography } from "@mui/joy";
import { Theme } from "@mui/joy/styles/types";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { floatingAnimation } from "./animations";

export default function LandingStickySelfHosts() {
    return (
        <Box>
            <LandingStickySelfHost name={"John's instance"} color="info" sx={{ animationDelay: "0.4s", opacity: 0.5 }} />
            <LandingStickySelfHost name={"My own instance"} color="primary" sx={{ top: 100, left: 100 }} />
        </Box>
    );
}
function LandingStickySelfHost({ name, color, sx }: { name: string; color: ColorPaletteProp; sx?: SystemStyleObject<Theme>; }) {
    return (
        <Card className="LandingStickySelfHost container" sx={(theme) => ({ animation: `${floatingAnimation} 5s infinite`, position: "absolute", boxShadow: theme.vars.shadow.xl, minWidth: 600, ...sx })}>
            <CardOverflow>
                <AspectRatio ratio={5} sx={{ width: "100%" }}>
                    <Box sx={(theme) => ({ background: `linear-gradient(to bottom right, ${theme.vars.palette[color][500]}, ${theme.vars.palette[color][400]})` })}>

                    </Box>
                </AspectRatio>
            </CardOverflow>
            <CardContent className="LandingStickyCampfires group">
                <Stack direction="row" spacing={2}>
                    <Avatar color={color} variant="solid" size="lg">
                        {name[0]}
                    </Avatar>
                    <Stack direction="column">
                        <Typography level="title-lg" fontWeight={900}>{name}</Typography>
                        <Stack spacing={1.5} direction="row" alignItems="center">
                            <Stack spacing={0.5} direction="row" alignItems="end">
                                <Sheet sx={{ width: 4, height: 8 }} color="warning" variant="solid"></Sheet>
                                <Sheet sx={{ width: 4, height: 12 }} color="warning" variant="solid"></Sheet>
                                <Sheet sx={(theme) => ({ backgroundColor: theme.vars.palette.neutral[400], width: 4, height: 16 })} color="neutral" variant="solid"></Sheet>
                            </Stack>
                            <Typography level="body-md" fontWeight="bolder">Medium connection</Typography>
                        </Stack>
                        <Typography level="body-md" fontWeight={700}>127.0.0.1:2025</Typography>
                        <Typography level="body-md" fontWeight={700}>
                            <Link>
                                https://campground.gg
                            </Link>
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
