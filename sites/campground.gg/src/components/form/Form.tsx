import React, { FormEvent, ReactNode } from "react";
import { AnyFormField, FormSectionProps, AnyFormFieldProps } from "./forms";
import { Stack, Typography } from "@mui/joy";
import PrimaryButton from "components/PrimaryButton";
import { FormattedMessage } from "react-intl";
import FormSection from "./FormSection";

export type FormProps = {
    header?: ReactNode | ReactNode[];
    sections: FormSectionProps[];
    submitText?: string;
    children?: ReactNode[] | ReactNode;
    onSubmit: (ev: FormEvent<HTMLFormElement>, fieldValues: Record<string, any>) => Promise<void> | void;
};
type FormState = {
    fieldValues: Record<string, any>;
    fieldRequirementFilled: Record<string, boolean | undefined>;
};

export default class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            fieldValues: {},
            fieldRequirementFilled: Object.fromEntries(
                props
                    .sections
                    .flatMap(x => x.fields)
                    .map(x => [x.id, !x.required || !!x.defaultValue]))
        };
    }

    public onButtonSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        return this.props.onSubmit(ev, this.state.fieldValues);
    }

    private onFieldChange(props: AnyFormFieldProps, field: AnyFormField, value: any): Promise<void> | void {
        this.setState(({ fieldValues, fieldRequirementFilled }) => ({
            fieldValues: {
                ...fieldValues,
                [props.id]: value
            },
            fieldRequirementFilled: {
                ...fieldRequirementFilled,
                [props.id]: field.isValid
            }
        }));

        return props.onChange && props.onChange(field, value);
    }

    private get isButtonDisabled(): boolean {
        return (
            !Object.values(this.state.fieldRequirementFilled).every(x => x)
        );
    }

    public render(): ReactNode[] | ReactNode {
        const { header, sections, submitText, children } = this.props;

        return (
            <form className="Form container" onSubmit={this.onButtonSubmit.bind(this)}>
                <Stack className="Form content" gap={3}>
                    {header && <Typography level="title-lg" fontWeight={700}>
                        {header}
                    </Typography>}
                    {/* Sections */}
                    <Stack className="Form sections" gap={3}>
                        {sections.map(section =>
                            <FormSection
                                fieldBinding={this}
                                section={section}
                                onFieldChange={this.onFieldChange}
                            />
                        )}
                    </Stack>
                    {/* Form footer */}
                    <Stack className="Form footer" direction="column" gap={1}>
                        <PrimaryButton component="button" type="submit" fullWidth disabled={this.isButtonDisabled}>
                            <FormattedMessage id={submitText ?? "form.submit"} />
                        </PrimaryButton>
                        { children }
                    </Stack>
                </Stack>
            </form>
        );
    }
}