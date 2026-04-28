import HTTPAtprotoClient from "~/api/http/HTTPAtprotoClient";
import type PreferenceManager from "~/api/preferences/PreferenceManager";
import type WSClient from "~/api/WSClient";

export interface Session {
    auth: SessionAuth;
    preferences: PreferenceManager;
    atproto: HTTPAtprotoClient;
    ws: WSClient;
    setAuth(details: SessionAuth): void;
    login(details: AuthCredentials): Promise<void>;
    logout(): void;
}
export type Locale = "en-US";
export type SessionAuth = SessionAuthed | SessionUnauthed;
interface SessionAuthState<T extends boolean> {
    authenticated: T;
}
export interface SessionAuthed extends SessionAuthState<true> {
    user: SessionAuthUser;
    server: string;
}
export interface SessionUnauthed extends SessionAuthState<false> { }

export interface AuthCredentials {
    identifier: string;
    password: string;
}

export interface SessionBasic {
    did: string;
    handle: string;
    accessJwt: string;
    refreshJwt: string;
}
export interface SessionAuthUser extends SessionBasic {
    email: string;
    emailConfirmed: boolean;
    active: boolean;
}
export interface SessionAuthRefresh extends SessionBasic {
    active: boolean;
}