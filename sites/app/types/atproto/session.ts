export interface GetSession {
    handle: string;
    did: string;
    didDoc?: any;
    email?: string;
    emailConfirmed?: boolean;
    emailAuthFactor?: boolean;
    active?: boolean;
    status?: "takendown" | "suspended" | "deactivated" | string;
}