export type SessionAuth = SessionAuthed | SessionUnauthed;

interface SessionAuthState<T extends boolean> {
	authenticated: T;
}
export interface SessionAuthed extends SessionAuthState<true> {
	user: SessionAuthUser;
	server: string;
}
export interface SessionUnauthed extends SessionAuthState<false> {}

export interface AuthCredentials {
	identifier: string;
	password: string;
}
export interface SavedAuth {
	server: string;
	identifier: string;

	accessJwt?: string;
	refreshJwt?: string;
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
