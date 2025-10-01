export default function SvgUse({ id, className, width, height }: { id: string; className?: string; width?: string; height?: string; }) {
    return (
        <svg version="2.0" className={className} width={width} height={height}>
            <use href={`#${id}`} />
        </svg>
    )
}