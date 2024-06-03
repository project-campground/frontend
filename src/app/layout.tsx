import "@mantine/core/styles.css";

import { ReactNode } from "react";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: `Campground`,
    description: `A free and open source chat application.`,
};

const theme = createTheme({
    primaryColor: "orange",
    colors: {
        fireOrange: [
            "#fff0e3",
            "#ffe0cd",
            "#ffbf9b",
            "#ff9c64",
            "#fe7e37",
            "#fe6c1a",
            "#ff6109",
            "#e45000",
            "#cb4600",
            "#b13a00"
        ],
    },
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme={"dark"}>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
};