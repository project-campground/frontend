import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import { fieldTypeToComponent, type FieldTypeToComponent, type FieldTypeToInstance, type FormFieldDecoratorProps, type FormFieldProps, type FormFieldType, type FormFieldTypeToProps } from "./forms";
import { Card, Stack, Button, IconButton, styled } from "@mui/joy";
import { IconGripVertical, IconPlus, IconX } from "@tabler/icons-react";
import FormFieldWrapper from "./FormFieldWrapper";
import { Group } from "components";
import { DragDropProvider, useDraggable, useDroppable } from "~/draggable";
import { moveIndexes } from "~/util/array";

export interface FormFieldArrayProps extends FormFieldProps<"array", any[]>, FormFieldDecoratorProps {
    field: FormFieldTypeToProps[FormFieldType],
    max?: number;
    min?: number;
}

type State = {
    value: any[];
    valid: boolean[];
};

export default class FormFieldArray extends AbstractFormField<"array", any[], FormFieldArrayProps, State> {
    constructor(props: FormFieldArrayProps) {
        super(props, [], { valid: Array(props.defaultValue?.length ?? 0).fill(FormFieldArray.isDefaultValid(props.field)) });
    }

    private static isDefaultValid(field: FormFieldTypeToProps[FormFieldType]) {
        return !field.required || (typeof field.defaultValue !== "undefined" && field.defaultValue !== null);
    }

    public override get isValid(): boolean {
        return this.state.valid.slice(0, this.state.value.length).every((x) => x)
            && ((this.props.max && this.state.value.length <= this.props.max) || !this.props.max)
            && ((this.props.min && this.state.value.length >= this.props.min) || !this.props.min);
    }

    private onSubFieldChange(index: number, field: FieldTypeToInstance[FormFieldType], value: any) {
        return this.setState({
            value: [...this.state.value.slice(0, index), value, ...this.state.value.slice(index + 1)],
            valid: [...this.state.valid.slice(0, index), field.isValid, ...this.state.valid.slice(index + 1)],
        }, () => this.onChange(this.state.value));
    }

    private addField() {
        this.setState({
            value: [...this.state.value, this.props.field.defaultValue],
            valid: [...this.state.valid, FormFieldArray.isDefaultValid(this.props.field)],
        });
    }

    private onValueMove(draggedIndex: number, droppedAtIndex: number) {
        if (draggedIndex === droppedAtIndex)
            return;

        this.setState({
            value: moveIndexes(this.state.value, draggedIndex, droppedAtIndex),
            valid: moveIndexes(this.state.valid, draggedIndex, droppedAtIndex),
        }, () => this.onChange(this.state.value));
    }
    
    private onRemoveField(index: number) {
        this.setState({
            value: [...this.state.value.slice(0, index), ...this.state.value.slice(index + 1)],
            valid: [...this.state.valid.slice(0, index), ...this.state.valid.slice(index + 1)],
        }, () => this.onChange(this.state.value));

    }

    public override render(): ReactNode {
        const { field } = this.props;
        const { state: { value } } = this;
        const FieldComponent = fieldTypeToComponent[field.type];

        return (
            <Stack gap={2}>
                <Stack gap={1}>
                    <div style={{}}></div>
                    <DragDropProvider onDropped={(draggedId, droppedId) => this.onValueMove(Number(draggedId), Number(droppedId))}>
                        {value.map((x, i) =>
                            <FormFieldArrayItem
                                key={i}
                                FieldComponent={FieldComponent}
                                field={field}
                                defaultValue={x}
                                index={i}
                                onSubFieldChange={this.onSubFieldChange.bind(this, i)}
                                onRemove={this.onRemoveField.bind(this, i)}
                            />
                        )}
                    </DragDropProvider>
                </Stack>
                <Button variant="outlined" color="neutral" startDecorator={<IconPlus />} onClick={this.addField.bind(this)} disabled={!!this.props.max && value.length >= this.props.max}>Add</Button>
            </Stack>
        );
    }
}

const FormFieldArrayItemCard = styled(Card)(({ theme }) => ({
    position: "relative",
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
    }
}))

function FormFieldArrayItem({ onRemove, index, FieldComponent, field, defaultValue, onSubFieldChange }: { onRemove: () => unknown, index: number, onSubFieldChange: (field: FieldTypeToInstance[FormFieldType], value: any) => void, defaultValue: any, FieldComponent: FieldTypeToComponent[keyof FieldTypeToComponent], field: FormFieldArrayProps["field"] }) {
    const { attributes: draggableAttributes } = useDraggable({
        id: index.toString(),
    });
    const { attributes: droppableAttributes, isOver } = useDroppable({
        id: index.toString(),
    });

    return (
        <FormFieldArrayItemCard className={isOver ? "over" : ""} variant="outlined" size="sm" {...draggableAttributes} {...droppableAttributes}>
            <Group gap={1} alignItems="center">
                <IconGripVertical />
                <FormFieldWrapper
                    FieldComponent={FieldComponent}
                    props={{ ...field, defaultValue }}
                    onChange={onSubFieldChange}
                />
                <IconButton variant="plain" size="sm" onClick={onRemove}>
                    <IconX size={16} />
                </IconButton>
            </Group>
        </FormFieldArrayItemCard>
    );
}