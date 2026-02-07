import React, { ReactNode, type MouseEvent } from "react";
import type { FormSectionProps, AnyFormFieldProps, FieldTypeToInstance } from "./forms";
import { Button, Stack, Typography } from "@mui/joy";

import { FormattedMessage } from "react-intl";
import FormSection from "./FormSection";
import { Group } from "components";

export type FormProps = {
    header?: ReactNode | ReactNode[];
    sections: FormSectionProps[];
    gap?: number;
    submitText?: string;
    cancelText?: string;
    children?: ReactNode[] | ReactNode;
    onSubmit?: (ev: MouseEvent<HTMLAnchorElement>, fieldValues: Record<string, any>) => Promise<unknown> | unknown;
    onChange?: (isValid: boolean, fieldValues: Record<string, any>) => Promise<unknown> | unknown;
    onCancel?: (ev: MouseEvent<HTMLAnchorElement>) => unknown;
    ReactiveComponent?: (values: Record<string, any>) => (ReactNode[] | ReactNode);
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

export default class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = getFieldValuesAndRequirements(props);
    }

    componentDidUpdate(prevProps: Readonly<FormProps>, _prevState: Readonly<FormState>, _snapshot?: any): void {
        if (prevProps.sections === this.props.sections)
            return;

        this.setState(getFieldValuesAndRequirements(this.props));
    }

    public onButtonSubmit(ev: MouseEvent<HTMLAnchorElement>) {
        ev.preventDefault();
        return this.props.onSubmit?.(ev, this.state.fieldValues);
    }

    private onFieldChange(props: AnyFormFieldProps, field: FieldTypeToInstance[keyof FieldTypeToInstance], value: any): Promise<void> | void {
        return this.setState(({ fieldValues, fieldRequirementFilled }) => ({
            fieldValues: {
                ...fieldValues,
                [props.id]: value
            },
            fieldRequirementFilled: {
                ...fieldRequirementFilled,
                [props.id]: field.isValid
            }
        }), () => this.props.onChange?.(this.allValid, this.state.fieldValues));
    }

    private get allValid(): boolean {
        return Object.values(this.state.fieldRequirementFilled).every(x => x);
    }

    public render(): ReactNode[] | ReactNode {
        const { header, sections, submitText, cancelText, children, ReactiveComponent, gap } = this.props;
        const { fieldValues } = this.state;

        return (
            <form className="Form container">
                <Stack className="Form content" gap={3}>
                    {header && <Typography level="title-lg" fontWeight={700}>
                        {header}
                    </Typography>}
                    {/* Sections */}
                    <Stack className="Form sections" gap={gap ?? 4}>
                        {sections.map(section =>
                            <FormSection
                                key={section.id}
                                fieldBinding={this}
                                section={section}
                                onFieldChange={this.onFieldChange}
                                disabled={section.disableOn?.(fieldValues)}
                                fieldValues={fieldValues}
                            />
                        )}
                    </Stack>
                    {/* Form footer */}
                    <Stack className="Form footer" direction="column" gap={1} sx={{ mt: 2 }}>
                        <Group mobileDirection="column-reverse" gap={2}>
                            {this.props.onCancel && <Button variant="plain" color="danger" onClick={this.props.onCancel} fullWidth>
                                <FormattedMessage id={cancelText ?? "form.cancel"} />
                            </Button>}
                            {this.props.onSubmit && <Button onClick={this.onButtonSubmit.bind(this)} variant="glow" color="primary" fullWidth disabled={!this.allValid}>
                                <FormattedMessage id={submitText ?? "form.submit"} />
                            </Button>}
                        </Group>
                        {ReactiveComponent && <ReactiveComponent {...fieldValues} />}
                        { children }
                    </Stack>
                </Stack>
            </form>
        );
    }
}