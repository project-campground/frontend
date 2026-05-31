import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../settings";
import type { CampsiteViewDetailed } from "types/campground/campsites";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import FormSection from "~/components/form/FormSection";
import { FormControl, FormLabel, FormHelperText } from "@mui/joy";
import FormFieldImage from "~/components/form/FormFieldImage";
import FormFieldAvatar from "~/components/form/FormFieldAvatar";
import FormFieldText from "~/components/form/FormFieldText";
import FormFieldTextArea from "~/components/form/FormFieldTextArea";
import FormFieldTags from "~/components/form/FormFieldTags";
import SettingsPageWrapper from "../settings/page";
import { IconLayoutBoardFilled } from "@tabler/icons-react";

export default function CampsiteSettingsProfile({
    setResetHandler,
    onValuesChanged,
    settingsProps: { campsite },
}: SettingsComponentProps<{ campsite: CampsiteViewDetailed }>) {
    const defaultValues = useMemo(
        () => ({
            bannerUri: campsite.bannerUri ?? null,
            avatarUri: campsite.avatarUri ?? null,
            name: campsite.name,
            description: campsite.description,
            vanityUrl: campsite.vanityUrl ?? "",
            tags: campsite.tags,
        }),
        [campsite.id],
    );
    const oneOfNotDefault = (fieldValues: Record<string, any>) =>
        Object.entries(fieldValues).some(
            ([key, value]) =>
                defaultValues[key as keyof typeof defaultValues] != value,
        );

    return (
        <SettingsPageWrapper
            startDecorator={<IconLayoutBoardFilled />}
            header={campsite.name}
        >
            <Box sx={{ width: 500 }}>
                <Form
                    ref={(form) =>
                        (form as Form | undefined) &&
                        setResetHandler(form!.reset)
                    }
                    onChange={(isValid, values) =>
                        onValuesChanged(
                            isValid,
                            oneOfNotDefault(values),
                            values,
                        )
                    }
                >
                    <FormSection>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessage
                                    id="global.banner"
                                    defaultMessage="Banner"
                                    description="The banner of campsites, bonfires and users"
                                />
                            </FormLabel>
                            <FormFieldImage
                                id="bannerUri"
                                borderRadius="md"
                                width={310}
                                sizeRatio={3.647}
                                defaultValue={defaultValues.bannerUri}
                            />
                            <FormHelperText>
                                <FormattedMessage
                                    id="app.campsites.settings.bannerNote"
                                    defaultMessage="The banner shows up in Bulletin Board"
                                    description="Notifying that campsite's banner shows up in the bulletin board"
                                />
                            </FormHelperText>
                        </FormControl>
                    </FormSection>
                    <FormSection layout="inline" alignItems="center" gap={2}>
                        <FormControl>
                            <FormFieldAvatar
                                id="avatarUri"
                                size="lg"
                                borderRadius="md"
                                variant="solid"
                                defaultValue={defaultValues.avatarUri}
                                placeholder={campsite.name[0]}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessageGlobal id="app.campsites.name" />
                            </FormLabel>
                            <FormFieldText
                                required
                                id="name"
                                defaultValue={campsite.name}
                                flex={1}
                            />
                        </FormControl>
                    </FormSection>
                    <FormSection
                        header={<FormattedMessageGlobal id="info.about" />}
                    >
                        <FormControl>
                            <FormLabel>
                                <FormattedMessageGlobal id="info.desc" />
                            </FormLabel>
                            <FormFieldTextArea
                                id="description"
                                defaultValue={campsite.description}
                            />
                        </FormControl>
                    </FormSection>
                    <FormSection
                        header={<FormattedMessageGlobal id="site.discovery" />}
                    >
                        <FormControl>
                            <FormLabel>
                                <FormattedMessage
                                    id="app.campsites.url"
                                    defaultMessage="Unique URL"
                                    description="The URL that is unique per campsite"
                                />
                            </FormLabel>
                            <FormFieldText
                                id="vanityUrl"
                                defaultValue={campsite.vanityUrl ?? ""}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessage
                                    id="info.tags.plural"
                                    defaultMessage="Tags"
                                    description="Plural form of campsite tags or other content tags"
                                />
                            </FormLabel>
                            <FormFieldTags
                                id="tags"
                                defaultValue={campsite.tags}
                            />
                        </FormControl>
                    </FormSection>
                </Form>
            </Box>
        </SettingsPageWrapper>
    );
}
