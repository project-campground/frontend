export interface HighlightNode {
	children: Array<HighlightToken | string>;
}
export interface HighlightToken extends HighlightNode {
	scope: string;
}
