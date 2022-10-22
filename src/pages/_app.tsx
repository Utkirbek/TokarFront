import "../styles/globals.css";

import ProtectedRoute from "@components/smart/ProtectedRoute";
import { RouterTransition } from "@components/smart/RouterTransition";
import ErrorFallback from "@layouts/ErrorFallback";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const forceUpdate = useForceUpdate();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={forceUpdate}>
      <ProtectedRoute router={router}>
        <SWRConfig>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
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
  );
}

export default MyApp;
