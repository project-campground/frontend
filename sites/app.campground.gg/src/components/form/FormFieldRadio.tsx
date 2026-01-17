import type { ReactNode } from "react";
import AbstractFormField from "./AbstractFormField";
import type { FormFieldDecoratorProps, FormFieldProps } from "./forms";
import { List, ListItem, listItemClasses, ListItemDecorator, listItemDecoratorClasses, Radio, RadioGroup, styled, } from "@mui/joy";

export interface FormFieldRadioItem {
    value: string | boolean | number;
    text: string;
    startDecorator?: React.ReactNode;
    endDecorator?: React.ReactNode;
}
type RadioType = "default" | "button" | "grid";
export interface FormFieldRadioProps extends FormFieldProps<"radio", string | boolean | number>, FormFieldDecoratorProps {
    options: FormFieldRadioItem[];
    design?: RadioType;
}

type State = {
    value: string | number | boolean | null;
};

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
    gap: 8,
    [`& .${listItemDecoratorClasses.root}`]: {
        flexDirection: "column",
        alignItems: "center",
        zIndex: 2,
    },
    [`& .${listItemClasses.root}:has(.Mui-checked) > .${listItemDecoratorClasses.root}`]: {
        color: theme.vars.palette.primary[200]
    }
}));

export default class FormFieldRadio extends AbstractFormField<"radio", number | boolean | string, FormFieldRadioProps, State> {
    constructor(props: FormFieldRadioProps) {
        super(props);
        this.state = { value: props.defaultValue ?? null };
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
                {option.startDecorator && <ListItemDecorator>
                    {option.startDecorator}
                </ListItemDecorator>}
                <Radio
                    overlay
                    variant="soft"
                    disabled={this.props.disabled}
                    value={option.value}
                    label={option.text}
                    sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                />
                {option.endDecorator && <ListItemDecorator>
                    {option.endDecorator}
                </ListItemDecorator>}
            </ListItem>
        );
    }

    private RenderOptionGridButtoned(option: FormFieldRadioItem) {
        return (
            <ListItem variant="soft" sx={{ boxShadow: "sm", flexDirection: "column", alignItems: "center" }}>
                {option.startDecorator && <ListItemDecorator>
                    {option.startDecorator}
                </ListItemDecorator>}
                <Radio
                    overlay
                    variant="soft"
                    disabled={this.props.disabled}
                    value={option.value}
                    label={option.text}
                    sx={{ flexGrow: 1, flexDirection: "row" }}
                    disableIcon
                />
                {option.endDecorator && <ListItemDecorator>
                    {option.endDecorator}
                </ListItemDecorator>}
            </ListItem>
        );
    }

    public override render(): ReactNode {
        const { options, defaultValue } = this.props;
        const { state: { value } } = this;

        return (
            <RadioGroup value={value} defaultValue={defaultValue} onChange={(e) => this.onInputChange(e.target.value)}>
                {this.props.design === "button"
                ? <RadioList>
                    {options.map((x, i) =>
                        <this.RadioOptionButtoned
                            key={`${i}-${x.value}`}
                            {...x}
                        />
                    )}
                </RadioList>
                : this.props.design === "grid"
                ? <RadioGrid>
                    {options.map((x, i) =>
                        <this.RenderOptionGridButtoned
                            key={`${i}-${x.value}`}
                            {...x}
                        />
                    )}
                </RadioGrid>
                : options.map((x, i) =>
                    <this.RadioOption
                        key={`${i}-${x.value}`}
                        {...x}
                    />
                )}
            </RadioGroup>
        );
    }
}