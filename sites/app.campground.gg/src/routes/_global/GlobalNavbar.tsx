import {
    Box,
    CircularProgress,
    Divider,
    Stack,
    Typography,
    Alert,
} from "@mui/joy";
import NavbarCamp from "~/components/pages/NavbarCamp";
import GlobalNavProfile from "./GlobalNavProfile";
import NavbarButton from "~/components/pages/NavbarButton";
import {
    IconCompassFilled,
    IconExclamationCircleFilled,
    IconPlus,
} from "@tabler/icons-react";
import { useAccount } from "~/context/account";
import { useSession } from "~/context/session";
import type { CampsiteViewWithDomain } from "types/campground/campsites";

type Props = {
    loadedCampsites: boolean;
    page: string | undefined | null;
};

const homePages = ["friends"];

export default function GlobalNavbar({ page, loadedCampsites: loaded }: Props) {
    const account = useAccount();
    const session = useSession();

    const campsites = account.authenticated
        ? ((session.preferences.full.campsites?.campsites
              .map((campsiteHandle) => {
                  const [domain, campsiteId] = campsiteHandle.split("@");

                  return account.campsites.find(
                      (campsite) =>
                          campsite._domain === domain &&
                          campsite.id === campsiteId,
                  );
              })
              .filter((x) => x) as CampsiteViewWithDomain[]) ?? [])
        : [];

    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction="row" sx={{ width: "100%" }} alignItems="center">
                <Stack direction="row" sx={{ m: 1 }}>
                    <NavbarButton
                        href="/"
                        isActive={!page || homePages.includes(page)}
                    >
                        <Stack
                            direction="row"
                            sx={{ width: "100%" }}
                            alignItems="center"
                        >
                            <Typography
                                component="svg"
                                sx={{
                                    height: 36,
                                    width: 36,
                                    color: "var(--svg-color)",
                                    transition: "color 0.4s",
                                }}
                            >
                                <use href="#cg-logo" />
                            </Typography>
                        </Stack>
                    </NavbarButton>
                </Stack>
                {account.authenticated && !account.account.active ? (
                    <Alert
                        sx={{ flex: 1, borderRadius: "lg" }}
                        variant="soft"
                        color="danger"
                        startDecorator={<IconExclamationCircleFilled />}
                    >
                        Your account is inactive
                    </Alert>
                ) : (
                    <>
                        <Divider
                            orientation="vertical"
                            sx={{ width: 2, mt: 1, mb: 1 }}
                        />
                        <Box
                            sx={{ overflowX: "auto", overflowY: "hidden" }}
                            flex={1}
                        >
                            <Stack
                                direction="row"
                                sx={{ flex: 1, m: 1 }}
                                gap={1}
                            >
                                {campsites.map((x) => (
                                    <NavbarCamp
                                        key={x.id}
                                        id={x.id}
                                        domain={x._domain}
                                        avatar={x.avatarUri ?? undefined}
                                        name={x.name}
                                        memberCount={x.memberCount}
                                        isActive={page === x.id}
                                    />
                                ))}
                                {!loaded && <CircularProgress />}
                                {account.authenticated && (
                                    <NavbarButton
                                        href="/c/create"
                                        isActive={page === "create"}
                                    >
                                        <IconPlus />
                                    </NavbarButton>
                                )}
                                <NavbarButton
                                    href="/discover"
                                    isActive={page === "discover"}
                                >
                                    <IconCompassFilled />
                                </NavbarButton>
                            </Stack>
                        </Box>
                    </>
                )}
                <Stack direction="row" sx={{ m: 1 }}>
                    <GlobalNavProfile />
                </Stack>
            </Stack>
        </Box>
    );
}
