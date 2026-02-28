import type { ContentComponent } from "types/content";
import MarkdownWrapper from "./MarkdownWrapper";
import { LargeContentMarkdown } from "./Markdown";
import { ContentComponentDisplay } from "./ContentComponentDisplay";
import type { CampsiteMemberViewAuthor, CampsiteRoleView } from "types/campsites";
import type React from "react";

type Props = {
    content: string;
    components?: ContentComponent[];
    createdBy: CampsiteMemberViewAuthor;
    onUserClick?: (event: React.MouseEvent<HTMLDivElement>, user: CampsiteMemberViewAuthor) => unknown;
    colorRoles?: CampsiteRoleView[];
};

export default function ContentDisplayBlock({ content, components, createdBy, onUserClick, colorRoles }: Props) {
    return (
        <MarkdownWrapper>
            {content && <LargeContentMarkdown>
                {content}
            </LargeContentMarkdown>}
            {components?.map((x, i) =>
                <ContentComponentDisplay key={i} component={x} createdBy={createdBy} onUserClick={onUserClick} colorRoles={colorRoles} />
            )}
        </MarkdownWrapper>
    );
}