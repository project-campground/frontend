import React, { useMemo, useState } from 'react';
import type { AuthCredentials, SessionAuth, SessionAuthed, SessionAuthRefresh } from './types';
import HTTPClient from '~/api/http/HTTPClient';
import { useNavigate } from 'react-router';
import { defaultAppApiUrl, defaultAppBackendUrl } from 'api.config';
import { SessionContext } from '.';
import WSClient from '~/api/WSClient';
import PreferenceManager from "~/api/preferences/PreferenceManager";

export function SessionProvider({ children }: React.PropsWithChildren) {
    const navigate = useNavigate();
    const localStorageAuth = useMemo(() => localStorage.getItem("auth"), []);
    const [auth, setAuthUnsafe] = useState<SessionAuth>(localStorageAuth ? JSON.parse(localStorageAuth) : { authenticated: false });
    const refreshLogin = (refresh: SessionAuthRefresh) =>
        setAuth({ authenticated: true, server: (auth as SessionAuthed).server, user: { ...refresh, email: (auth as SessionAuthed).user?.email, emailConfirmed: (auth as SessionAuthed).user?.emailConfirmed } });
    const http = useMemo(() =>
        auth.authenticated
        ? new HTTPClient({ url: auth.server || defaultAppApiUrl, auth: auth.user.accessJwt, refreshAuth: auth.user.refreshJwt, userDid: auth.user.did }, refreshLogin)
        : new HTTPClient({ url: defaultAppBackendUrl })
    , [auth]);

    const setAuth = (value: SessionAuth) => {
        setAuthUnsafe(value);
        localStorage.setItem("auth", JSON.stringify(value));
    };

    const login = async (details: AuthCredentials, server?: string) =>
    {
        const data = await HTTPClient.login(details); 
    
        if (data.ok)
        {
            setAuth({ authenticated: true, server: server ?? defaultAppApiUrl, user: data.content });
        }
        else throw new Error(data.errorDescription);
    };
    const logout = () =>
    {
        setAuth({ authenticated: false });
        navigate("/login");
    };
    const ws = useMemo(() => {
        const webSocket = new WSClient({ url: defaultAppBackendUrl + "/ws/v1" });
        if (auth.authenticated)
            webSocket.initWithAuth(http);
        else
            webSocket.initWithoutAuth();
        return webSocket;
    }, [auth.authenticated]);
    const preferences = useMemo(() => {
        const preferences = new PreferenceManager(http, auth.authenticated);

        preferences.init();

        return preferences;
    }, [auth.authenticated]);

    const value = useMemo(() => ({
        auth,
        http,
        preferences,
        setAuth,
        login,
        logout,
        ws
    }), [auth]);

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}