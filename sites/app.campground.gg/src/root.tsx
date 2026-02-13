import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { IntlProvider } from './context/i18n';
// import { SessionProvider } from './session';
import { Box, CircularProgress, CssBaseline, CssVarsProvider, StyledEngineProvider } from '@mui/joy';
import { BrandLogo, FlexCenter, SvgDefs, theme } from "components";
import { SessionProvider } from "./context/session";
import { SnackbarContextProvider } from "./context/snackbar";
import { ContextSuiteProvider } from "./context/context-suite";
import { DndContext } from "@dnd-kit/core";
import { RightClickProvider } from "./context/mouse";

export const links: Route.LinksFunction = () => [
    // {
    //     rel: "stylesheet",
    //     href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    // },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <SvgDefs />
                <>
                    {/* <InitColorSchemeScript defaultMode="dark" /> */}
                    <StyledEngineProvider injectFirst>
                        <CssVarsProvider theme={theme} defaultMode="dark" defaultColorScheme="dark">
                            <CssBaseline />
                            {children}
                        </CssVarsProvider>
                    </StyledEngineProvider>
                </>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
  return (
    <SessionProvider>
        <IntlProvider>
            <SnackbarContextProvider>
                <ContextSuiteProvider>
                    <DndContext>
                        <RightClickProvider>
                            <Box id="root">
                                <Outlet />
                            </Box>
                        </RightClickProvider>
                    </DndContext>
                </ContextSuiteProvider>
            </SnackbarContextProvider>
        </IntlProvider>
    </SessionProvider>
  );
}

export function AppErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}

export function HydrateFallback() {
    return (
        <FlexCenter>
            <CircularProgress size="lg" sx={{ "--CircularProgress-size": "128px" }}>
                <BrandLogo size="xl" />
            </CircularProgress>
        </FlexCenter>
    );
}