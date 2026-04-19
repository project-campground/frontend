import HTTPClientObjectManager from "./base";

export default class HTTPClientAccountManager extends HTTPClientObjectManager {
    public confirmEmail(props: { email: string; token: string; }) {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.requestPasswordReset`, { body: props });
    }
    public updateEmail(props: { email: string; emailAuthFactor?: boolean; token?: string; }) {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.requestPasswordReset`, { body: props });
    }
    public resetPassword(props: { password: string; token: string; }) {
        return this.client.fetchPDS<null>("POST", `com.atproto.server.requestPasswordReset`, { body: props });
    }

    public activate() {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.activateAccount`, { });
    }
    public deactivate(props: { deleteAfter?: Date }) {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.deactivateAccount`, { body: props });
    }
    public delete({ deletionToken, password }: { deletionToken: string; password: string; }) {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.deleteAccount`, { body: { token: deletionToken, password, did: this.client.actorDid } });
    }

    public requestAccountDelete() {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.requestAccountDelete`, { });
    }
    public requestEmailConfirmation() {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.requestEmailConfirmation`, { });
    }
    public requestEmailUpdate(tokenRequired: boolean) {
        return this.client.fetchPDSAuthed<null>("POST", `com.atproto.server.requestEmailConfirmation`, { body: { tokenRequired } });
    }
    public requestPasswordReset(email: string) {
        return this.client.fetchPDS<null>("POST", `com.atproto.server.requestPasswordReset`, { body: { email } });
    }
}
