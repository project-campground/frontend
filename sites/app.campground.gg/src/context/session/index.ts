// import { useContext } from 'react';
export { SessionProvider } from './provider';
import { type Session } from './types';
import { createContext, useContext } from 'react';
import { createContext as createRouterContext } from 'react-router';
import SessionMiddleware from './SessionMiddleware';
import type { Me } from 'types/me';

export const SessionContext = createContext<Session>(null!);
export const sessionRouterContext = createRouterContext<SessionMiddleware>(null!);
export const MeContext = createContext<Me | null>(null);

export const useSession = () => useContext(SessionContext);
export const useMeContext = () => useContext(MeContext);