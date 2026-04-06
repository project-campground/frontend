import {IntlProvider as ReactIntlProvider} from 'react-intl';
import React from 'react';
import { loadLocale } from '.';
import { flattenMessages } from './util';

export function IntlProvider({ children }: React.PropsWithChildren) {
    const [messages, setMessages] = React.useState<Record<string, string>>();

    React.useEffect(() => {
        loadLocale("en-US").then((messages) => {
            setMessages(flattenMessages(messages));
        });
    }, []);

    return (
        <ReactIntlProvider defaultLocale='en-US' locale="en-US" messages={messages}>
            {children}
        </ReactIntlProvider>
    );

}