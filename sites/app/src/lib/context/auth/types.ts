export type AuthenticationAny = Authenticated | Unauthenticated;

interface AuthenticationState<T extends boolean> {
	authenticated: T;
}
export interface Authenticated extends AuthenticationState<true> {
	user: AuthResultLogin;
	server: string;
}
export interface Unauthenticated extends AuthenticationState<false> {}

export interface CachedAuth {
	server: string;
	email: string;
	handle: string;

	accessJwt?: string;
	refreshJwt?: string;
}

export interface AuthResult {
	did: string;
	handle: string;
	accessJwt: string;
	refreshJwt: string;
}
export interface AuthResultLogin extends AuthResult {
	email: string;
	emailConfirmed: boolean;
	active: boolean;
}
export interface AuthResultRefresh extends AuthResult {
	active: boolean;
}
export interface AuthResultRegister extends AuthResult {
	didDoc: unknown;
}
