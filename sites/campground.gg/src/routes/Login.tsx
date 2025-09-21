import React, { FormEvent } from "react";
import SigninWrapper from "../components/signin/SigninWrapper";
import { FormattedMessage } from "react-intl";
import Form from "../components/form/Form";
import { Link } from "@mui/joy";

export type Props = {

};

export default class Login extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    onSubmit(event: FormEvent<HTMLFormElement>, fieldValues: Record<string, any>) {
        event.preventDefault();

        const details = {
            email: fieldValues.email,
            password: fieldValues.password,
        }

        console.log(details);
    }
    render() {
        return (
            <SigninWrapper header="form.login">
                <Form
                    sections={[
                        {
                            fields: [
                                {
                                    type: "text",
                                    id: "email",
                                    // inputType: "email",
                                    placeholder: "example@example.com",
                                    header: <FormattedMessage id="info.taglineOrEmail" />,
                                    format: /^(?:([A-Za-z0-9._%+-]+)@((?:[A-Za-z0-9-]+[.])+[A-Za-z]{2,})|[A-Za-z0-9$_.-]+)$/,
                                    required: true
                                },
                                {
                                    type: "text",
                                    id: "password",
                                    inputType: "password",
                                    placeholder: "Password here",
                                    header: <FormattedMessage id="info.password" />,
                                    footer: <Link color="neutral" textColor="neutral.300" level="body-md" href="/reset-password">
                                                <FormattedMessage id="form.resetPassword" />
                                            </Link>,
                                    required: true
                                }
                            ]
                        }
                    ]}
                    onSubmit={this.onSubmit}
                    submitText="form.login"
                >
                    <Link color="neutral" textColor="neutral.300" level="body-md" href="/register">
                        <FormattedMessage id="form.noAccount" />
                    </Link>
                </Form>
                {/* <Stack gap={2}>
                    <Stack gap={1}>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" />
                            <Link sx={{ mt: 1 }} color="neutral" textColor="neutral.400" level="body-sm" href="/change-password">Forgot your password?</Link>
                        </FormControl>
                    </Stack>
                    <Stack direction="column" gap={1}>
                        <PrimaryButton type="submit" fullWidth>
                            <FormattedMessage id="global.login" />
                        </PrimaryButton>
                        <Link color="neutral" textColor="neutral.300" level="body-md" href="/register">Don't have an account? Sign up</Link>
                    </Stack>
                </Stack> */}
            </SigninWrapper>
        );
    }
}