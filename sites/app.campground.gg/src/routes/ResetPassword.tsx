import React, { ChangeEvent } from "react";
// import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link } from "@mui/joy";
import SigninWrapper from "../components/signin/SigninWrapper";
import { FormattedMessage } from "react-intl";
import Form from "../components/form/Form";

export type Props = {

};
type PasswordState = {
    password: string;
    confirmPassword: string;
}
export type State = PasswordState & {
    wrongConfirmPassword: boolean;
};

export default class ResetPassword extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { wrongConfirmPassword: false, password: "", confirmPassword: "" };
    }
    onSubmit(event: React.FormEvent<HTMLFormElement>, fieldValues: Record<string, any>) {
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
            <SigninWrapper header="form.resetPasswordTitle">
                <Form
                    sections={[
                        {
                            fields: [
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
                    submitText="form.resetPasswordTitle"
                >
                    <Link color="neutral" textColor="neutral.300" level="body-md" href="/register">
                        <FormattedMessage id="form.noAccount" />
                    </Link>
                </Form>
            </SigninWrapper>
        );
    }
}