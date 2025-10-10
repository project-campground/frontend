import { sessionRouterContext } from "~/session";
import SessionMiddleware from "~/session/SessionMiddleware";

export const authMiddleware = ({ context }: any) => {
    const session = new SessionMiddleware(window.localStorage);
    console.log("Middleware called");
    context.set(sessionRouterContext, session);
}