import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/tiptap/styles.css";

const inter = Inter({
  subsets: ["latin"],
});

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Inter } from "next/font/google";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

export const metadata = {
  title: {
    default: "Campground",
    template: "%s - Campground",
  },
  description: "A free and open source chat application.",
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
      "#b13a00",
    ],
  },
});

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <ModalsProvider>
            <Notifications />
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
