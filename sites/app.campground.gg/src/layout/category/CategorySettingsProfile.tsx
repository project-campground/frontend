import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import { useMemo } from "react";
import type { CategorySettingsProps } from "./CategorySettingsModal";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export default function CategorySettingsProfile({ setResetHandler, onValuesChanged, settingsProps: { category } }: SettingsComponentProps<CategorySettingsProps>) {
    const defaultValues = useMemo(() => ({
        name: category.name,
        description: category.description,
    }), [category.id]);
    const oneOfNotDefault = (fieldValues: Record<string, any>) => Object.entries(fieldValues).some(([key, value]) => defaultValues[key as keyof typeof defaultValues] != value);

    return (
        <>
            <Box sx={{ maxWidth: 500 }}>
                <Form
                    ref={(form) => setResetHandler(() => form?.resetValues.bind(form))}
                    sections={[
                        {
                            id: "basic",
                            fields: [
                                {
                                    type: "text",
                                    id: "name",
                                    header: <FormattedMessage
                                        id="app.tentCategories.settings.name"
                                        defaultMessage="Category name"
                                        description="The header of the category name field in settings"
                                    />,
                                    required: true,
                                    defaultValue: category.name,
                                    flex: 1,
                                },
                                {
                                    type: "textarea",
                                    id: "description",
                                    header: <FormattedMessageGlobal id="info.topic" />,
                                    defaultValue: category.description,
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