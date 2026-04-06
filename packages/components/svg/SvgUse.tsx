import { jsx } from "react/jsx-runtime";

export default function SvgUse({ id, className, width, height }: { id: string; className?: string; width?: string; height?: string; }) {
    return (
        jsx("svg", { version: "2.0", className, width, height, children:
            jsx("use", { href: `#${id}` })
        })
    )
}