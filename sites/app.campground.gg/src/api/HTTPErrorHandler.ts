import type { SessionAuthRefresh } from "~/context/session/types";

export type HTTPRefreshLogin = (refresh: SessionAuthRefresh) => void;