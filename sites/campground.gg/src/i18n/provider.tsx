import {IntlProvider as ReactIntlProvider} from 'react-intl';
import React from 'react';
import { loadLocale } from '.';
import { flattenMessages } from './util';
import { SessionContext } from '../session';

export function IntlProvider({ children }: React.PropsWithChildren) {
    const session = React.useContext(SessionContext);
    const [messages, setMessages] = React.useState<Record<string, string>>();

    console.log(session?.getLocale());
    React.useEffect(() => {
        loadLocale(session?.getLocale() || "en-US").then((messages) => {
            setMessages(flattenMessages(messages));
        });
    }, [session]);

    return (
        <ReactIntlProvider defaultLocale='en-US' locale={session?.getLocale() || "en-US"} messages={messages}>
            {children}
        </ReactIntlProvider>
    );

}