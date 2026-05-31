import React, { useState } from "react";
import { Link, Stack, Typography, FormControl, FormLabel, Alert } from "@mui/joy";
import { IconAt, IconWorld } from "@tabler/icons-react";
import { FormattedMessage } from "react-intl";
import Form from "../../lib/components/form/Form";
import { FormattedMessageGlobal } from "~/i18n";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import FormFieldText from "~/components/form/FormFieldText";
import { FormContext } from "~/components/form/context";
import { useSession } from "~/context/session";
import { defaultAppApiUrl } from "api.config";
import HTTPAtprotoClient from "~/api/http/HTTPAtprotoClient";
import type { DescribedServer } from "types/atproto/server";
import { useNavigate } from "react-router";
import type { HttpResponseError } from "~/api/http/HTTPResponse";

type Props = {
    defaultDescribedServer: DescribedServer;
};

export default function RegisterPage({ defaultDescribedServer }: Props) {
    const defaultDomain = defaultAppApiUrl.split("/")[2];

    const session = useSession();
    const navigate = useNavigate();
    const [serverDescription, setServerDescription] = useState<DescribedServer>(
        defaultDescribedServer,
    );
    const [error, setError] = useState<null | HttpResponseError>(null);

    const onSubmit = async (
        event: React.MouseEvent<Element, MouseEvent> | undefined,
        {
            confirmPassword: _,
            pds,
            handle,
            ...fieldValues
        }: Record<string, any>,
    ) => {
        event?.preventDefault();

        const account = await HTTPAtprotoClient.register({
            ...(fieldValues as any),
            handle: `${handle}${serverDescription.availableUserDomains[0]}`,
        });

        if (!account.ok) return setError(account);
        const isLocalhost = pds.split(":")[0].split(".").slice(-1)[0] === "localhost";

        session.setAuth({
            authenticated: true,
            server: `http${isLocalhost ? "" : "s"}://${pds.split(":")[0]}`,
            user: {
                email: fieldValues.email,
                emailConfirmed: false,
                active: true,
                ...account.content,
            },
        });
        return navigate("/");
    };
    const checkIfDomainIsPds = async (domain: string) => {
        const isLocalhost = domain.split(":")[0].split(".").slice(-1)[0] === "localhost";

        return HTTPAtprotoClient.describeServer({
            url: `http${isLocalhost ? "" : "s"}://${domain}`,
        })
            .then((resp) => {
                if (!resp.ok) return "The domain is not a valid ATProtocol PDS";

                setServerDescription(resp.content);
                return null;
            })
            .catch((err) => err.toString().split(":")[1]);
    };

    return (
        <Form onSubmit={onSubmit}>
            <FormSection>
                <FormControl required>
                    <FormLabel>
                        <FormattedMessageGlobal id="info.pds" />
                    </FormLabel>
                    <FormFieldText
                        required
                        defaultValue={defaultDomain}
                        knownValues={[
                            {
                                startDecorator: <IconWorld />,
                                value: defaultDomain,
                                content: defaultDomain,
                            },
                        ]}
                        id="pds"
                        format={
                            /(?:localhost[:][0-9]+|(?:[A-Za-z0-9_-]+[.])*[A-Za-z0-9_-]+[.][A-Za-z]{2,})/
                        }
                        startDecorator={<IconWorld />}
                        getError={(value) => checkIfDomainIsPds(value)}
                        placeholder="example.com"
                    />
                </FormControl>
                {serverDescription.inviteCodeRequired && (
                    <FormControl required>
                        <FormLabel>
                            <FormattedMessageGlobal id="info.inviteCode" />
                        </FormLabel>
                        <FormFieldText
                            required
                            id="inviteCode"
                            placeholder="..."
                        />
                    </FormControl>
                )}
            </FormSection>
            <FormSection>
                <FormControl required>
                    <FormLabel>
                        <FormattedMessageGlobal id="info.handle" />
                    </FormLabel>
                    <FormFieldText
                        required
                        id="handle"
                        placeholder="Handle_Here"
                        endDecorator={serverDescription.availableUserDomains[0]}
                        max={
                            253 -
                            serverDescription.availableUserDomains[0].length
                        }
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
                    <FormContext.Consumer>
                        {({ values }) => (
                            <FormFieldText
                                required
                                id="confirmPassword"
                                inputType="password"
                                allowedValue={values["password"]}
                                placeholder="Password here"
                            />
                        )}
                    </FormContext.Consumer>
                </FormControl>
            </FormSection>
            <FormSection>
                <FormSubmit>
                    <FormattedMessageGlobal id="form.register" />
                </FormSubmit>
            </FormSection>
            {error && <FormSection>
                <Alert variant="soft" color="danger">
                    {error.status} {error.errorHeader}: {error.errorDescription}
                </Alert>
            </FormSection>}
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
