import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import { type FormFieldDecoratorProps, type FormFieldProps } from "./forms";
import { FormControl, Card, Stack, Button, IconButton, styled } from "@mui/joy";
import { IconGripVertical, IconPlus, IconX } from "@tabler/icons-react";
import { Group } from "campground-ui";
import { DragDropProvider, useDraggable, useDroppable } from "~/draggable";
import { moveIndexes } from "~/util/array";
import { FormContext, type ResetValueHandler } from "./context";

type Item = {
    valid: boolean;
    value: any;
    id: number;
};

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
    items: Item[];
    value: any[];
};

export default class FormFieldArray<
    TValue,
    TProps extends FormFieldProps<TValue>,
> extends AbstractFormField<
    TValue[],
    FormFieldArrayProps<TValue, TProps>,
    State
> {
    private _resetValueHandlers: Record<string | number, ResetValueHandler> =
        {};
    constructor(
        props: FormFieldArrayProps<TValue, TProps>,
        context: FormContext,
    ) {
        super(props, context, [], {
            items: FormFieldArray.createDefaultItems<TValue, TProps>(
                props.defaultValue,
                props.fieldProps,
            ),
        });
    }

    public get subFieldProps() {
        return this.props.fieldProps;
    }

    private static getItemId() {
        return Math.floor(Math.random() * 90000) + 10000;
    }
    private static createDefaultItems<
        TValue,
        TProps extends FormFieldProps<TValue>,
    >(defaultValue: any[] | undefined | null, fieldProps: Omit<TProps, "id">) {
        return (
            defaultValue?.map((value) =>
                FormFieldArray.createItem(
                    value,
                    FormFieldArray.isDefaultValid<TValue, TProps>(fieldProps),
                ),
            ) ?? []
        );
    }

    private static createItem(value: any, valid: boolean) {
        return {
            id: this.getItemId(),
            value,
            valid,
        } satisfies Item;
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
            this.state.items
                .slice(0, this.state.value.length)
                .every((x) => x.valid) &&
            ((this.props.max && this.state.value.length <= this.props.max) ||
                !this.props.max) &&
            ((this.props.min && this.state.value.length >= this.props.min) ||
                !this.props.min)
        );
    }

    private onSubFieldChange = (id: number, isValid: boolean, value: any) => {
        const item = this.state.items.find((x) => x.id === id);

        if (!item || (item.value === value && item.value === isValid)) return;

        Object.assign(item, { valid: isValid, value });

        this.setState(
            {
                value: this.state.items.map((x) => x.value),
            },
            () => this.onValueChange(),
        );
    };

    private addField() {
        this.setState({
            value: [...this.state.value, this.subFieldProps.defaultValue],
            items: [
                ...this.state.items,
                FormFieldArray.createItem(
                    this.subFieldProps.defaultValue,
                    FormFieldArray.isDefaultValid<TValue, TProps>(
                        this.props.fieldProps,
                    ),
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
                items: moveIndexes(
                    this.state.items,
                    draggedIndex,
                    droppedAtIndex,
                ),
            },
            () => this.onValueChange(),
        );
    }

    private onRemoveField(index: number) {
        delete this._resetValueHandlers[index];

        this.setState(
            {
                value: [
                    ...this.state.value.slice(0, index),
                    ...this.state.value.slice(index + 1),
                ],
                items: [
                    ...this.state.items.slice(0, index),
                    ...this.state.items.slice(index + 1),
                ],
            },
            () => this.onValueChange(),
        );
    }

    private onSubmit = () => {};

    public override resetValue() {
        for (const { id } of this.state.items) this.onRemoveField(id);
        this.setState({
            value: this.props.defaultValue ?? [],
            items: FormFieldArray.createDefaultItems<TValue, TProps>(
                this.props.defaultValue,
                this.props.fieldProps,
            ),
        });
    }

    public onAddResetHandler = (
        id: string | number,
        resetHandler: ResetValueHandler,
    ) => {
        return (this._resetValueHandlers[id] = resetHandler);
    };

    public override render(): ReactNode {
        const { FieldComponent, fieldProps } = this.props;
        const {
            state: { items, value },
        } = this;

        return (
            <Stack gap={2} width="max-content">
                <FormContext.Provider
                    value={{
                        onResetValues: this.onAddResetHandler,
                        allValid: this.isValid,
                        values: this.state.value,
                        validFields: Object.fromEntries(
                            items.map(({ id, valid }) => [id, valid]),
                        ) as Record<number, boolean>,
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
                            {items.map((x, i) => (
                                <FormFieldArrayItem
                                    key={x.id}
                                    id={x.id}
                                    FieldComponent={FieldComponent}
                                    fieldProps={fieldProps}
                                    defaultValue={x.value}
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
    id,
    FieldComponent,
    fieldProps: { defaultValue: _, ...fieldProps },
    defaultValue,
}: Pick<
    FormFieldArrayProps<TValue, TProps>,
    "FieldComponent" | "fieldProps"
> & {
    onRemove: () => unknown;
    id: number;
    defaultValue: any;
}) {
    const { attributes: draggableAttributes } = useDraggable({
        id: id.toString(),
    });
    const { attributes: droppableAttributes, isOver } = useDroppable({
        id: id.toString(),
    });

    const props = {
        id,
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
