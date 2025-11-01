import React, { useMemo, useState } from 'react';
import type { AuthCredentials, SessionAuth, SessionAuthed, SessionAuthRefresh, SessionSettings } from './types';
import { SessionContext } from '.';
import { useLocalStorage } from '@mantine/hooks';
import RESTClient from 'api/RESTClient';

export function SessionProvider({ children }: React.PropsWithChildren) {
    const [restClient, setRestClient] = useState<RESTClient | null>(null);
    const [auth, setAuth] = useLocalStorage<SessionAuth>({
        key: "auth",
        defaultValue: { authenticated: false, },
        serialize: (value) => JSON.stringify(value),
        deserialize: (value) => {
            if (value) {
                const parsed = JSON.parse(value) as SessionAuth;

                // To have rest client
                if (parsed.authenticated)
                    setRestClient(new RESTClient({ auth: parsed.user.accessJwt, refreshAuth: parsed.user.refreshJwt }, refreshLogin));
                return parsed;
            }
            return { authenticated: false, };
        },
    });
    const refreshLogin = (refresh: SessionAuthRefresh) =>
        setAuth({ authenticated: true, user: { ...refresh, email: (auth as SessionAuthed).user?.email, emailConfirmed: (auth as SessionAuthed).user?.emailConfirmed } });
    const [settings, setSettings] = useLocalStorage<SessionSettings>({
        key: "settings",
        defaultValue: { locale: "en-US", },
        serialize: (value) => JSON.stringify(value),
        deserialize: (value) => {
            if (value)
                return JSON.parse(value) as SessionSettings;
            return { locale: "en-US", };
        },
    });

    const login = async (details: AuthCredentials) =>
    {
        const data = await RESTClient.login(details); 
    
        if (data.ok)
        {
            setAuth({ authenticated: true, user: data.content });
            setRestClient(new RESTClient({ auth: data.content.accessJwt, refreshAuth: data.content.refreshJwt }, refreshLogin))
        }
        else throw new Error(data.errorDescription);
    };
    const logout = () =>
    {

    };

    const value = useMemo(() => ({
        auth,
        restClient,
        settings,
        setSettings,
        login,
        logout,
    }), [auth, restClient, settings]);

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}
