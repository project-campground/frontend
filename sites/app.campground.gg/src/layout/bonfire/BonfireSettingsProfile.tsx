import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import type { BonfireViewBasic } from "types/campsites";
import { useMemo } from "react";

export default function BonfireSettingsProfile({ setResetHandler, onValuesChanged, settingsProps: { bonfire } }: SettingsComponentProps<{ bonfire: BonfireViewBasic }>) {
    const defaultValues = useMemo(() => ({
        name: bonfire.name,
        description: bonfire.description,
        avatarUri: bonfire.avatarUri ?? undefined,
        bannerUri: bonfire.bannerUri ?? undefined,
    }), [bonfire.id]);
    const oneOfNotDefault = (fieldValues: Record<string, any>) => Object.entries(fieldValues).some(([key, value]) => defaultValues[key as keyof typeof defaultValues] != value);

    return (
        <>
            <Box sx={{ maxWidth: 500 }}>
                <Form
                    ref={(form) => setResetHandler(() => form?.resetValues.bind(form))}
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
            </Box>
        </>
    )
}