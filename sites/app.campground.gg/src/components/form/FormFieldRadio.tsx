import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { List, ListItem, Radio, RadioGroup, Stack, styled, Typography, } from "@mui/joy";

export interface FormFieldRadioItem {
    value: string | boolean | number;
    text: ReactNode[] | ReactNode;
    startDecorator?: React.ReactNode;
    endDecorator?: React.ReactNode;
}
type RadioType = "default" | "button" | "grid";
export interface FormFieldRadioProps extends FormFieldProps<"radio", string | boolean | number | null>, FormFieldDecoratorProps {
    options: FormFieldRadioItem[];
    design?: RadioType;
}

const RadioList = styled(List)(() => ({
    "--List-gap": "8px",
    "--ListItem-paddingY": "16px",
    "--ListItem-radius": "8px",
}));

const RadioGrid = styled(List)(({ theme }) => ({
    "--List-gap": 0,
    "--ListItem-paddingY": "16px",
    "--ListItem-radius": "8px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: theme.spacing(1),
}));
const RadioLabel = styled(Stack, {
    name: "RadioLabel",
    slot: "root",
})(({ theme }) => ({
    gap: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
}))

export default class FormFieldRadio extends AbstractFormField<"radio", number | boolean | string | null, FormFieldRadioProps> {
    constructor(props: FormFieldRadioProps) {
        super(props, null);
    }

    public override get isValid(): boolean {
        return this.isNotEmptyOrRequired;
    }

    private get isNotEmptyOrRequired(): boolean {
        return !this.props.required || this.state.value !== null;
    }

    private onInputChange(value: string | number | boolean | null) {
        this.setState({ value }, () => value && this.onChange(value));
    }

    private RadioOption(option: FormFieldRadioItem) {
        return (
            <Radio
                variant="soft"
                disabled={this.props.disabled}
                value={option.value}
                label={option.text}
            />
        );
    }

    private RadioOptionButtoned(option: FormFieldRadioItem) {
        return (
            <ListItem variant="soft" sx={{ boxShadow: "sm" }}>
                <Radio
                    overlay
                    variant="soft"
                    disabled={this.props.disabled}
                    value={option.value}
                    label={
                        <RadioLabel>
                            {option.startDecorator}
                            <Typography>
                                {option.text}
                            </Typography>
                            {option.endDecorator}
                        </RadioLabel>
                    }
                    sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                />
            </ListItem>
        );
    }

    private RadioOptionGridButtoned(option: FormFieldRadioItem) {
        return (
            <ListItem variant="soft" sx={{ boxShadow: "sm", flexDirection: "column", alignItems: "center" }}>
                <Radio
                    overlay
                    variant="soft"
                    disabled={this.props.disabled}
                    value={option.value}
                    label={
                        <RadioLabel>
                            {option.startDecorator}
                            <Typography>
                                {option.text}
                            </Typography>
                            {option.endDecorator}
                        </RadioLabel>
                    }
                    sx={{ flexGrow: 1, flexDirection: "row" }}
                    disableIcon
                />
            </ListItem>
        );
    }

    public override render(): ReactNode {
        const { options, defaultValue } = this.props;
        const { state: { value } } = this;
        const RadioOptionButtoned = this.RadioOptionButtoned.bind(this);
        const RadioOptionGridButtoned = this.RadioOptionGridButtoned.bind(this);
        const RadioOption = this.RadioOption.bind(this);

        return (
            <RadioGroup value={value} defaultValue={defaultValue} onChange={(e) => this.onInputChange(e.target.value)}>
                {this.props.design === "button"
                ? <RadioList>
                    {options.map((x, i) =>
                        <RadioOptionButtoned
                            key={`${i}-${x.value}`}
                            {...x}
                        />
                    )}
                </RadioList>
                : this.props.design === "grid"
                ? <RadioGrid>
                    {options.map((x, i) =>
                        <RadioOptionGridButtoned
                            key={`${i}-${x.value}`}
                            {...x}
                        />
                    )}
                </RadioGrid>
                : options.map((x, i) =>
                    <RadioOption
                        key={`${i}-${x.value}`}
                        {...x}
                    />
                )}
            </RadioGroup>
        );
    }
}