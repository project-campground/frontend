import { Option, Select } from "@mui/joy";
import type { RichEditorCodeBlock } from "../../editor/editor";
import hljs from "highlight.js";
import { useSlateStatic } from "slate-react";
import { Element, Transforms } from "slate";
import { Group } from "components";

type Props = {
    element: RichEditorCodeBlock;
};

export default function CodeBlockEditorHeader({ element }: Props) {
    const editor = useSlateStatic();

    const onValueSelected = (_: unknown, language: string | null) => {
        Transforms.setNodes(
            editor,
            {
                lang: language,
            },
            {
                match: m =>
                    Element.isElement(m) && m === element,
            }
        );
    };

    const languages = 
        hljs
            .listLanguages()
            .map((x) => [x, hljs.getLanguage(x)?.name ?? x]);

    return (
        <Group gap={1}>
            <Select defaultValue={element.lang} onChange={onValueSelected} variant="solid" size="sm" sx={{ width: 128 }}>
                <Option value={null}>
                    No language
                </Option>
                {languages.map(([id, name]) =>
                    <Option key={`lang-${id}`} value={id}>{name}</Option>
                )}
            </Select>
        </Group>
    );
}