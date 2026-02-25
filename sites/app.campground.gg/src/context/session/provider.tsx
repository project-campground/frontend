import React, { useMemo, useState } from 'react';
import type { AuthCredentials, SessionAuth, SessionAuthed, SessionAuthRefresh, SessionSettings } from './types';
import HTTPClient from 'api/HTTPClient';
import { useNavigate } from 'react-router';
import { defaultAppBackendUrl } from 'api.config';
import { SessionContext } from '.';
import WebSocketClient from 'api/WebSocketClient';

export function SessionProvider({ children }: React.PropsWithChildren) {
    const navigate = useNavigate();
    const localStorageAuth = useMemo(() => localStorage.getItem("auth"), []);
    const localStorageSettings = useMemo(() => localStorage.getItem("settings"), []);
    const [auth, setAuthUnsafe] = useState<SessionAuth>(localStorageAuth ? JSON.parse(localStorageAuth) : { authenticated: false });
    const [settings, setSettingsUnsafe] = useState<SessionSettings>(localStorageSettings ? JSON.parse(localStorageSettings) : { locale: "en-US" });
    const refreshLogin = (refresh: SessionAuthRefresh) =>
        setAuth({ authenticated: true, user: { ...refresh, email: (auth as SessionAuthed).user?.email, emailConfirmed: (auth as SessionAuthed).user?.emailConfirmed } });
    const restClient = useMemo(() =>
        auth.authenticated
        ? new HTTPClient({ auth: auth.user.accessJwt, refreshAuth: auth.user.refreshJwt, userDid: auth.user.did }, refreshLogin)
        : new HTTPClient({ url: defaultAppBackendUrl })
    , [auth]);

    const setAuth = (value: SessionAuth) => {
        setAuthUnsafe(value);
        localStorage.setItem("auth", JSON.stringify(value));
    };
    const setSettings = (value: SessionSettings) => {
        setSettingsUnsafe(value);
        localStorage.setItem("settings", JSON.stringify(value));
    };

    const login = async (details: AuthCredentials) =>
    {
        const data = await HTTPClient.login(details); 
    
        if (data.ok)
        {
            setAuth({ authenticated: true, user: data.content });
        }
        else throw new Error(data.errorDescription);
    };
    const logout = () =>
    {
        setAuth({ authenticated: false });
        navigate("/login");
    };
    const webSocket = useMemo(() => {
        const webSocket = new WebSocketClient({ url: defaultAppBackendUrl + "/ws/v1" });
        if (auth.authenticated)
            webSocket.initWithAuth(restClient);
        else
            webSocket.initWithoutAuth();
        return webSocket;
    }, [auth.authenticated]);

    const value = useMemo(() => ({
        auth,
        restClient,
        settings,
        setSettings,
        login,
        logout,
        webSocket
    }), [auth, settings]);

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}