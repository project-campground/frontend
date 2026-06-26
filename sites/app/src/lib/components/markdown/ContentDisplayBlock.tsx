import type { ContentComponent } from 'types/campground/content';
import MarkdownWrapper from './MarkdownWrapper';
import { LargeContentMarkdown } from './Markdown';
import { ContentComponentDisplay } from './ContentComponentDisplay';
import type { MemberViewAuthor } from 'types/campground/membership';
import type { RoleView } from 'types/campground/roles';
import type React from 'react';

type Props = {
	content: string;
	inline?: boolean;
	components?: ContentComponent[];
	createdBy: MemberViewAuthor;
	onUserClick?: (event: React.MouseEvent<HTMLDivElement>, user: MemberViewAuthor) => unknown;
	colorRoles?: RoleView[];
};

export default function ContentDisplayBlock({
	content,
	inline,
	components,
	createdBy,
	onUserClick,
	colorRoles,
}: Props) {
	return (
		<MarkdownWrapper inline={inline}>
			{content && <LargeContentMarkdown>{content}</LargeContentMarkdown>}
			{components?.map((x, i) => (
				<ContentComponentDisplay
					key={i}
					component={x}
					createdBy={createdBy}
					onUserClick={onUserClick}
					colorRoles={colorRoles}
				/>
			))}
		</MarkdownWrapper>
	);
}
