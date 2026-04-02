import { Box } from "@mui/joy";
import Form from "~/components/form/Form";
import type { SettingsComponentProps } from "../SettingsModal";
import { useMemo } from "react";
import type { TentSettingsProps } from "./TentSettingsModal";

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
                <Form
                    ref={(form) => setResetHandler(() => form?.resetValues.bind(form))}
                    sections={[
                        {
                            id: "basic",
                            fields: [
                                {
                                    type: "text",
                                    id: "name",
                                    header: "Tent Name",
                                    required: true,
                                    defaultValue: tent.name,
                                    flex: 1,
                                },
                                {
                                    type: "textarea",
                                    id: "description",
                                    header: "Topic",
                                    defaultValue: tent.description,
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