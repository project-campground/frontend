import type { SessionAuthRefresh } from "~/context/session/types";

export type RESTRefreshLogin = (refresh: SessionAuthRefresh) => void;