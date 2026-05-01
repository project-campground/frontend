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
import { IntlProvider } from './i18n/provider';
// import { SessionProvider } from './session';
import { Box, CssBaseline, CssVarsProvider, StyledEngineProvider } from '@mui/joy';
import { SvgDefs, SvgUse, theme } from "@campground/ui";
import { SessionProvider } from "./context/session";
import { SnackbarContextProvider } from "./context/snackbar";
import { ContextSuiteProvider } from "./context/context-suite";
import { RightClickProvider } from "./context/mouse";
import { KeyContext } from "./context/key";
import { useState, type KeyboardEventHandler } from "react";

export const links: Route.LinksFunction = () => [
    // {
    //     rel: "stylesheet",
    //     href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    // },
    {
        rel: "icon",
        href: "/favicon.ico",
    }
];

export function Layout({ children }: { children: React.ReactNode }) {
    const [keys, setKeys] = useState<KeyContext>({ shift: false, control: false });
    const updateKeys: KeyboardEventHandler<HTMLHtmlElement> = (ev) =>
        // To not update constantly update from other key holds and hold removals
        ev.shiftKey !== keys.shift || ev.ctrlKey !== keys.control
        ? setKeys({ shift: ev.shiftKey, control: ev.ctrlKey })
        : null;

    return (
        <html lang="en" onKeyDown={updateKeys} onKeyUp={updateKeys}>
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
                            <KeyContext.Provider value={keys}>
                                {children}
                            </KeyContext.Provider>
                        </CssVarsProvider>
                    </StyledEngineProvider>
                </>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

function AppComponent({ children }: React.PropsWithChildren) {
    return (
        <SessionProvider>
            <IntlProvider>
                <SnackbarContextProvider>
                    <ContextSuiteProvider>
                        <RightClickProvider>
                            <Box id="root">
                                {children}
                            </Box>
                        </RightClickProvider>
                        {/* <DndContext>
                        </DndContext> */}
                    </ContextSuiteProvider>
                </SnackbarContextProvider>
            </IntlProvider>
        </SessionProvider>
    );
}

export default function App() {
    console.log("App render");
    return (
        <AppComponent>
            <Outlet />
        </AppComponent>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
        <>
            <style>
                {`@keyframes stroke-width-animation {
                    0% {
                        mask-position: 0%;
                        stroke-width: 2px;
                    }
                    50% {
                        mask-position: 60%;
                        stroke-width: 4px;
                    }
                    100% {
                        mask-position: 120%;
                        stroke-width: 2px;
                    }
                }`}
            </style>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ height: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{  position: "relative", width: "128px", height: "128px", color: "transparent" }}>
                        <div style={{ zIndex: 1, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, strokeWidth: "2px", stroke: "var(--palette-secondary-500)", strokeLinecap: "round", strokeLinejoin: "round", animation: `stroke-width-animation 2s infinite` }}>
                            <SvgUse id="cg-logo" width="128px" height="128px" />
                        </div>
                        <div style={{ maskSize: "500%", maskImage: `linear-gradient(to right, transparent 20%, white 30%, white 70%, transparent 80%, transparent 150%)`, zIndex: 3, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, strokeWidth: "2px", stroke: "var(--palette-primary-500)", strokeLinecap: "round", strokeLinejoin: "round", animation: `stroke-width-animation 2s infinite` }}>
                            <SvgUse id="cg-logo" width="128px" height="128px" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}