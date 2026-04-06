import type { CampsiteViewDetailed } from "types/campsites";
import type { TentViewDetailed } from "types/tent";
import TentContentWrapper from "./TentContentWrapper";
import { ComponentByTentType } from "./tents";
import MemberSidebar from "./MemberSidebar";
import { useState } from "react";
import { Box, styled } from "@mui/joy";
import { useSession } from "~/context/session";
import type { TypeToPayload } from "types/ws";
import { useNavigate } from "react-router";

type Props = {
    campsite: CampsiteViewDetailed;
    campsiteId: string;
    tent: TentViewDetailed;
};

const SidebarWrapper = styled(Box)(() => ({
    transitionDuration: "0.3s",
    transitionProperty: "width",
    height: "100%",
    minWidth: 0,
    width: 0,
    maxWidth: 320,
    "&.open": {
        width: 320,
    },
}));

export default function TentLayout({ campsite, campsiteId, tent }: Props) {
    const session = useSession();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { Component, MemberSidebarInfo } = ComponentByTentType[tent.type];
    // To not stay on the tent
    session.ws.subscribe((message) =>
        message.op === 1 && message.t === "TentDeleted" && (message.payload as TypeToPayload["TentDeleted"]).id === tent.id
        ? navigate(`/c/${campsiteId}/t/bulletin`)
        : null
    );

    return (
        <>
            <TentContentWrapper tent={tent} sidebarToggle={setSidebarOpen} sidebarOpen={sidebarOpen}>
                <Component campsiteId={campsiteId} tent={tent} />
            </TentContentWrapper>
            <SidebarWrapper className={sidebarOpen ? "open" : ""}>
                <MemberSidebar campsiteId={campsiteId} campsite={campsite!} tent={tent}>
                    {MemberSidebarInfo && <MemberSidebarInfo campsite={campsite} tent={tent} />}
                </MemberSidebar>
            </SidebarWrapper>
        </>
    );
}