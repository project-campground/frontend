// import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import "@fontsource/nunito-sans/500.css";
import "@fontsource/nunito-sans/500-italic.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/700-italic.css";
import "@fontsource/nunito-sans/900.css";
import "@fontsource/nunito-sans/900-italic.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/700.css";
import './App.scss'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import { IntlProvider } from './i18n';
import { SessionProvider } from './session';
import Index from './routes/Index';
import { CssBaseline, CssVarsProvider, StyledEngineProvider } from '@mui/joy';
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import theme from "./theme";
import Downloads from "./routes/Downloads";
import Soon from "./routes/Soon";
import Features from "./routes/Features";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";
import ResetPassword from "./routes/ResetPassword";


function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />
    },
    {
      path: "/",
      element: <Index />
    },
    {
      path: "/downloads",
      element: <Downloads />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: "/blog",
      element: <Soon />
    },
    {
      path: "/docs/features",
      element: <Features />
    },
    {
      path: "/docs",
      element: <Soon />
    },
    {
      path: "/docs/api",
      element: <Soon />
    },
  ]);

  return (
    <>
      <InitColorSchemeScript defaultMode="dark" />
      <StyledEngineProvider injectFirst>
        <CssVarsProvider theme={theme} defaultMode="dark" defaultColorScheme="dark">
          <CssBaseline />
          <SessionProvider>
            <IntlProvider>
              <RouterProvider router={router} />
            </IntlProvider>
          </SessionProvider>
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  )
}

export default App
