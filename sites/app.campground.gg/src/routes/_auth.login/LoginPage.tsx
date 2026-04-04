import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Form from "../../components/form/Form";
import { Alert, Link } from "@mui/joy";
import { useSession } from "~/context/session";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { FormattedMessageGlobal } from "~/i18n";

export default function LoginPage() {
    const session = useSession();
    const [error, setError] = useState<Error | null>(null);

    const onSubmit = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, fieldValues: Record<string, any>) => {
        event.preventDefault();

        // TODO: Stronger check on the identifier
        const details = {
            identifier: fieldValues.identifier,
            password: fieldValues.password,
        };

        return await session.login(details)
            .then(() => (window.location.href = "/", undefined))
            .catch((err) =>
                setError(err)
            );
    };

    return (
        <Form
            sections={[
                {
                    id: "login",
                    fields: [
                        {
                            type: "text",
                            id: "identifier",
                            // inputType: "email",
                            placeholder: "example@example.com",
                            header: <FormattedMessageGlobal id="info.handleOrEmail" />,
                            format: /^(?:([A-Za-z0-9._%+-]+)@)?((?:[A-Za-z0-9-]+[.])+[A-Za-z]{2,})$/,
                            required: true
                        },
                        {
                            type: "text",
                            id: "password",
                            inputType: "password",
                            placeholder: "Password here",
                            header: <FormattedMessageGlobal id="info.password" />,
                            footer: <Link color="neutral" textColor="neutral.300" level="body-md" href="/reset-password">
                                        <FormattedMessage
                                            id="form.resetPassword"
                                            defaultMessage="Forgot password? Change it"
                                            description="Reset password link in login page"
                                        />
                                    </Link>,
                            required: true
                        }
                    ]
                }
            ]}
            onSubmit={onSubmit}
            submitText={
                <FormattedMessageGlobal id="form.login" />
            }
        >
            <Link color="neutral" textColor="neutral.300" level="body-md" href="/register">
                <FormattedMessage
                    id="form.noAccount"
                    defaultMessage="No account? Create one"
                    description="Link for navigating to registration page in login page"
                />
            </Link>
            {error && <Alert color="danger" startDecorator={<IconExclamationCircleFilled />}>{error.message}</Alert>}
        </Form>
    );
}