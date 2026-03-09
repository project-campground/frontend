import { Alert, Avatar, Box, Card, Sheet, Stack, Typography } from "@mui/joy";
import { IconClubs, IconDiamond, IconDiamonds, IconHeart, IconSpade, IconSparkles, IconStar, IconUsers } from "@tabler/icons-react";
import type { HttpResponseError } from "api/HTTPResponse";
import { useState } from "react";
import { useNavigate } from "react-router";
import FadingBanner from "~/components/pages/FadingBanner";
import Form from "~/components/form/Form";
import { PagePlaceholderIcon, textToIcon } from "~/components/pages/PagePlaceholder";
import { useSession } from "~/context/session";

export default function CampsiteCreation() {
    const session = useSession();
    const navigate = useNavigate();
    const [error, setError] = useState<HttpResponseError | null>(null);
    const onSubmit = (_: any, fieldValues: Record<string, any>) =>
        session
            .http
            .campsites
            .create({ ...fieldValues, tags: [] as string[] } as { name: string; description: string; vanityUrl?: string; tags: string[]; })
            .then((resp) => {
                if (!resp.ok)
                    return setError(resp);

                navigate(`/c/${resp.content.campsite.id}/t/bulletin`);
            });

    return (
        <Stack alignItems="center" sx={(theme) => ({ position: "relative", width: "100%", height: "100%", pt: { sm: 0, md: 8 }, background: `linear-gradient(to bottom right, transparent, ${theme.vars.palette.background.level1})` })}>
            <FadingBanner sx={{ opacity: 0.25 }}>
                <Typography level="h1" sx={{ position: "absolute", top: "7%", left: "22%", transform: "rotate(15deg)" }}>{textToIcon[PagePlaceholderIcon.Appreciation]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", bottom: "42%", left: "30%", transform: "rotate(-20deg)" }}>{textToIcon[PagePlaceholderIcon.Error]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "15%", right: "10%", transform: "rotate(13deg)" }}>{textToIcon[PagePlaceholderIcon.WIP]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "47%", left: "7%", transform: "rotate(13deg)" }}>{textToIcon[PagePlaceholderIcon.Welcome]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", bottom: "35%", right: "23%", transform: "rotate(-20deg)" }}>{textToIcon[PagePlaceholderIcon.NoMore]}</Typography>
                <Typography level="h1" sx={{ position: "absolute", top: "20%", right: "45%", transform: "rotate(-3deg)" }}>{textToIcon[PagePlaceholderIcon.NotFound]}</Typography>
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
            <Box sx={{ minWidth: { sm: "100%", md: 512 }, maxWidth: { sm: "100%", md: 512 }, height: { sm: "100%", md: "auto" } }}>
                <Sheet sx={{ px: 6, py: 4, height: { sm: "100%", md: "auto" }, borderRadius: "lg", boxShadow: "lg" }}>
                    <Form
                        header="Create a Campsite"
                        sections={[
                            {
                                id: "display",
                                fields: [],
                                ReactiveHeader: ({ name, avatarUri }) =>
                                    <Card>
                                        <Stack direction="row" alignItems="center" gap={2} py={1}>
                                            <Avatar src={avatarUri} variant="solid" sx={{ borderRadius: "md" }}>
                                                {name?.[0] ?? "?"}
                                            </Avatar>
                                            <Stack direction="column" gap={0.2} alignItems="start">
                                                <Stack gap={1} direction="row" alignItems="center">
                                                    <Typography level="title-lg" lineHeight={1} fontSize={16}>{name?.substring(0, 32) || <Typography textColor="text.tertiary">Unnamed</Typography>}</Typography>
                                                </Stack>
                                                <Stack gap={1} direction="row" alignItems="center">
                                                    <Typography level="body-lg" textColor="neutral.300" lineHeight={1}>
                                                        <IconUsers size={16} />
                                                    </Typography>
                                                    <Typography level="body-md" lineHeight={1} fontSize={12}>1 member</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Card>
                            },
                            {
                                id: "basic",
                                layout: "inline",
                                alignItems: "center",
                                gap: 2,
                                fields: [
                                    {
                                        type: "avatar",
                                        id: "avatarUri",
                                        size: "lg",
                                        borderRadius: "md",
                                        variant: "solid",
                                        placeholder: "?",
                                    },
                                    {
                                        type: "text",
                                        id: "name",
                                        header: "Campsite Name",
                                        required: true,
                                        flex: 1,
                                    },
                                ]
                            },
                            {
                                id: "info",
                                fields: [
                                    {
                                        type: "textarea",
                                        id: "description",
                                        header: "Description",
                                        required: true,
                                    },
                                ]
                            },
                        ]}
                        onSubmit={onSubmit}
                        submitText="Create"
                    >
                        {error && <Alert color="danger">{error.errorHeader}: {error.errorDescription}</Alert>}
                    </Form>

                </Sheet>
            </Box>
        </Stack>
    );
}