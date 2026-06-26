import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import CodeBlock from './CodeBlock';
import type { Element, Text } from 'hast';
import InlineCode from './InlineCode';
import { Checkbox } from '@mui/joy';
import Divider from './Divider';
import { hastifyUnknownTypes, mdastMentions } from '~/editor/mdast/mentions';
import ActorMention from './ActorMention';
import TentMention from './TentMention';
import RoleMention from './RoleMention';

type Props = { children: string };

const languagePrefix = 'language-';

function getLanguageFromClassName(className: string[] | undefined) {
	return className?.find((x) => x.startsWith(languagePrefix))?.substring(languagePrefix.length);
}

function parseMeta(raw: string) {
	try {
		return JSON.parse(raw);
	} catch (err: unknown) {
		return null;
	}
}

const markdownComponents: Components & { mention: Components['a'] } = {
	pre({ node }) {
		if (!node) return <CodeBlock>{''}</CodeBlock>;

		// To get all of the info, because pre has none
		const { children: codeElems } = node;
		const codeNode = codeElems[0] as Element;

		// raw content to be parsed
		const text = (codeNode.children[0] as Text).value;

		// language can only be found in classes
		const lang = getLanguageFromClassName(codeNode.properties.className as string[] | undefined);

		// Additional metadata after language names in codeblocks
		const metaRaw = codeNode.data?.meta;
		const metaParsed = metaRaw ? parseMeta(metaRaw) : null;

		return (
			<CodeBlock
				language={lang}
				startingLine={typeof metaParsed?.start === 'number' ? metaParsed!.start : null}
				languageName={typeof metaParsed?.languageName === 'string' ? metaParsed.languageName : null}
				description={typeof metaParsed?.fileName === 'string' ? metaParsed.fileName : null}
				highlightLines={
					(
						Array.isArray(metaParsed?.highlight)
						&& (metaParsed!.highlight as any[]).every((x) => typeof x === 'number')
					) ?
						metaParsed!.highlight
					:	null
				}
			>
				{text}
			</CodeBlock>
		);
	},
	code({ node, children: text }) {
		if (!node) return <div></div>;

		const { properties } = node;
		const className = properties.className as string[] | undefined;
		const lang = getLanguageFromClassName(className);

		return <InlineCode language={lang}>{String(text)}</InlineCode>;
	},
	hr() {
		return <Divider />;
	},
	input({ checked }) {
		return (
			<Checkbox
				checked={checked}
				variant='soft'
				color={checked ? 'success' : 'danger'}
			></Checkbox>
		);
	},
	mention({ id, type }) {
		switch (type) {
			case 'actor':
				return <ActorMention did={id!} />;
			case 'tent':
				return <TentMention id={id!} />;
			case 'role':
				return <RoleMention id={id!} />;
		}
	},
};

export function LargeContentMarkdown({ children }: Props) {
	return (
		<Markdown
			remarkRehypeOptions={{ unknownHandler: hastifyUnknownTypes }}
			remarkPlugins={[remarkGfm, remarkBreaks, () => mdastMentions]}
			components={markdownComponents}
		>
			{children}
		</Markdown>
	);
}
