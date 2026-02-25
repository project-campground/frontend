import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import { useMemo } from "react";
import type { CategorySettingsProps } from "./CategorySettingsModal";

export default function CategorySettingsProfile({ onValuesChanged, settingsProps: { category } }: SettingsComponentProps<CategorySettingsProps>) {
    const defaultValues = useMemo(() => ({
        name: category.name,
        description: category.description,
    }), [category.id]);
    const oneOfNotDefault = (fieldValues: Record<string, any>) => Object.entries(fieldValues).some(([key, value]) => defaultValues[key as keyof typeof defaultValues] != value);

    return (
        <>
            <Box sx={{ maxWidth: 500 }}>
                <Form
                    sections={[
                        {
                            id: "basic",
                            fields: [
                                {
                                    type: "text",
                                    id: "name",
                                    header: "Tent Name",
                                    required: true,
                                    defaultValue: category.name,
                                    flex: 1,
                                },
                                {
                                    type: "textarea",
                                    id: "description",
                                    header: "Topic",
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