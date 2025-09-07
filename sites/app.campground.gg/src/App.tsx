import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

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
import theme from './theme';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />
    },
  ]);

  return (
    <>
      <ColorSchemeScript />
      <MantineProvider forceColorScheme="dark" theme={theme}>
        <SessionProvider>
          <IntlProvider>
            <RouterProvider router={router} />
          </IntlProvider>
        </SessionProvider>
      </MantineProvider>
    </>
  )
}

export default App
