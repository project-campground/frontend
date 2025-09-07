import { Group, Image, MantineSize, Text, UnstyledButton } from "@mantine/core";

export type Props = {
    includeText?: boolean;
    size?: MantineSize;
};

const sizeToFz: Record<MantineSize, `h${1 | 2 | 3 | 4 | 5 | 6}`> = {
    "xl": "h1",
    "lg": "h2",
    "md": "h3",
    "sm": "h4",
    "xs": "h5"
};

export default function BrandLogo({ size, includeText }: Props) {
    const fz = sizeToFz[size ?? "md"];

    return (
        <UnstyledButton component="a" className={`BrandLogo container ${size ?? "md"}`} href="/">
            <Group align="center" gap="xs">
                <Image className={`BrandLogo img ${size ?? "md"}`} src="/logo.svg" />
                {includeText && <Text component={fz} fw={700} size={size} fz={fz}>
                    Campground
                </Text>}
            </Group>
        </UnstyledButton>
    )
}