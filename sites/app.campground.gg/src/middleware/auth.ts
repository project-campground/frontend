import { sessionRouterContext, sessionUserRouterContext } from "~/session";
import SessionMiddleware from "~/session/SessionMiddleware";

export const authMiddleware = ({ context }: any) => {
    const session = new SessionMiddleware(window.localStorage);
    console.log("Middleware called");
    context.set(sessionRouterContext, session);
};

export const authGetUserMiddleware = async ({ context }: any) => {
    const session: SessionMiddleware = context.get(sessionRouterContext);

    const user = await session.fetchUserIfAuthed()
        .then((x) =>
            x?.ok
            ? x.content
            : (
                console.error("Error fetching authed user profile:", {
                    errorDescription: x?.errorDescription,
                    errorHeader: x?.errorHeader
                }),
                null
            )
        )
        .catch((x) => (console.error("Error fetching authed user profile", x), null));

    context.set(sessionUserRouterContext, user);
};