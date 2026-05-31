import type { Link, Root } from "mdast";
import { findAndReplace } from "mdast-util-find-and-replace";
import type { Element } from "hast";

export function mdastMentions(tree: Root, _file: any, ...args: any[]) {
    if (!tree)
        return;

    findAndReplace(tree, [
        // [
        //     /[<][@](did[:][a-z]+[:][A-Za-z0-9-%._:]*[A-Za-z0-9._-])[>]/g,
        //     didMention
        // ],
        [
            /[<][@](did[:]plc[:][A-Za-z0-9]+)[>]/g,
            actorMention
        ],
        [
            /[<][#](bulletin|members|[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})[>]/g,
            tentMention
        ],
        [
            /[<][&]([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})[>]/g,
            roleMention
        ]
    ]);
}

const MentionType = ["actorMention", "tentMention", "roleMention"] as const;
type MentionType = typeof MentionType[number];

interface MentionMdastElement<TType extends MentionType> {
    type: TType;
    id: string;
}

type ActorMentionMdastElement = MentionMdastElement<"actorMention">;
type TentMentionMdastElement = MentionMdastElement<"tentMention">;
type RoleMentionMdastElement = MentionMdastElement<"roleMention">;
type AnyMentionMdastElement = ActorMentionMdastElement | TentMentionMdastElement | RoleMentionMdastElement;

function actorMention(_: any, did: string) {
    return {
        type: "actorMention",
        id: did,
    } satisfies ActorMentionMdastElement as unknown as Link;
}
function tentMention(_: any, id: string) {
    return {
        type: "tentMention",
        id: id,
    } satisfies TentMentionMdastElement as unknown as Link;
}
function roleMention(_: any, id: string) {
    return {
        type: "roleMention",
        id: id,
    } satisfies RoleMentionMdastElement as unknown as Link;
}

export function hastifyUnknownTypes(_state: any, node: AnyMentionMdastElement) {
    switch (node.type) {
        case "roleMention":
        case "tentMention":
        case "actorMention":
            return hastifyMention(node as ActorMentionMdastElement);
        default:
            return;
    }
}
function hastifyMention(node: ActorMentionMdastElement): Element {
    return {
        type: "element",
        tagName: "mention",
        properties: { type: node.type.slice(0, -"Mention".length), id: node.id },
        children: []
    };
}
