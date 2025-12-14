import { styled } from "@mui/joy";
import { Group } from "components";

const DividerBase = styled(`div`, {
    name: "Divider",
    slot: "root",
})(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
    "::after": {
        content: "''",
        left: 0,
        right: 0,
        height: 2,
        top: "calc(50% - 1px)",
        background: `linear-gradient(to right, ${theme.vars.palette.background.level5} 10%, transparent 50%, ${theme.vars.palette.background.level5} 90%)`,
        position: "absolute",
    }
}));
const DividerDot = styled(`span`, {
    name: "DividerDot",
})(({ theme }) => ({
    backgroundColor: theme.vars.palette.neutral[400],
    width: 8,
    height: 8,
    borderRadius: theme.vars.radius.sm,
}));

export default function Divider(props: object) {
    return (
        <DividerBase {...props}>
            <Group gap={1} sx={{  }}>
                <DividerDot />
                <DividerDot />
                <DividerDot />
            </Group>
        </DividerBase>
    )
}