import React, { ReactNode, type MouseEvent } from "react";
import type { FormSectionProps, AnyFormFieldProps, FieldTypeToInstance, FormFieldType } from "./forms";
import { Button, Stack, styled, Typography, type ColorPaletteProp } from "@mui/joy";

import { FormattedMessage } from "react-intl";
import FormSection from "./FormSection";
import { Group } from "components";

export type FormProps = {
    header?: ReactNode | ReactNode[];
    description?: ReactNode | ReactNode[];
    sections: FormSectionProps[];
    gap?: number;
    submitText?: string;
    submitColor?: ColorPaletteProp;
    cancelText?: string;
    children?: ReactNode[] | ReactNode;
    onSubmit?: (ev: MouseEvent<HTMLAnchorElement>, fieldValues: Record<string, any>) => Promise<unknown> | unknown;
    onChange?: (isValid: boolean, fieldValues: Record<string, any>) => Promise<unknown> | unknown;
    onCancel?: (ev: MouseEvent<HTMLAnchorElement>) => unknown;
    ReactiveComponent?: (values: Record<string, any>) => (ReactNode[] | ReactNode);
    inlineReactiveComponent?: boolean;
};
type FormState = {
    fieldValues: Record<string, any>;
    fieldRequirementFilled: Record<string, boolean | undefined>;
};

const getFieldValuesAndRequirements = (props: FormProps) => ({
    fieldValues:
        Object.fromEntries(
            props
                .sections
                .flatMap(x => x.fields)
                .map(x => [x.id, x.defaultValue])
                .filter((x) => typeof x[1] !== "undefined" && x[1] !== null)
        ),
    fieldRequirementFilled:
        Object.fromEntries(
            props
                .sections
                .flatMap(x => x.fields)
                .map(x => [x.id, !x.required || (typeof x.defaultValue !== "undefined" && x.defaultValue !== null)]))
});

const FormRoot = styled("form", {
    name: "Form",
    slot: "root",
})(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    "&.Form-with-sidebar": {
        flexDirection: "row",
        flexWrap: "wrap",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
}));
const FormContent = styled(Stack, {
    name: "Form",
    slot: "content",
})(({ theme }) => ({
    gap: theme.spacing(3),
    flex: 1,
}));

export default class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = getFieldValuesAndRequirements(props);
    }

    private static getFieldDefaultValueEntries(sections: FormSectionProps[]): [string, any][] {
        return sections.flatMap((x) => x.fields).map((x) => [x.id, x.defaultValue]);
    }

    private static getFieldDefaultValues(sections: FormSectionProps[]): Record<string, any> {
        return Object.fromEntries(this.getFieldDefaultValueEntries(sections));
    }

    componentDidUpdate(prevProps: Readonly<FormProps>, _prevState: Readonly<FormState>, _snapshot?: any): void {
        if (prevProps.sections === this.props.sections)
            return;

        const newEntries = Form.getFieldDefaultValueEntries(this.props.sections);
        const oldDefaults = Form.getFieldDefaultValues(prevProps.sections);

        // Nothing to update
        if (newEntries.every(([key, defaultValue]) => oldDefaults[key] === defaultValue))
            return;

        this.setState(getFieldValuesAndRequirements(this.props));
    }

    public onButtonSubmit(ev: MouseEvent<HTMLAnchorElement>) {
        ev.preventDefault();
        return this.props.onSubmit?.(ev, this.state.fieldValues);
    }

    private onFieldChange(props: AnyFormFieldProps, field: FieldTypeToInstance[FormFieldType], value: any): Promise<void> | void {
        console.log({ field, value });
        return this.setState(({ fieldValues, fieldRequirementFilled }) => ({
            fieldValues: {
                ...fieldValues,
                [props.id]: value
            },
            fieldRequirementFilled: {
                ...fieldRequirementFilled,
                [props.id]: field.isValid
            }
        }), () => (console.log("Form field state change", this.state), this.props.onChange?.(this.allValid, this.state.fieldValues)));
    }

    private get allValid(): boolean {
        return Object.values(this.state.fieldRequirementFilled).every(x => x);
    }

    public render(): ReactNode[] | ReactNode {
        const { header, sections, submitText, cancelText, children, ReactiveComponent, gap, submitColor, description, inlineReactiveComponent } = this.props;
        const { fieldValues } = this.state;
        console.log("Field values", {...fieldValues});

        return (
            <FormRoot className={`Form-root${inlineReactiveComponent ? " Form-with-sidebar" : ""}`}>
                <FormContent className="Form-content">
                    <Stack gap={2}>
                        {header && <Typography level="title-lg" fontWeight={700}>
                            {header}
                        </Typography>}
                        {description && <Typography level="body-md">
                            {description}
                        </Typography>}
                    </Stack>
                    {/* Sections */}
                    <Stack className="Form-sections" gap={gap ?? 4}>
                        {sections.map(section =>
                            <FormSection
                                key={section.id}
                                fieldBinding={this}
                                section={section}
                                onFieldChange={this.onFieldChange}
                                disabled={section.hide ?? section.disableOn?.(fieldValues)}
                                fieldValues={fieldValues}
                            />
                        )}
                    </Stack>
                    {/* Form footer */}
                    <Stack className="Form-footer" direction="column" gap={1} sx={{ mt: 2 }}>
                        <Group withMobileReversed gap={2} sx={{ width: "100%" }}>
                            {this.props.onCancel && <Button variant="plain" color="danger" onClick={this.props.onCancel} fullWidth>
                                <FormattedMessage id={cancelText ?? "form.cancel"} />
                            </Button>}
                            {this.props.onSubmit && <Button onClick={this.onButtonSubmit.bind(this)} variant="glow" color={submitColor ?? "primary"} fullWidth disabled={!this.allValid}>
                                <FormattedMessage id={submitText ?? "form.submit"} />
                            </Button>}
                        </Group>
                        { children }
                    </Stack>
                </FormContent>
                {ReactiveComponent && <ReactiveComponent {...fieldValues} />}
            </FormRoot>
        );
    }
}