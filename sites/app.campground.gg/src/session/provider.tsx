import React from 'react';
import { Session, SessionInfo, SessionState } from './types';
import { SessionContext } from '.';
import { useLocalStorage } from '@mantine/hooks';

export function SessionProvider({ children }: React.PropsWithChildren) {
    const [storedLocale, setStoredLocale] = useLocalStorage<string>({
        key: 'locale',
        defaultValue: 'en-US',
    });
    
    const [session, setSession] = React.useState<Session>({
        state: SessionState.LOADING,

        getLocale() {
            return storedLocale;
        },
        setLocale(locale: string) {
            setStoredLocale(locale);
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sessionInfo, setSessionInfo] = useLocalStorage<SessionInfo | null>({
        key: 'session',
        defaultValue: null,
        serialize: (value) => JSON.stringify(value),
        deserialize: (value) => {
            if (value) {
                const sessionInfo: SessionInfo = JSON.parse(value);
                return sessionInfo;
            }
            return null;
        },
    });

    React.useEffect(() => {
        if (sessionInfo) {
            // TODO: Do something with this
        } else {
            setSession({
                state: SessionState.UNAUTHENTICATED,

                getLocale() {
                    return storedLocale;
                },
                setLocale(locale: string) {
                    setStoredLocale(locale);
                },
            });
        }
    }, [sessionInfo, storedLocale, setStoredLocale]);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}
