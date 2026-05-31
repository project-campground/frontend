import { Button, type ButtonProps } from "@mui/joy";
import { FormattedMessageGlobal } from "~/i18n";
import { useForm } from "./context";

export default function FormSubmit({ children, variant, disabled, ...props }: Omit<ButtonProps, "onClick">) {
    const form = useForm();

    return (
        <Button disabled={disabled || !form.allValid} variant={variant ?? "glow"} {...props} onClick={form.onSubmit}>
            {children ?? <FormattedMessageGlobal id="form.submit" />}
        </Button>
    );
}