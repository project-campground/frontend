import { Stack } from "@mui/joy";
import React, { ReactNode } from "react";
import GlobalNavbar from "./GlobalNavbar";
import type { Session, SessionAuthed } from "~/session/types";

type Props = {
    page: string | null;
    session: Session;
    children: ReactNode[] | ReactNode;
};

export default class GlobalLayout extends React.Component<Props> {
    render() {
        const { page, session, children } = this.props;

        return (
            <Stack direction="column" alignItems="stretch" sx={{ width: "100%", height: "100%" }}>
                <GlobalNavbar page={page} session={session} sessionUser={(session.auth as SessionAuthed).user} />
                <Stack sx={{ flex: 1, height: "100%" }}>
                    { children }
                </Stack>
            </Stack>
        )
    }
}