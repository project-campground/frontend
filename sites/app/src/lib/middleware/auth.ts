import { sessionRouterContext } from '~/context/session';
import SessionMiddleware from '~/context/session/SessionMiddleware';

export const authMiddleware = ({ context }: any) => {
	const session = new SessionMiddleware(window.localStorage);
	context.set(sessionRouterContext, session);
};
