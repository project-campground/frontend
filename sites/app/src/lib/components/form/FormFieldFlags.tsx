import type { MouseEvent, PropsWithChildren, ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import { type FormFieldProps } from "./forms";
import { FormContext, type ResetValueHandler } from "./context";
import { FormBody } from "./Form";
import clsx from "clsx";

export interface FormFieldObjectProps
    extends PropsWithChildren,
        FormFieldProps<number> {
    gap?: number;
    inline?: boolean;
}

type State = {
    value: number;
    valid: Record<number, boolean>;
};

export default class FormFieldFlags extends AbstractFormField<
    number,
    FormFieldObjectProps,
    State
> {
    private _resetValueHandlers: Record<string | number, ResetValueHandler> =
        {};

    constructor(props: FormFieldObjectProps, context: FormContext) {
        super(props, context, 0, { valid: {} });
    }

    public override get isValid(): boolean {
        return this.allFieldsValid;
    }

    public get allFieldsValid(): boolean {
        return Object.values(this.state.valid).every((x) => x);
    }

    private onSubFieldChange = (id: number, isValid: boolean, value: boolean) =>
        this.setState(
            {
                value: value
                    // ADD
                    ? this.state.value | id
                    // SUBTRACT, if it even exists
                    : this.state.value & (this.state.value ^ id),
                valid: { ...this.state.valid, [id]: isValid },
            },
            () => this.onValueChange(),
        );

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
