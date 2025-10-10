import type { SessionAuthRefresh } from "~/session/types";

export type RESTRefreshLogin = (refresh: SessionAuthRefresh) => void;