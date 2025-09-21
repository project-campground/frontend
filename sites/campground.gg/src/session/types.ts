export type SessionInfo = {
    appview: string;
    pds: string;
    token: string;
}

export type Session = {
    state: SessionState;
    user?: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    } | undefined;
    settings?: UserSettings;

    getLocale(): string;
    setLocale(locale: string): void;
};

export enum SessionState {
    LOADING,
    AUTHENTICATED,
    UNAUTHENTICATED,
}

export type UserSettings = {
    locale?: string;
}