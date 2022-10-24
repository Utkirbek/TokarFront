import "../styles/globals.css";

import ProtectedRoute from "@components/smart/ProtectedRoute";
import { RouterTransition } from "@components/smart/RouterTransition";
import ErrorFallback from "@layouts/ErrorFallback";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useForceUpdate, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import flattenMessages from "@utils/flattenMessages";
import type { AppProps } from "next/app";
import Script from "next/script";
import { ErrorBoundary } from "react-error-boundary";
import { IntlProvider } from "react-intl";
import { SWRConfig } from "swr";

import uz from "@/translations/uz";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const forceUpdate = useForceUpdate();

  return (
    <IntlProvider messages={flattenMessages(uz)} locale="uz" defaultLocale="uz">
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={forceUpdate}>
        <ProtectedRoute router={router}>
          <SWRConfig>
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}>
              <MantineProvider
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS>
                <RouterTransition />
                <ModalsProvider>
                  <NotificationsProvider>
                    <Component {...pageProps} />
                  </NotificationsProvider>
                </ModalsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </SWRConfig>
        </ProtectedRoute>
      </ErrorBoundary>
      <Script src="https://cdn.lordicon.com/qjzruarw.js" />
    </IntlProvider>
  );
}
export default MyApp;
