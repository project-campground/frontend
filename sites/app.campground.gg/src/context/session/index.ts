// import { useContext } from 'react';
export { SessionProvider } from './provider';
import { type Session } from './types';
import { createContext, useContext } from 'react';
import { createContext as createRouterContext } from 'react-router';
import SessionMiddleware from './SessionMiddleware';
import type { Me } from 'types/me';

export const SessionContext = createContext<Session>(null!);
export const sessionRouterContext = createRouterContext<SessionMiddleware>(null!);
export interface AccountContext {
    me: Me;
    openUserSettings: () => void;
}
export const AccountContext = createContext<AccountContext | null>(null);

export const useSession = () => useContext(SessionContext);
export const useMeContext = () => useContext(AccountContext)?.me;
export const useAccount = () => useContext(AccountContext);