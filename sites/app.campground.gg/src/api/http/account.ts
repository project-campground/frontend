import HTTPAtprotoObjectManager from "./base-atproto";

export default class HTTPAccountManager extends HTTPAtprotoObjectManager {
    public confirmEmail(props: { email: string; token: string }) {
        return this.client.post<null>({
            route: `com.atproto.server.requestPasswordReset`,
            body: props,
        });
    }
    public updateEmail(props: {
        email: string;
        emailAuthFactor?: boolean;
        token?: string;
    }) {
        return this.client.post<null>({
            route: `com.atproto.server.requestPasswordReset`,
            body: props,
        });
    }
    public resetPassword(props: { password: string; token: string }) {
        return this.client.post<null>({
            route: `com.atproto.server.requestPasswordReset`,
            body: props,
        });
    }

    public activate() {
        return this.client.post<null>({
            route: `com.atproto.server.activateAccount`,
        });
    }
    public deactivate(props: { deleteAfter?: Date }) {
        return this.client.post<null>({
            route: `com.atproto.server.deactivateAccount`,
            body: props,
        });
    }
    public delete({
        deletionToken,
        password,
    }: {
        deletionToken: string;
        password: string;
    }) {
        return this.client.post<null>({
            route: `com.atproto.server.deleteAccount`,
            body: {
                token: deletionToken,
                password,
                did: this.client.actorDid,
            },
        });
    }

    public requestAccountDelete() {
        return this.client.post<null>({
            route: `com.atproto.server.requestAccountDelete`,
        });
    }
    public requestEmailConfirmation() {
        return this.client.post<null>({
            route: `com.atproto.server.requestEmailConfirmation`,
        });
    }
    public requestEmailUpdate(tokenRequired: boolean) {
        return this.client.post<null>({
            route: `com.atproto.server.requestEmailConfirmation`,
            body: { tokenRequired },
        });
    }
    public requestPasswordReset(email: string) {
        return this.client.post<null>({
            route: `com.atproto.server.requestPasswordReset`,
            body: { email },
        });
    }
}
