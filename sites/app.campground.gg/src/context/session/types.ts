import HTTPClient from "~/api/HTTPClient";
import type WSClient from "~/api/WSClient";

export interface Session {
    auth: SessionAuth;
    settings: SessionSettings;
    http: HTTPClient;
    ws: WSClient;
    login(details: AuthCredentials): Promise<void>;
    logout(): void;
    setSettings(value: SessionSettings | ((prevState: SessionSettings) => SessionSettings)): void;
}
export type Locale = "en-US";
export interface SessionSettings {
    locale: Locale;
}
export type SessionAuth = SessionAuthed | SessionUnauthed;
interface SessionAuthState<T extends boolean> {
    authenticated: T;
}
export interface SessionAuthed extends SessionAuthState<true> {
    user: SessionAuthUser;
}
export interface SessionUnauthed extends SessionAuthState<false> { }

export interface AuthCredentials {
    identifier: string;
    password: string;
}

export interface SessionAuthUser {
    did: string;
    handle: string;
    email: string;
    emailConfirmed: boolean;
    accessJwt: string;
    refreshJwt: string;
    active: boolean;
}
export interface SessionAuthRefresh {
    did: string;
    handle: string;
    accessJwt: string;
    refreshJwt: string;
    active: boolean;
}