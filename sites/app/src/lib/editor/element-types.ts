export interface Node<TType extends string> {
	type: TType;
}
export interface NodeWithContent<
	TType extends string,
	TContent extends Node<string>,
> extends Node<TType> {
	content: TContent[];
}
export interface NodeWithAttrs<
	TType extends string,
	TContent extends Node<string>,
	TData extends object = Record<string, unknown>,
> extends NodeWithContent<TType, TContent> {
	attrs?: TData;
}

export type BlockNodeType = 'paragraph' | 'blockquote' | 'codeBlock';
export type BlockNode<
	TType extends BlockNodeType,
	TContent extends Node<LeafNodeType>,
	TData extends object = Record<string, unknown>,
> = NodeWithAttrs<TType, TContent, TData>;
export type ParagraphNode = BlockNode<'paragraph', AnyLeafNode>;
export type CodeBlockNode = BlockNode<'codeBlock', TextNode>;
export type BlockQuoteNode = BlockNode<'blockquote', AnyBlockNode>;
export type AnyBlockNode = ParagraphNode | BlockQuoteNode | CodeBlockNode;

export type LeafNodeType = 'text' | 'hardBreak';
export interface TextNode extends Node<'text'> {
	text: string;
	marks?: AnyMarkNode[];
}
export type HardBreakNode = Node<'hardBreak'>;
export type AnyLeafNode = TextNode | HardBreakNode;

export type MarkNodeType = 'bold' | 'underline' | 'italic' | 'strike' | 'code';
export type AnyMarkNode = Node<MarkNodeType>;

export type DocumentNode = NodeWithContent<'doc', AnyBlockNode>;
