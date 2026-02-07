import { Box, Button, } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import type { BonfireViewBasic } from "types/campsites";
import { useState } from "react";
import ContentDeleteModal from "../ContentDeleteModal";

export default function BonfireSettingsProfile({ onValuesChanged, settingsProps: { onBonfireDeleted, bonfire, canDeleteBonfire } }: SettingsComponentProps<{ canDeleteBonfire: boolean; onBonfireDeleted: () => unknown; bonfire: BonfireViewBasic }>) {
    const [deleteConfirmOpen, setConfirmOpen] = useState(false);

    const defaultValues = {
        name: bonfire.name,
        description: bonfire.description,
        avatarUri: bonfire.avatarUri ?? undefined,
        bannerUri: bonfire.bannerUri ?? undefined,
    };
    const oneOfNotDefault = (fieldValues: Record<string, any>) => Object.entries(fieldValues).some(([key, value]) => defaultValues[key as keyof typeof defaultValues] != value);

    return (
        <>
            <Box sx={{ maxWidth: 500 }}>
                <Form
                    sections={[
                        {
                            id: "banner",
                            fields: [
                                {
                                    type: "image",
                                    header: "Banner",
                                    id: "bannerUri",
                                    borderRadius: "md",
                                    width: 310,
                                    sizeRatio: 3.647,
                                    defaultValue: defaultValues.bannerUri,
                                    footer: "The banner shows up at the top of the tent list",
                                },
                            ]
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
                                    defaultValue: defaultValues.avatarUri,
                                    placeholder: bonfire.name[0]
                                },
                                {
                                    type: "text",
                                    id: "name",
                                    header: "Bonfire Name",
                                    required: true,
                                    defaultValue: bonfire.name,
                                    flex: 1,
                                },
                            ]
                        },
                        {
                            id: "additional",
                            header: "Information",
                            fields: [
                                {
                                    type: "textarea",
                                    id: "description",
                                    header: "Description",
                                    defaultValue: bonfire.description,
                                },
                            ]
                        },
                    ]}
                    onChange={(isValid, values) => onValuesChanged(isValid, oneOfNotDefault(values), values)}
                />
                {canDeleteBonfire && <Button variant="glow" color="danger" onClick={() => setConfirmOpen(true)}>
                    Delete bonfire
                </Button>}
            </Box>
            <ContentDeleteModal title="bonfire"
                open={deleteConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => (setConfirmOpen(false), onBonfireDeleted())}
                ContentRender={() => "..."}
            />
        </>
    )
}