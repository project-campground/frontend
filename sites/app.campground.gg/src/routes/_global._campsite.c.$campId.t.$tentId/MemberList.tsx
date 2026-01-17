import { Chip, List, Typography } from "@mui/joy";
import type { CampsiteMemberViewBasic } from "types/campsites";
import MemberItem from "./MemberItem";
import ContentCategory from "~/components/content/ContentCategory";

type Props = {
    memberCount: number;
    title: string;
    members: CampsiteMemberViewBasic[];
};

export default function MemberList({ memberCount, title, members }: Props) {
    return (
        <ContentCategory header={
            <>
                <Typography level="title-md" fontWeight={700}>{title}</Typography>
                <Chip variant="soft" sx={{ fontWeight: 700 }}>{memberCount}</Chip>
            </>
        }>
            <List sx={(theme) => ({ "--List-padding": 0, "--ListItem-paddingY": "0.5rem", "--ListItem-radius": theme.vars.radius.md, })}>
                {members.map((x) =>
                    <MemberItem key={`member-${x.userId}`} member={x}/>
                )}
            </List>
        </ContentCategory>
    );
}