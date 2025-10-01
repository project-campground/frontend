import SvgLogo from "./SvgLogo";

export default function SvgDefs() {
    return (
        <svg style={{ display: "none" }} version="2.0">
            <defs>
                <SvgLogo />
            </defs>
        </svg>
    )
}