import type { MouseEvent, PropsWithChildren, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import { type FormFieldProps } from "./forms";
import { FormContext, type ResetValueHandler } from "./context";
import { FormBody } from "./Form";
import clsx from "clsx";
import type { TristateValue } from "../Tristate";
import type { PermissionsStateDictionary } from "types/campground/permissions";

export type FormFieldTristateFlagsValue = Record<keyof PermissionsStateDictionary, number>;

export interface FormFieldTristateFlagsProps
    extends PropsWithChildren,
        FormFieldProps<FormFieldTristateFlagsValue> {
    gap?: number;
    inline?: boolean;
}

type State = {
    value: FormFieldTristateFlagsValue;
    valid: Record<number, boolean>;
};

const tristateValueToFlags: Record<TristateValue, keyof PermissionsStateDictionary | null> = {
    off: "denied",
    pass: null,
    on: "allowed"
};
const oppositeTristateToFlag: Record<keyof PermissionsStateDictionary, keyof PermissionsStateDictionary> = {
    allowed: "denied",
    denied: "allowed"
};

export default class FormFieldTristateFlags extends AbstractFormField<
    FormFieldTristateFlagsValue,
    FormFieldTristateFlagsProps,
    State
> {
    private _resetValueHandlers: Record<string | number, ResetValueHandler> =
        {};

    constructor(props: FormFieldTristateFlagsProps, context: FormContext) {
        super(props, context, { allowed: 0, denied: 0 }, { valid: {} });
    }

    public override get isValid(): boolean {
        return this.allFieldsValid;
    }

    public get allFieldsValid(): boolean {
        return Object.values(this.state.valid).every((x) => x);
    }

    private onSubFieldChange = (id: number, isValid: boolean, value: TristateValue) => {
        const flagsName = tristateValueToFlags[value];
        const oppositeFlagsName = flagsName && oppositeTristateToFlag[flagsName];

        this.setState(
            {
                value: flagsName
                ? {
                    [oppositeFlagsName!]: this.state.value[oppositeFlagsName!] & (this.state.value[oppositeFlagsName!] ^ id), 
                    [flagsName]: this.state.value[flagsName] | id,
                } as Record<keyof PermissionsStateDictionary, number>
                : {
                    allowed: this.state.value["allowed"] & (this.state.value["allowed"] ^ id),
                    denied: this.state.value["denied"] & (this.state.value["denied"] ^ id),
                }, 
                valid: { ...this.state.valid, [id]: isValid },
            },
            () => this.onValueChange(),
        );
    }

    private onSubmit = (ev: MouseEvent) => this.context.onSubmit(ev);

    public override resetValue() {
        for (const resetValueHandler of Object.values(this._resetValueHandlers))
            resetValueHandler();
        super.resetValue();
    }

    public onAddResetHandler = (
        id: string | number,
        resetHandler: ResetValueHandler,
    ) => {
        return (this._resetValueHandlers[id] = resetHandler);
    };

    public override render(): ReactNode {
        const { children, inline, gap } = this.props;

        return (
            <FormContext.Provider
                value={{
                    onResetValues: this.onAddResetHandler,
                    allValid: this.isValid,
                    values: { 0: this.state.value },
                    validFields: this.state.valid,
                    onSubmit: this.onSubmit,
                    onFieldChange: this.onSubFieldChange,
                }}
            >
                <FormBody
                    className={clsx(
                        "Form-body",
                        inline && "Form-body-inlineContent",
                    )}
                    gap={gap}
                >
                    {children}
                </FormBody>
            </FormContext.Provider>
        );
    }
}
