import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import { type FormFieldDecoratorProps, type FormFieldProps } from "./forms";
import { FormControl, Card, Stack, Button, IconButton, styled } from "@mui/joy";
import { IconGripVertical, IconPlus, IconX } from "@tabler/icons-react";
import { Group } from "components";
import { DragDropProvider, useDraggable, useDroppable } from "~/draggable";
import { moveIndexes } from "~/util/array";
import { FormContext, type ResetValueHandler } from "./context";

export interface FormFieldArrayProps<
    TValue,
    TProps extends FormFieldProps<TValue>,
> extends FormFieldProps<any[]>,
        FormFieldDecoratorProps {
    FieldComponent: {
        new (
            props: TProps,
            context: FormContext,
        ): AbstractFormField<TValue, TProps>;
    };
    fieldProps: Omit<TProps, "id">;
    max?: number;
    min?: number;
}

type State = {
    value: any[];
    valid: boolean[];
};

export default class FormFieldArray<
    TValue,
    TProps extends FormFieldProps<TValue>,
> extends AbstractFormField<
    TValue[],
    FormFieldArrayProps<TValue, TProps>,
    State
> {
    private _resetValueHandlers: Record<string | number, ResetValueHandler> = {};
    constructor(
        props: FormFieldArrayProps<TValue, TProps>,
        context: FormContext,
    ) {
        super(props, context, [], {
            valid: Array(props.defaultValue?.length ?? 0).fill(
                FormFieldArray.isDefaultValid<TValue, TProps>(props.fieldProps),
            ),
        });
    }

    public get subFieldProps() {
        return this.props.fieldProps;
    }

    private static isDefaultValid<
        TValue,
        TProps extends FormFieldProps<TValue>,
    >(fieldProps: Omit<TProps, "id">) {
        return (
            !fieldProps.required ||
            (typeof fieldProps.defaultValue !== "undefined" &&
                fieldProps.defaultValue !== null)
        );
    }

    public override get isValid(): boolean {
        return (
            this.state.valid
                .slice(0, this.state.value.length)
                .every((x) => x) &&
            ((this.props.max && this.state.value.length <= this.props.max) ||
                !this.props.max) &&
            ((this.props.min && this.state.value.length >= this.props.min) ||
                !this.props.min)
        );
    }

    private onSubFieldChange = (index: number, isValid: boolean, value: any) =>
        this.state.value[index] === value && this.state.valid[index] === isValid
        ? null
        : this.setState(
            {
                value: [
                    ...this.state.value.slice(0, index),
                    value,
                    ...this.state.value.slice(index + 1),
                ],
                valid: [
                    ...this.state.valid.slice(0, index),
                    isValid,
                    ...this.state.valid.slice(index + 1),
                ],
            },
            () => this.onValueChange(),
        );

    private addField() {
        this.setState({
            value: [...this.state.value, this.subFieldProps.defaultValue],
            valid: [
                ...this.state.valid,
                FormFieldArray.isDefaultValid<TValue, TProps>(
                    this.props.fieldProps,
                ),
            ],
        });
    }

    private onValueMove(draggedIndex: number, droppedAtIndex: number) {
        // console.log("Value move");
        if (draggedIndex === droppedAtIndex) return;

        this.setState(
            {
                value: moveIndexes(
                    this.state.value,
                    draggedIndex,
                    droppedAtIndex,
                ),
                valid: moveIndexes(
                    this.state.valid,
                    draggedIndex,
                    droppedAtIndex,
                ),
            },
            () => this.onValueChange(),
        );
    }

    private onRemoveField(index: number) {
        this.setState(
            {
                value: [
                    ...this.state.value.slice(0, index),
                    ...this.state.value.slice(index + 1),
                ],
                valid: [
                    ...this.state.valid.slice(0, index),
                    ...this.state.valid.slice(index + 1),
                ],
            },
            () => this.onValueChange(),
        );
    }

    private onSubmit = () => {};

    public override resetValue() {
        for (const resetValueHandler of Object.values(this._resetValueHandlers))
            resetValueHandler();
        super.resetValue();
    };

    public onAddResetHandler = (id: string | number, resetHandler: ResetValueHandler) => {
        return this._resetValueHandlers[id] = resetHandler;
    };

    public override render(): ReactNode {
        const { FieldComponent, fieldProps } = this.props;
        const {
            state: { value },
        } = this;

        return (
            <Stack gap={2} width="max-content">
                <FormContext.Provider
                    value={{
                        onResetValues: this.onAddResetHandler,
                        allValid: this.isValid,
                        values: this.state.value,
                        validFields: this.state.valid as Record<
                            number,
                            boolean
                        >,
                        onSubmit: this.onSubmit,
                        onFieldChange: this.onSubFieldChange,
                    }}
                >
                    <Stack gap={1}>
                        <DragDropProvider
                            onDropped={(draggedId, droppedId) =>
                                this.onValueMove(
                                    Number(draggedId),
                                    Number(droppedId),
                                )
                            }
                        >
                            {value.map((x, i) => (
                                <FormFieldArrayItem
                                    key={`${i}~${JSON.stringify(x)}`}
                                    FieldComponent={FieldComponent}
                                    fieldProps={fieldProps}
                                    defaultValue={x}
                                    index={i}
                                    onRemove={this.onRemoveField.bind(this, i)}
                                />
                            ))}
                        </DragDropProvider>
                    </Stack>
                </FormContext.Provider>
                <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<IconPlus />}
                    onClick={this.addField.bind(this)}
                    disabled={
                        !!this.props.max && value.length >= this.props.max
                    }
                >
                    Add
                </Button>
            </Stack>
        );
    }
}

const FormFieldArrayItemCard = styled(Card)(({ theme }) => ({
    position: "relative",
    width: "max-content",
    "::after": {
        content: "''",
        position: "absolute",
        top: -4,
        left: 0,
        right: 0,
        height: 3,
        borderRadius: theme.vars.radius.md,
        backgroundColor: "transparent",
        transition: "background 0.3s",
    },
    "&.over::after": {
        backgroundColor: theme.vars.palette.primary[500],
    },
}));

function FormFieldArrayItem<TValue, TProps extends FormFieldProps<TValue>>({
    onRemove,
    index,
    FieldComponent,
    fieldProps: { defaultValue: _, ...fieldProps },
    defaultValue,
}: Pick<
    FormFieldArrayProps<TValue, TProps>,
    "FieldComponent" | "fieldProps"
> & {
    onRemove: () => unknown;
    index: number;
    defaultValue: any;
}) {
    const { attributes: draggableAttributes } = useDraggable({
        id: index.toString(),
    });
    const { attributes: droppableAttributes, isOver } = useDroppable({
        id: index.toString(),
    });

    const props = {
        id: index,
        defaultValue,
        ...fieldProps,
    } as Readonly<TProps>;

    return (
        <FormFieldArrayItemCard
            className={isOver ? "over" : ""}
            variant="outlined"
            size="sm"
            {...draggableAttributes}
            {...droppableAttributes}
        >
            <Group gap={1} alignItems="center">
                <IconGripVertical />
                <FormControl sx={{ flex: 1 }}>
                    <FieldComponent {...props} />
                </FormControl>
                <IconButton variant="plain" size="sm" onClick={onRemove}>
                    <IconX size={16} />
                </IconButton>
            </Group>
        </FormFieldArrayItemCard>
    );
}
