import type { Root } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown, gfmToMarkdown } from "mdast-util-gfm";
import { toMarkdown } from "mdast-util-to-markdown";
import { gfm } from "micromark-extension-gfm";

export function serializeMarkdown(root: Root) {
    return toMarkdown(root, { emphasis: "_", bullet: "-", bulletOther: "*", strong: "*", extensions: [gfmToMarkdown()] });
}
export function deserializeMarkdown(code: string) {
    return fromMarkdown(code, "utf-8", { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] })
}