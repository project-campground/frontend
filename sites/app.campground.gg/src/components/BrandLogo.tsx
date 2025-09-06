import { Group, Image, MantineSize, Text, UnstyledButton } from "@mantine/core";

export type Props = {
    includeText?: boolean;
    size?: MantineSize;
};

export default function BrandLogo({ size, includeText }: Props) {
    return (
        <UnstyledButton component="a" className={`BrandLogo container ${size ?? "md"}`} href="/">
            <Group align="center" gap="xs">
                <Image className={`BrandLogo img ${size ?? "md"}`} src="/logo.svg" />
                {includeText && <Text fw={900} size="xl" fz="h2">
                    Campground
                </Text>}
            </Group>
        </UnstyledButton>
    )
}