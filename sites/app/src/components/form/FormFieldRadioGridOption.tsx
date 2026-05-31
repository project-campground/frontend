import { Radio, ListItem, type RadioProps, styled, Stack, Typography } from "@mui/joy";
import type { ReactNode } from "react";

type Props = RadioProps & {
    startDecorator?: ReactNode[] | ReactNode;
    endDecorator?: ReactNode[] | ReactNode;
};

const GridRadio = styled(Radio)(() => ({
    flexGrow: 1,
    flexDirection: "row-reverse",
}));
const RadioLabel = styled(Stack, {
    name: "RadioLabel",
    slot: "root",
})(({ theme }) => ({
    gap: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
}));

export default function FormFieldRadioGridOption({ sx, children, variant, color, overlay, disableIcon, startDecorator, endDecorator, ...props }: Props) {
    return (
        <ListItem variant="solid" sx={{ boxShadow: "md" }}>
            <GridRadio
                overlay={overlay ?? true}
                disableIcon={disableIcon ?? true}
                variant={variant ?? "soft"}
                {...props}
                label={
                    <RadioLabel>
                        {startDecorator}
                        <Typography>
                            {children}
                        </Typography>
                        {endDecorator}
                    </RadioLabel>
                }
                sx={[{ flexGrow: 1, }, ...(Array.isArray(sx) ? sx : [sx])]}
            />
        </ListItem>
    );
}