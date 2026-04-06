import { Box, Divider, styled, type ColorPaletteProp } from "@mui/joy";

const TentMessageDividerStack = styled(Box, {
    name: "TentMessageDivider",
    slot: "root",
})<{ color: ColorPaletteProp; }>(({ theme, color }) => ({
    display: "grid",
    gridTemplateColumns: "72px auto 1fr",
    color: theme.vars.palette[color as "primary"][color === "neutral" ? 300 : 500],
    gap: 16,
    padding: "4px 0px",
    "& > .TentMessageDivider-divider": {
        alignSelf: "center",
        backgroundColor: theme.vars.palette[color as "primary"][color === "neutral" ? 600 : 800],
    }
}));

type Props = React.PropsWithChildren & {
    color?: ColorPaletteProp;
};

export default function TentMessageDivider({ children, color }: Props) {

    return (
        <TentMessageDividerStack color={color ?? "neutral"}>
            <Divider orientation="horizontal" className="TentMessageDivider-divider divider-left" />
            {children}
            <Divider orientation="horizontal" className="TentMessageDivider-divider divider-right" />
        </TentMessageDividerStack>
    )
}
