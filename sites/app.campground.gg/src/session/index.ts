// import { useContext } from 'react';
export { SessionProvider } from './provider';
import { type Session } from './types';
import { createContext, useContext } from 'react';
import { createContext as createRouterContext } from 'react-router';
import SessionMiddleware from './SessionMiddleware';

export const SessionContext = createContext<Session>(null!);
export const sessionRouterContext = createRouterContext<SessionMiddleware>(null!);

export const useSession = () => useContext(SessionContext);