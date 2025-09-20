import React, { ReactNode } from "react";
import { Box, Sheet, Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { FormattedMessage } from "react-intl";
import SigninNavbar from "./SigninNavbar";

type Props = {
    header: string;
    sx?: SxProps;
    bodySx?: SxProps;
    children: ReactNode[] | ReactNode;
};

export default class SigninWrapper extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { header, sx, bodySx, children } = this.props;

        return (
            <Stack component="main" direction="column" className="LandingBareboneWrapper container" sx={{ height: "100%", ...sx }}>
                <SigninNavbar page="home" />
                <Stack direction="column" className="SigninWrapper body" sx={{ overflow: "hidden", height: "100%", flex: 1, width: "100%", ...bodySx }}>
                    <Box className="SigninPage background" sx={(theme) => ({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(to bottom, ${theme.vars.palette.info[950]}, ${theme.vars.palette.info[300]})`,
                        overflow: "hidden",
                        zIndex: -1,
                    })}>
                        <Box className="SigninPage background-dark" sx={(theme) => ({
                            background: `linear-gradient(to left, ${theme.vars.palette.background.body}, ${theme.vars.palette.background.level1})`,
                            position: "absolute",
                            content: "''",
                            zIndex: 2,
                            top: -1000,
                            left: -1000,
                            right: "40%",
                            bottom: -500,
                            rotate: "6deg",
                            // borderRadius: "300% 50%",
                            mask: [
                                `radial-gradient(514.3px at calc(100% - 690px) 50%,#000 100.8%,#0000 101%) 0 calc(50% - 460px)/100% 920px`,
                                `radial-gradient(519.3px at calc(100% + 470px) 50%,#0000 100.8%,#000 101%) calc(100% - 225px) 50%/100% 920px repeat-y`,
                            ].join(",")
                        })}>

                        </Box>
                    </Box>
                    <Box className="SigninWrapper wrapper-column" sx={{ display: "flex", alignItems: "center", flexDirection: "column", height: "100%" }}>
                        <Box className="SigninWrapper wrapper-row" sx={{ display: "flex", alignItems: "center", height: "100%", flexDirection: "row" }}>
                            <Sheet className="SigninWrapper box" sx={(theme) => ({ backgroundColor: theme.vars.palette.background.level1, minWidth: 650, borderRadius: theme.vars.radius.lg, boxShadow: theme.vars.shadow.xl })}>
                                <Stack className="SigninWrapper form-wrapper" gap={2} sx={{ px: 12, py: 10 }}>
                                    <Stack className="SigninWrapper header" direction="row">
                                        <Typography level="h3">
                                            <FormattedMessage id={header} />
                                        </Typography>
                                    </Stack>
                                    <Box className="SigninWrapper form-container">
                                        {/* <form className="SigninWrapper form" onSubmit={onButtonSubmit}> */}
                                            {children}
                                        {/* </form> */}
                                    </Box>
                                </Stack>
                            </Sheet>
                        </Box>
                    </Box>
                    {/* <Grid container sx={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 5, flex: 1, height: "100%" }} spacing="xl" className="SigninWrapper grid">
                        <Grid gridColumn={1}>
                        </Grid>
                        <Grid gridColumn={2}></Grid>
                    </Grid> */}
                </Stack>
            </Stack>
        );
    }
}