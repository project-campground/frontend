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
import { FormattedMessage } from 'react-intl';
import { SessionProvider } from './session';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FormattedMessage id="home.download" />,
    },
  ]);

  return (
    <>
      <ColorSchemeScript />
      <MantineProvider>
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
