import React, { ReactNode, type MouseEvent } from "react";
import { Stack, styled, Typography } from "@mui/joy";
import clsx from "clsx";

import { FormContext, type ResetValueHandler } from "./context";

export type FormProps = {
    gap?: number;

    hideOverflow?: boolean;
    inlineContent?: boolean;
    header?: ReactNode | ReactNode[];
    description?: ReactNode | ReactNode[];
    children?: ReactNode[] | ReactNode;

    onChange?: (
        isValid: boolean,
        fieldValues: Record<string, any>,
    ) => Promise<unknown> | unknown;

    onSubmit?: (
        ev: MouseEvent | undefined,
        fieldValues: Record<string, any>,
    ) => Promise<unknown> | unknown;
};
type FormState = {
    fieldValues: Record<string, any>;
    fieldRequirementFilled: Record<string, boolean>;
};

export const FormRoot = styled("form", {
    name: "Form",
    slot: "root",
})(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    height: "100%",
    "&.Form-with-sidebar": {
        flexDirection: "row",
        flexWrap: "wrap",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
}));
export const FormContent = styled(Stack, {
    name: "Form",
    slot: "content",
})(({ theme }) => ({
    height: "100%",
    gap: theme.spacing(3),
    flex: 1,
}));
export const FormBody = styled(Stack, {
    name: "Form",
    slot: "body",
})(({ theme }) => ({
    flexDirection: "column",
    gap: theme.spacing(5),
    flex: 1,
    "&.Form-body-overflowHidden": {
        overflow: "hidden",
    },
    "&.Form-body-inlineContent": {
        flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
    },
}));

export default class Form extends React.Component<FormProps, FormState> {
    private _resetValueHandlers: Record<string | number, ResetValueHandler> = {};

    constructor(props: FormProps) {
        super(props);

        this.state = { fieldValues: {}, fieldRequirementFilled: {} };
    }

    public get values() {
        return this.state.fieldValues;
    }
    public get validFields() {
        return this.state.fieldRequirementFilled;
    }

    public reset = () => {
        for (const resetValueHandler of Object.values(this._resetValueHandlers))
            resetValueHandler();
    }

    public onSubmit = (ev?: MouseEvent) => {
        ev?.preventDefault();
        return this.props.onSubmit?.(ev, this.state.fieldValues);
    };

    public onAddResetHandler = (id: string | number, resetHandler: ResetValueHandler) => {
        return this._resetValueHandlers[id] = resetHandler;
    };

    public onFieldChange: any = (
        id: string | number,
        isValid: boolean,
        value: any,
    ): any => {
        console.log({ id, isValid, value: Array.isArray(value) ? [...value] : value });
        this.setState(
            ({ fieldValues, fieldRequirementFilled }) => ({
                fieldValues: {
                    ...fieldValues,
                    [id]: value,
                },
                fieldRequirementFilled: {
                    ...fieldRequirementFilled,
                    [id]: isValid,
                },
            }),
            () => 
                this.props.onChange?.(
                    this.allFieldsValid,
                    this.state.fieldValues,
                ),
        );
    }

    public get allFieldsValid(): boolean {
        return Object.values(this.state.fieldRequirementFilled).every((x) => x);
    }

    public render(): ReactNode[] | ReactNode {
        const { header, children, gap, description, inlineContent, hideOverflow } =
            this.props;

        return (
            <FormRoot className="Form-root">
                <FormContent className="Form-content">
                    <Stack gap={2} className="Form-head">
                        {header && (
                            <Typography level="title-lg" fontWeight={700}>
                                {header}
                            </Typography>
                        )}
                        {description && (
                            <Typography level="body-md">
                                {description}
                            </Typography>
                        )}
                    </Stack>
                    {/* Sections */}
                    <FormContext.Provider
                        value={{
                            onResetValues: this.onAddResetHandler,
                            onSubmit: this.onSubmit,
                            allValid: this.allFieldsValid,
                            values: this.values,
                            validFields: this.validFields,
                            onFieldChange: this.onFieldChange,
                        }}
                    >
                        <FormBody
                            className={clsx(
                                "Form-body",
                                inlineContent && "Form-body-inlineContent",
                                hideOverflow && "Form-body-overflowHidden"
                            )}
                            gap={gap}
                        >
                            {children}
                        </FormBody>
                    </FormContext.Provider>
                </FormContent>
            </FormRoot>
        );
    }
}
