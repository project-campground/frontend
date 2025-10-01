import { Button, Card, CardContent, ColorPaletteProp, Stack, Typography } from "@mui/joy";
import { IconDownload } from "@tabler/icons-react";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    title: string;
    description: string;
    icon: ReactNode;
    color: ColorPaletteProp;
    children?: ReactNode[] | ReactNode;
    href?: string;
    gridColumn?: string;
};


export default function DownloadCard({ title, description, color, icon, href, gridColumn, children }: Props) {
    return (
        <Card invertedColors color={color} variant="soft" sx={{ gridColumn, }}>
            <CardContent>
                <Stack sx={{ display: "flex" }} gap={2} flex="1 auto">
                    <Stack direction="column" flex={1}>
                        <Typography level="title-md" fontWeight={700} startDecorator={icon}>
                            {title}
                        </Typography>
                        <Typography level="body-md">
                            {description}
                        </Typography>
                    </Stack>
                    {children || <Button component="a" href={href} variant="soft" startDecorator={<IconDownload />}>
                        <FormattedMessage id="global.download" />
                    </Button>}
                </Stack>
            </CardContent>
        </Card>
    )
}