import { Box, Button, CircularProgress, Divider, ModalClose, ModalDialog, Sheet, Stack, styled, Typography } from "@mui/joy";
import { Group } from "components";
import React, { useState } from "react";
import PageSidebar, { type PageSidebarSection } from "~/components/sidebar/PageSidebar";

type Props<TPage extends string, TProps> = {
    header: string;
    settingsProps: TProps;
    sections: PageSidebarSection[];
    defaultPage: TPage;
    settingsPages: SettingsPages<TProps>;
    onSubmit: (page: TPage, values: Record<string, any>) => Promise<unknown>;
};
export type SettingsComponentProps<T> = {
    settingsProps: T;
    onValuesChanged: (isValid: boolean, notDefault: boolean, values: Record<string, any>) => unknown;
};

type SettingsPages<TProps> = Record<string, (props: SettingsComponentProps<TProps>) => React.ReactNode | React.ReactNode[]>;

const SubmitBox = styled(Sheet)(({ theme }) => ({
    position: "absolute",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.vars.palette.background.level2,
    borderRadius: theme.vars.radius.md,
    boxShadow: theme.vars.shadow.md,
    gap: 12,
    bottom: -200,
    left: 0,
    right: 0,
    transition: "bottom ease-out 0.2s",
    "&.visible": {
        bottom: 0,
    }
}));

const SettingsPage = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level1,
    height: "100%",
    borderRadius: theme.vars.radius.md,
    overflow: "hidden",
}));

export default function SettingsModal<TPage extends string, TProps>({ header, onSubmit, settingsProps, settingsPages, defaultPage, sections }: Props<TPage, TProps>) {
    const [page, setPage] = useState(defaultPage);
    const Component = settingsPages[page];
    const [values, setValues] = useState({ values: {} as Record<string, any>, valid: false, changed: false, submitting: false });
    const pageInfo = sections.flatMap((x) => x.items).find((x) => x.id === page);

    return (
        <ModalDialog layout="fullscreen" sx={{ padding: 0, bgcolor: "background.body" }}>
            <ModalClose />
            <Stack sx={{ width: "100%", height: "100%", overflow: "hidden", px: 0.5, py: 0.5 }}>
                {/* <Group sx={{ px: 3, py: 1 }} gap={1}>
                    <Breadcrumbs>
                        <Typography level="title-lg">{pageInfo?.name ?? page}</Typography>
                        </Breadcrumbs>
                </Group> */}
                <Group sx={{ width: "100%", height: "100%", overflow: "hidden" }} flex={1} gap={0.5}>
                    <Stack gap={2} sx={{ width: 300, height: "100%", position: "relative", px: 3, py: 4, bgcolor: "background.level1", overflow: "hidden", borderRadius: "md" }}>
                        <Typography level="title-lg">{header}</Typography>
                        <Box flex={1} sx={{ overflowY: "auto" }}>
                            <PageSidebar
                                defaultActive="profile"
                                onClick={(item) => setPage(item as TPage)}
                                sections={sections}
                            />
                        </Box>
                        <SubmitBox className={values.changed ? "visible" : ""}>
                            <Typography>You have unsaved changes</Typography>
                            <Group gap={2}>
                                <Button variant="plain" color="neutral">
                                    Cancel
                                </Button>
                                <Button variant="glow" color="success" disabled={!values.valid} onClick={() => {
                                    setValues({ ...values, submitting: true })
                                    return onSubmit(page, values.values)
                                        .then(() => {
                                            setValues({ ...values, valid: false, changed: false, submitting: false })
                                        })
                                }}>{values.submitting ? <CircularProgress color="neutral" /> : "Save changes"}</Button>
                            </Group>
                        </SubmitBox>
                    </Stack>
                    <SettingsPage flex={1}>
                        <Box sx={{ px: 3, py: 2, }}>
                            <Typography level="title-lg" startDecorator={pageInfo?.startDecorator} endDecorator={pageInfo?.endDecorator}>{pageInfo?.name ?? page}</Typography>
                        </Box>
                        <Divider sx={{ bgcolor: "background.body", height: 2 }} />
                        <Box flex={1} sx={{ height: "100%", overflow: "hidden", px: 3, py: 4 }}>
                            <Component settingsProps={settingsProps} onValuesChanged={(valid, changed, values) => setValues({ submitting: false, values, valid, changed })} />
                        </Box>
                    </SettingsPage>
                </Group>
            </Stack>
        </ModalDialog>
    )
}