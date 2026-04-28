import { Alert, AspectRatio, Avatar, Box, Button, Sheet, Stack, Typography } from "@mui/joy";
import { IconClubs, IconDiamond, IconDiamonds, IconHeart, IconSpade, IconSparkles, IconStar } from "@tabler/icons-react";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import { Group, Image } from "components";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import type { CampsiteInviteViewDetailed } from "types/campground/invites";
import FadingBanner from "~/components/pages/FadingBanner";
import { PagePlaceholderIcon, iconToText } from "~/components/pages/PagePlaceholder";
import { useSession } from "~/context/session";
import { getCampsiteRoute } from "~/util/domains";

export default function CampsiteInvite({ invite: { campsite }, inviteId, domain }: { inviteId: string; domain: string; invite: CampsiteInviteViewDetailed; }) {
    const session = useSession();
    const navigate = useNavigate();
    const [error, setError] = useState<HttpResponseError | null>(null);
    const onAccept = () =>
        session
            .atproto
            .invitesGlobal
            .use(domain, inviteId)
            .then((resp) => {
                if (!resp.ok)
                    return setError(resp);

                navigate(getCampsiteRoute(domain, campsite.id, `t/bulletin`));
                return session.preferences.addCampsiteToListGlobally(domain, campsite.id);
            });

    return (
        <Stack alignItems="center" sx={(theme) => ({ position: "relative", width: "100%", height: "100%", pt: { sm: 0, md: 8 }, background: `linear-gradient(to bottom right, transparent, ${theme.vars.palette.background.level1})` })}>
            <FadingBanner sx={{ opacity: 0.25 }}>
                <Typography level="h1" sx={{ position: "absolute", top: "7%", left: "22%", transform: "rotate(15deg)" }}>{iconToText[PagePlaceholderIcon.Appreciation]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", bottom: "42%", left: "30%", transform: "rotate(-20deg)" }}>{iconToText[PagePlaceholderIcon.Error]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "15%", right: "10%", transform: "rotate(13deg)" }}>{iconToText[PagePlaceholderIcon.WIP]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "47%", left: "7%", transform: "rotate(13deg)" }}>{iconToText[PagePlaceholderIcon.Welcome]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", bottom: "35%", right: "23%", transform: "rotate(-20deg)" }}>{iconToText[PagePlaceholderIcon.NoMore]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "20%", right: "45%", transform: "rotate(-3deg)" }}>{iconToText[PagePlaceholderIcon.NotFound]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "10%", left: "6%", transform: "rotate(-3deg)" }} textColor="text.tertiary">
                    <IconSparkles size={36} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "5%", right: "6%", transform: "rotate(-11deg)" }} textColor="text.tertiary">
                    <IconStar size={32} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", bottom: "35%", right: "50%", transform: "rotate(-32deg)" }} textColor="text.tertiary">
                    <IconDiamond size={48} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", bottom: "35%", left: "2%", transform: "rotate(0deg)" }} textColor="text.tertiary">
                    <IconDiamond size={56} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "35%", left: "56%", transform: "rotate(-10deg)" }} textColor="text.tertiary">
                    <IconDiamonds size={48} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "20%", right: "20%", transform: "rotate(-22deg)" }} textColor="text.tertiary">
                    <IconSpade size={24} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "5%", left: "50%", transform: "rotate(0deg)" }} textColor="text.tertiary">
                    <IconSpade size={28} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "38%", right: "2%", transform: "rotate(10deg)" }} textColor="text.tertiary">
                    <IconClubs size={32} />
                </Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "23%", left: "23%", transform: "rotate(9deg)" }} textColor="text.tertiary">
                    <IconHeart size={52} />
                </Typography>
            </FadingBanner>
            <Box sx={{ minWidth: { xs: "100%", md: 512 }, maxWidth: { xs: "100%", md: 512 }, height: { xs: "100%", md: "auto" } }}>
                <Sheet sx={{ height: { xs: "100%", md: "auto" }, borderRadius: "lg", boxShadow: "lg", overflow: "hidden" }}>
                    <Stack sx={(theme) => ({ pb: 2, backgroundColor: theme.vars.palette.background.level1 })}>
                        <Box>
                            <AspectRatio ratio={4} slotProps={{ content: { sx: { paddingBottom: { xs: 20, md: "calc(var(--AspectRatio-paddingBottom) - 2 * var(--variant-borderWidth, 0px))" } } } }}>
                                {campsite.bannerUri
                                ? <Image src={campsite.bannerUri} />
                                : <Box sx={(theme) => ({
                                    width: "100%",
                                    height: "100%",
                                    background: `linear-gradient(to bottom right, ${theme.vars.palette.neutral[600]}, ${theme.vars.palette.neutral[700]})`
                                })}>
                                    
                                </Box>}
                            </AspectRatio>
                        </Box>
                        <Stack direction="column" alignItems="center" gap={1} sx={{ mt: -8, mb: 2 }}>
                            <Avatar src={campsite.avatarUri ?? undefined} variant="solid" size="xxxl" sx={(theme) => ({ borderRadius: "xl", border: `solid 4px ${theme.vars.palette.background.level1}` })}>
                                {campsite.name[0]}
                            </Avatar>
                            <Stack gap={0} alignItems="center">
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Typography level="h2">{campsite.name}</Typography>
                                </Stack>
                                <Typography level="body-lg" textColor="neutral.100">{campsite.description}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack gap={2} sx={{ px: 4, pb: 4 }}>
                        <Stack alignItems="center" gap={2}>
                            <Typography>
                                <FormattedMessage
                                    id="app.invites.confirm"
                                    defaultMessage="Do you want to accept invite to this campsite?"
                                    description="Asks user whether they want to accept the invite"
                                />
                            </Typography>
                            <Group withMobileReversed gap={2}>
                                <Button variant="plain" color="neutral" onClick={() => navigate("/")}>
                                    <FormattedMessage
                                        id="app.invites.deny"
                                        defaultMessage="Deny invite"
                                        description="Button for denying an invite"
                                    />
                                </Button>
                                <Button variant="glow" color="primary" onClick={onAccept}>
                                    <FormattedMessage
                                        id="app.invites.accept"
                                        defaultMessage="Accept invite"
                                        description="Button for accepting an invite"
                                    />
                                </Button>
                            </Group>
                        </Stack>
                        {error && <Alert color="danger" sx={{ pb: 1 }}>{error.errorHeader}: {error.errorDescription}</Alert>}
                    </Stack>
                </Sheet>
            </Box>
        </Stack>
    );
}