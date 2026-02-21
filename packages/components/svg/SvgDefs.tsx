import SvgLogo from "./SvgLogo";
import { jsx } from "react/jsx-runtime";

export default function SvgDefs() {
    return (
        jsx("svg", { style: { display: "none" }, children:
            jsx("defs", { children:
                jsx(SvgLogo, {})
            })
        })
    )
}