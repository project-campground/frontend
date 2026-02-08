import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldProps } from "./forms";
import { Avatar, Modal, type ColorPaletteProp, type Radius, type VariantProp, } from "@mui/joy";
import ImageInputModal from "../ImageInputModal";
import { IconPencil } from "@tabler/icons-react";
import ImageEditBadge from "../ImageEditBadge";

export interface FormFieldAvatarProps extends FormFieldProps<"avatar", string | null> {
    borderRadius?: keyof Radius;
    color?: ColorPaletteProp;
    variant?: VariantProp;
    placeholder?: ReactNode | ReactNode[];
    size?: "sm" | "md" | "lg";
}

type State = {
    value: string | null;
    open: boolean;
};

export default class FormFieldAvatar extends AbstractFormField<"avatar", string | null, FormFieldAvatarProps, State> {
    constructor(props: FormFieldAvatarProps) {
        super(props, "");
        this.state = { open: false, value: props.defaultValue ?? null };
    }

    private onInputChange(value: string | null) {
        console.log({ value });
        this.setState({ value }, () => value && this.onChange(value));
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value !== null;
    }

    onCloseModal() {
        return this.setState({ open: false });
    }

    public override render(): ReactNode {
        const { placeholder, variant, color, borderRadius, size } = this.props;
        const { open, value } = this.state;
        const onCloseModal = this.onCloseModal.bind(this);

        return (
            <>
                <ImageEditBadge onClick={() => this.setState({ open: true })} badgeContent={<IconPencil size="20" />} variant="soft" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} color="neutral">
                    <Avatar src={value ?? undefined} variant={variant} color={color} sx={{ borderRadius }} size={size}>
                        {placeholder}
                    </Avatar>
                </ImageEditBadge>
                <Modal open={open} onClose={onCloseModal}>
                    <ImageInputModal onClose={onCloseModal} currentValue={value} onSubmit={this.onInputChange.bind(this)} onRemove={() => this.onInputChange(null)} />
                </Modal>
            </>
        );
    }
}