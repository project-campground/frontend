import { FormEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import Form from "../../components/form/Form";
import { Alert, Link } from "@mui/joy";
import { useSession } from "~/session";
import { redirect } from "react-router";
import { IconExclamationCircleFilled } from "@tabler/icons-react";

export default function LoginPage() {
    const session = useSession();
    const [error, setError] = useState<Error | null>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>, fieldValues: Record<string, any>) => {
        event.preventDefault();

        // TODO: Stronger check on the identifier
        const details = {
            identifier: fieldValues.identifier,
            password: fieldValues.password,
        };

        console.log(details);

        return await session.login(details)
            .then(() => {
                console.log("Logged in");
                throw redirect("/");
            })
            .catch((err) =>
                setError(err)
            );
    };
    console.log("Session is", session);

    return (
        <Form
            sections={[
                {
                    fields: [
                        {
                            type: "text",
                            id: "identifier",
                            // inputType: "email",
                            placeholder: "example@example.com",
                            header: <FormattedMessage id="info.handleOrEmail" />,
                            format: /^(?:([A-Za-z0-9._%+-]+)@)?((?:[A-Za-z0-9-]+[.])+[A-Za-z]{2,})$/,
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
            onSubmit={onSubmit}
            submitText="form.login"
        >
            <Link color="neutral" textColor="neutral.300" level="body-md" href="/register">
                <FormattedMessage id="form.noAccount" />
            </Link>
            {error && <Alert color="danger" startDecorator={<IconExclamationCircleFilled />}>{error.message}</Alert>}
        </Form>
    );
}