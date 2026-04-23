import TentContentWrapper from "./TentContentWrapper";
import { ComponentByTentType } from "./tents";
import MemberSidebar from "./MemberSidebar";
import { useMemo, useState } from "react";
import { Box, styled } from "@mui/joy";
import { useSession } from "~/context/session";
import type { TypeToPayload } from "types/ws";
import { useNavigate } from "react-router";
import { useCampsiteContext } from "../_global._campsite/context";
import { pseudoTents, PseudoTentType } from "~/util/pseudoTents";
import type { TentViewBasic, TentType } from "types/campground/tent";
import { useIntl } from "react-intl";
import { globalIntlDeclarations } from "~/i18n";

type Props = {
    campsiteId: string;
    tentId: string;
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

export default function TentLayout({ campsiteId, tentId }: Props) {
    const { api, floaters, session } = useCampsiteContext();
    const navigate = useNavigate();
    const intl = useIntl();
    const [tentInfo, setTentInfo] = useState<TentViewBasic | null>(null);

    useMemo(async () => {
        if (PseudoTentType.includes(tentId as PseudoTentType))
            return setTentInfo({
                id: tentId,
                campsiteId,
                bonfireId: "",
                categoryId: null,

                name: intl.formatMessage({ ...globalIntlDeclarations[`app.tents.${tentId}` as "app.tents.bulletin"] }),
                description: "",
                viewType: 0,
                type: tentId as TentType,
                position: 0,
            });

        return api
            .tents
            .get(tentId)
            .then((resp) => {
                if (!resp.ok)
                    return floaters.notifyApiError(resp);

                return setTentInfo(resp.content);
            });
    }, [tentId])

    if (!tentInfo)
        return (
            "aaa"
        );

    // const [sidebarOpen, setSidebarOpen] = useState(true);
    const { Component, MemberSidebarInfo } = ComponentByTentType[tentInfo.type];
    // To not stay on the tent
    session.ws.subscribe((message) =>
        message.op === 1 && message.t === "TentDeleted" && (message.payload as TypeToPayload["TentDeleted"]).id === tentInfo.id
        ? navigate(`/c/${campsiteId}/t/bulletin`)
        : null
    );

    return (
        <>
            <TentContentWrapper tent={tentInfo} sidebarToggle={() => console.log("a")} sidebarOpen={true}>
                <Component campsiteId={campsiteId} tent={tentInfo} />
            </TentContentWrapper>
            <SidebarWrapper className={true ? "open" : ""}>
                <MemberSidebar campsiteId={campsiteId} tent={tentInfo}>
                    {MemberSidebarInfo && <MemberSidebarInfo tent={tentInfo} />}
                </MemberSidebar>
            </SidebarWrapper>
        </>
    );
}