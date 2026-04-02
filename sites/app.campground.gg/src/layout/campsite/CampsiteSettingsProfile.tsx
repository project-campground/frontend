import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import type { CampsiteViewDetailed } from "types/campsites";
import { useMemo } from "react";

export default function CampsiteSettingsProfile({ setResetHandler, onValuesChanged, settingsProps: { campsite } }: SettingsComponentProps<{ campsite: CampsiteViewDetailed }>) {
    const defaultValues = useMemo(() => ({
        bannerUri: campsite.bannerUri ?? undefined,
        avatarUri: campsite.avatarUri ?? undefined,
        name: campsite.name,
        description: campsite.description,
        vanityUrl: campsite.vanityUrl,
        tags: campsite.tags ?? [],
    }), [campsite.id]);
    const oneOfNotDefault = (fieldValues: Record<string, any>) =>
        Object.entries(fieldValues).some(([key, value]) => defaultValues[key as keyof typeof defaultValues] != value);

    return (
        <Box sx={{ width: 500 }}>
            <Form
                ref={(form) => (form && setResetHandler(form.resetValues.bind(form)), undefined)}
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
                                placeholder: campsite.name[0]
                            },
                            {
                                type: "text",
                                id: "name",
                                header: "Campsite Name",
                                required: true,
                                defaultValue: campsite.name,
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
                                defaultValue: campsite.description,
                            },
                        ]
                    },
                    {
                        id: "discovery",
                        header: "Discovery",
                        fields: [
                            {
                                type: "text",
                                id: "vanityUrl",
                                header: "Vanity URL",
                                defaultValue: campsite.vanityUrl ?? undefined,
                            },
                            {
                                type: "tags",
                                id: "tags",
                                header: "Tags",
                                defaultValue: campsite.tags ?? [],
                            }
                        ]
                    }
                ]}
                onChange={(isValid, values) => onValuesChanged(isValid, oneOfNotDefault(values), values)}
            />
        </Box>
    )
}