import type { AuthResultRefresh } from '../../context/auth/types.ts';

export type HTTPRefreshLogin = (refresh: AuthResultRefresh) => void;
