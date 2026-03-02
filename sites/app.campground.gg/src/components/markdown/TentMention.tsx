import { styled, Typography } from "@mui/joy";
import TentIcon from "../tents/TentIcon";
import { useCampsiteContext } from "~/routes/_global._campsite/context";
import { useNavigate } from "react-router";
import { pseudoTents, PseudoTentType } from "~/util/pseudoTents";
import { useMemo, useState } from "react";

type Props = {
    id: string;
};

const TentMentionWrapper = styled("span", {
    name: "ActorMention",
    slot: "root",
})(({ theme }) => ({
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.vars.palette.neutral[700],
    padding: `2px 8px`,
    borderRadius: theme.vars.radius.md,
    fontWeight: 700,
    gap: theme.spacing(1),
    cursor: "pointer",
    transition: "background 0.3s",
    ":hover": {
        backgroundColor: theme.vars.palette.neutral[600],
    },
}));

export default function TentMention({ id }: Props) {
    const { campsite, permissions: { tentList }, session } = useCampsiteContext();
    const [tent, setTent] = useState(PseudoTentType.includes(id as PseudoTentType) ? pseudoTents[id as PseudoTentType] : tentList.value?.tents.find((x) => x.id === id));
    useMemo(() => {
        if (tent)
            return;
        return (
            session
                .http
                .getTent(id)
                .then((resp) => resp.ok ? setTent(resp.content) : null)
        );
    }, [id]);
    const navigate = useNavigate();

    return (
        <TentMentionWrapper onClick={() => navigate(`/c/${(tent as { campsiteId?: string; })?.campsiteId ?? campsite.id}/t/${id}`)}>
            <TentIcon type={tent?.type ?? "unknown"} viewType={tent?.viewType ?? 0} size={20} />
            <Typography>
                {tent?.name ?? "Unknown tent"}
            </Typography>
        </TentMentionWrapper>
    );
}