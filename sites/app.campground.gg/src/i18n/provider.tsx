import {IntlProvider as ReactIntlProvider} from 'react-intl';
import React from 'react';
import { loadLocale } from '.';
import { flattenMessages } from './util';
import { useSession } from '../context/session';

export function IntlProvider({ children }: React.PropsWithChildren) {
    const session = useSession();
    const [messages, setMessages] = React.useState<Record<string, string>>();

    console.log("Locale", session?.settings?.locale);
    React.useEffect(() => {
        loadLocale(session?.settings?.locale || "en-US").then((messages) => {
            setMessages(flattenMessages(messages));
        });
    }, [session]);

    return (
        <ReactIntlProvider defaultLocale='en-US' locale={session?.settings?.locale || "en-US"} messages={messages}>
            {children}
        </ReactIntlProvider>
    );

}