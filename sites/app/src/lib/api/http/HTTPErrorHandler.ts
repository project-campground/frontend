import type { SessionAuthRefresh } from '../session/types';

export type HTTPRefreshLogin = (refresh: SessionAuthRefresh) => void;
