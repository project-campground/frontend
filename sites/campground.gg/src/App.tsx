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
import { IntlProvider } from './i18n';
import LandingIndex from './routes/landing/LandingIndex';
import { CssBaseline, CssVarsProvider, StyledEngineProvider } from '@mui/joy';
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import { theme } from "components";
import Downloads from "./routes/landing/Downloads";
import Soon from "./routes/Soon";
import Features from "./routes/landing/Features";
import NotFound from "./routes/NotFound";


function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />
    },
    {
      path: "/",
      element: <LandingIndex />
    },
    {
      path: "/downloads",
      element: <Downloads />
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
            <IntlProvider>
              <RouterProvider router={router} />
            </IntlProvider>
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  )
}

export default App
