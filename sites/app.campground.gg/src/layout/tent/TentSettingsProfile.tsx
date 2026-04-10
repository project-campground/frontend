import { Box, FormControl, FormLabel } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import { useMemo } from "react";
import type { TentSettingsProps } from "./TentSettingsModal";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import FormSection from "~/components/form/FormSection";
import FormFieldText from "~/components/form/FormFieldText";
import FormFieldTextArea from "~/components/form/FormFieldTextArea";

export default function TentSettingsProfile({ onValuesChanged, setResetHandler, settingsProps: { tent } }: SettingsComponentProps<TentSettingsProps>) {
    const defaultValues = useMemo(() => ({
        name: tent.name,
        description: tent.description,
        viewType: tent.viewType,
    }), [tent.id]);
    const oneOfNotDefault = (fieldValues: Record<string, any>) => Object.entries(fieldValues).some(([key, value]) => defaultValues[key as keyof typeof defaultValues] != value);

    return (
        <>
            <Box sx={{ maxWidth: 500 }}>
                <Form ref={(form) => form as Form | undefined && setResetHandler(form!.reset)} onChange={(isValid, values) => onValuesChanged(isValid, oneOfNotDefault(values), values)}>
                    <FormSection>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessage
                                    id="app.tents.settings.name"
                                    defaultMessage="Tent name"
                                    description="The header of the tent name field in settings"
                                />
                            </FormLabel>
                            <FormFieldText
                                required
                                flex={1}
                                id="name"
                                defaultValue={tent.name}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                <FormattedMessageGlobal id="info.topic" />
                            </FormLabel>
                            <FormFieldTextArea
                                required
                                id="description"
                                defaultValue={tent.description}
                            />
                        </FormControl>
                    </FormSection>
                </Form>
            </Box>
        </>
    )
}