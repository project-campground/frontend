import { createContext } from 'react';
export { SessionProvider } from './provider';
import { Session } from './types';

export const SessionContext = createContext<Session | null>(null);