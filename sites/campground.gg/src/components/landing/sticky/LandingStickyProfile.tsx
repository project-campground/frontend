import { AspectRatio, Avatar, Badge, Box, Card, CardContent, CardOverflow, Stack, Typography } from "@mui/joy";
import { floatingAnimation } from "./animations";

export default function LandingStickyProfile() {
    return (
        <Card sx={(theme) => ({ animation: `${floatingAnimation} 5s infinite`, border: "none", background: `linear-gradient(to bottom right, ${theme.vars.palette.danger[1000]}, ${theme.vars.palette.danger[900]})` })}>
            <CardOverflow>
                <AspectRatio ratio={5} sx={{ }}>
                    <Box sx={(theme) => ({ background: `linear-gradient(to bottom right, ${theme.vars.palette.danger[500]}, ${theme.vars.palette.danger[400]})` })}>

                    </Box>
                </AspectRatio>
                <Badge badgeInset={"14%"} size="lg" badgeContent="" variant="solid" color="success" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} sx={{ mt: -8, width: 96, height: 96 }} >
                    <Avatar color="danger" variant="solid" size="lg" sx={(theme) => ({ width: 96, height: 96, border: `solid 2px ${theme.vars.palette.background.surface}` })}>
                        <Typography fontSize={36} textColor="danger.900">
                            S
                        </Typography>
                    </Avatar>
                </Badge>
            </CardOverflow>
            <CardContent sx={{ mt: -2, px: 2, py: 1 }}>
                <Stack className="LandingStickyEncryptedMessage container" direction="column" spacing={2}>
                    <Stack spacing={0}>
                        <Stack direction="column" spacing={0}>
                            <Typography level="title-lg" fontWeight={900} fontSize={24}>Susan</Typography>
                            <Typography level="body-md" textColor="danger.600" fontSize={20} fontWeight={700}>@susan.example.com</Typography>
                            <Typography level="body-md" textColor="danger.700" fontSize={20}>1 Mutual Friend • 2 Mutual Campsites</Typography>
                            <Typography level="body-md" textColor="danger.600" fontSize={20}>Hello, I am Susan. 👋 I am an avid book reader and an author.</Typography>
                        </Stack>
                    </Stack>
                    <Card color="danger" variant="soft">
                        <CardContent>
                            <Typography level="title-lg" fontWeight={900}>Blog: Nineteen Eighty-Four — a must-read</Typography>
                            <Typography level="body-md">Nineteen Eighty-Four is a dystopian novel by the English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final completed book.</Typography>
                        </CardContent>
                        <CardOverflow sx={{ position: "absolute", bottom: 20, zIndex: 20, width: "100%" }}>
                            <Box sx={(theme) => ({ width: "100%", height: 150, background: `linear-gradient(to bottom, transparent 0%, ${theme.vars.palette.danger[900]} 95%)` })}>

                            </Box>
                        </CardOverflow>
                    </Card>
                </Stack>
            </CardContent>
        </Card>
    )
}
