import RESTClient from "api/RESTClient";
import type { SessionAuth, SessionAuthed, SessionAuthRefresh, SessionSettings } from "./types";

type JsonParsed<T> = { parsed: false; content: null; } | { parsed: true; content: T; };

function tryParseJson<T>(raw: string): JsonParsed<T> {
    try {
        return { parsed: true, content: JSON.parse(raw) };
    } catch(err) {
        if (err instanceof SyntaxError)
            return { parsed: false, content: null };
        else throw err;
    }
}
function getFromStorageOrDefault<T>(storage: Storage, key: string, _default: T) {
    const inStorage = storage.getItem(key);
    return inStorage ? tryParseJson<T>(inStorage)?.content ?? _default : _default;
}

export default class SessionMiddleware {
    auth: SessionAuth;
    settings: SessionSettings;
    restClient: RESTClient | null;

    constructor(storage: Storage) {
        this.auth = getFromStorageOrDefault<SessionAuth>(storage, "auth", { authenticated: false });
        this.settings = getFromStorageOrDefault(storage, "settings", { locale: "en-US" });

        // In-case it wasn't done in-client
        const onRefresh = (refresh: SessionAuthRefresh) => {
            (this.auth as SessionAuthed).user = { ...(this.auth as SessionAuthed).user, ...refresh };
            // Save
            storage.setItem("auth", JSON.stringify(this.auth));
        };

        this.restClient = this.auth.authenticated ? new RESTClient({ auth: this.auth.user.accessJwt, refreshAuth: this.auth.user.refreshJwt, userDid: this.auth.user.did }, onRefresh) : null;
    }

    async fetchUserIfAuthed() {
        return this.auth.authenticated ? await this.restClient!.fetchProfile(this.auth.user.did) : null;
    }
}