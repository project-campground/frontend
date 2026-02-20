import SvgLogo from "./SvgLogo";

export default function SvgDefs() {
    return (
        <svg style={{ display: "none" }}>
            <defs>
                <SvgLogo />
            </defs>
        </svg>
    )
}