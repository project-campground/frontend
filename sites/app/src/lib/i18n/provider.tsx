import {IntlProvider as ReactIntlProvider} from 'react-intl';
import React from 'react';
import { loadLocale } from '.';
import { flattenMessages } from './util';
import { useSession } from '../context/session';

export function IntlProvider({ children }: React.PropsWithChildren) {
    const session = useSession();
    const [messages, setMessages] = React.useState<Record<string, string>>();

    console.log("Locale", session.preferences.locale);
    React.useEffect(() => {
        console.log("Loading locale");
        loadLocale(session.preferences.locale).then((messages) => {
            setMessages(flattenMessages(messages));
        });
    }, [session.preferences.locale]);

    return (
        <ReactIntlProvider defaultLocale='en-US' locale={session.preferences.locale} messages={messages}>
            {children}
        </ReactIntlProvider>
    );
}