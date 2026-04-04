import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import type { BonfireViewBasic } from "types/campsites";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

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
                                    header: <FormattedMessage
                                        id="global.banner" 
                                        defaultMessage="Banner"
                                        description="The banner of campsites, bonfires and users"
                                    />,
                                    id: "bannerUri",
                                    borderRadius: "md",
                                    width: 310,
                                    sizeRatio: 3.647,
                                    defaultValue: defaultValues.bannerUri,
                                    footer: <FormattedMessage
                                        id="app.bonfires.settings.bannerNote"
                                        defaultMessage="The banner shows up at the top of the tent list"
                                        description="Notifying that bonfire's banner shows up at the top of tent list"
                                    />,
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
                                    header: <FormattedMessageGlobal id="app.bonfires.settings.name" />,
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
                                    header: <FormattedMessageGlobal id="info.description" />,
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