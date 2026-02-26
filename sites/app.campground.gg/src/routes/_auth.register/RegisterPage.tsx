import React, { ChangeEvent } from "react";
import { Link, Stack, Typography } from "@mui/joy";
import { IconAt } from "@tabler/icons-react";
import { FormattedMessage } from "react-intl";
import Form from "../../components/form/Form";

export type Props = {

};
type PasswordState = {
    password: string;
    confirmPassword: string;
}
export type State = PasswordState & {
    wrongConfirmPassword: boolean;
};

export default class RegisterPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { wrongConfirmPassword: false, password: "", confirmPassword: "" };
    }
    onSubmit(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, fieldValues: Record<string, any>) {
        event.preventDefault();

        console.log(fieldValues);
    }
    onPasswordInputChange(property: "password" | "confirmPassword", e: ChangeEvent<HTMLInputElement>) {
        const { password, confirmPassword } = this.state;

        const newState: Partial<State> = { password, confirmPassword, [property]: e.target.value };

        this.setState({ ...newState, wrongConfirmPassword: newState.password !== newState.confirmPassword } as State);
    }
    render() {
        return (
            <Form
                sections={[
                    {
                        id: "register",
                        fields: [
                            {
                                type: "text",
                                id: "username",
                                placeholder: "Username Here",
                                header: <FormattedMessage id="info.username" />,
                                required: true
                            },
                            {
                                type: "text",
                                id: "tagline",
                                placeholder: "Tag_Here",
                                header: <FormattedMessage id="info.tagline" />,
                                format: /^([A-Za-z0-9$_.-]+)$/,
                                startDecorator:
                                    <Stack direction="row" alignItems="center">
                                        <Typography textColor="neutral.400" lineHeight={0} height="100%">
                                            <IconAt />
                                        </Typography>
                                    </Stack>
                                ,
                                required: true
                            },
                            {
                                type: "text",
                                id: "email",
                                inputType: "email",
                                placeholder: "example@example.com",
                                header: <FormattedMessage id="info.email" />,
                                format: /^([A-Za-z0-9._%+-]+)@((?:[A-Za-z0-9-]+[.])+[A-Za-z]{2,})$/,
                                required: true
                            },
                            {
                                type: "text",
                                id: "password",
                                inputType: "password",
                                placeholder: "Password here",
                                header: <FormattedMessage id="info.password" />,
                                required: true
                            },
                            {
                                type: "text",
                                id: "confirmPassword",
                                inputType: "password",
                                placeholder: "Password here",
                                header: <FormattedMessage id="info.confirmPassword" />,
                                required: true
                            }
                        ]
                    }
                ]}
                onSubmit={this.onSubmit}
                submitText="form.register"
            >
                <Link color="neutral" textColor="neutral.300" level="body-md" href="/login">
                    <FormattedMessage id="form.hasAccount" />
                </Link>
            </Form>
        );
    }
}