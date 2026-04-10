import React, { ChangeEvent } from "react";
import { Link, Stack, Typography, FormControl, FormLabel } from "@mui/joy";
import { IconAt } from "@tabler/icons-react";
import { FormattedMessage } from "react-intl";
import Form from "../../components/form/Form";
import { FormattedMessageGlobal } from "~/i18n";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import FormFieldText from "~/components/form/FormFieldText";

export type Props = {};
type PasswordState = {
    password: string;
    confirmPassword: string;
};
export type State = PasswordState & {
    wrongConfirmPassword: boolean;
};

export default class RegisterPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            wrongConfirmPassword: false,
            password: "",
            confirmPassword: "",
        };
    }
    onSubmit(
        event: React.MouseEvent<Element, MouseEvent> | undefined,
        fieldValues: Record<string, any>,
    ) {
        event?.preventDefault();

        console.log(fieldValues);
    }
    onPasswordInputChange(
        property: "password" | "confirmPassword",
        e: ChangeEvent<HTMLInputElement>,
    ) {
        const { password, confirmPassword } = this.state;

        const newState: Partial<State> = {
            password,
            confirmPassword,
            [property]: e.target.value,
        };

        this.setState({
            ...newState,
            wrongConfirmPassword:
                newState.password !== newState.confirmPassword,
        } as State);
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit.bind(this)}>
                <FormSection>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessageGlobal id="info.username" />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="username"
                            placeholder="Username Here"
                        />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessageGlobal id="info.handle" />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="handle"
                            placeholder="Handle_Here"
                            format={/^([A-Za-z0-9$_.-]+)$/}
                            startDecorator={
                                <Stack direction="row" alignItems="center">
                                    <Typography
                                        textColor="neutral.400"
                                        lineHeight={0}
                                        height="100%"
                                    >
                                        <IconAt />
                                    </Typography>
                                </Stack>
                            }
                        />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessageGlobal id="info.email" />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="email"
                            inputType="email"
                            placeholder="example@example.com"
                            format={
                                /^([A-Za-z0-9._%+-]+)@((?:[A-Za-z0-9-]+[.])+[A-Za-z]{2,})$/
                            }
                        />
                    </FormControl>
                </FormSection>
                <FormSection>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessageGlobal id="info.password" />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="password"
                            inputType="password"
                            placeholder="Password here"
                        />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessageGlobal id="info.password.confirm" />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="confirmPassword"
                            inputType="password"
                            placeholder="Password here"
                        />
                    </FormControl>
                </FormSection>
                <FormSection>
                    <FormSubmit>
                        <FormattedMessageGlobal id="form.register" />
                    </FormSubmit>
                </FormSection>
                <FormSection layout="footer">
                    <Link
                        color="neutral"
                        textColor="neutral.300"
                        level="body-md"
                        href="/login"
                    >
                        <FormattedMessage
                            id="form.hasAccount"
                            defaultMessage="Already have an account? Try logging in"
                            description="Link to login page in registration page"
                        />
                    </Link>
                </FormSection>
            </Form>
        );
    }
}
