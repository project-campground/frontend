import type { SessionAuthRefresh } from '../session/types.js';

export type HTTPRefreshLogin = (refresh: SessionAuthRefresh) => void;
