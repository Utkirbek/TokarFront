import "../styles/globals.scss";

import ProtectedRoute from "@components/smart/ProtectedRoute";
import { RouterTransition } from "@components/smart/RouterTransition";
import AppWrapper from "@layouts/AppWrapper";
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
import Head from "next/head";
import Script from "next/script";
import { ErrorBoundary } from "react-error-boundary";
import { IntlProvider } from "react-intl";
import { SWRConfig } from "swr";

import en from "@/translations/en";
import uz from "@/translations/uz";

export enum Lang {
  uz = "uz",
  en = "en",
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const [activeLang] = useLocalStorage<Lang>({
    key: "lang",
    defaultValue: Lang.uz,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  const forceUpdate = useForceUpdate();

  return (
    <>
      <IntlProvider
        messages={flattenMessages(activeLang === Lang.uz ? uz : en)}
        locale={activeLang}
        defaultLocale="uz"
      >
        <Head>
          <title>Tokar savdo</title>
          <meta name="application-name" content="Store system" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Tokar store" />
          <meta
            name="description"
            content="Developed by Tespen Software Services"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />
          <meta name="author" content="Jakhongir Abdukhamidov" />
          <meta name="copyright" content="Jakhongir Abdukhamidov" />

          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json"></link>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              colorScheme,
              breakpoints: { xs: 500, sm: 800, md: 1100,  lg: 1200, xl: 1400 },
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={forceUpdate}
            >
              <AppWrapper>
                <ProtectedRoute router={router}>
                  <SWRConfig>
                    <RouterTransition />
                    <ModalsProvider>
                      <NotificationsProvider>
                        <Component {...pageProps} />
                      </NotificationsProvider>
                    </ModalsProvider>
                  </SWRConfig>
                </ProtectedRoute>
              </AppWrapper>
            </ErrorBoundary>
          </MantineProvider>
        </ColorSchemeProvider>
        <Script src="https://cdn.lordicon.com/qjzruarw.js" />
      </IntlProvider>
    </>
  );
}
export default MyApp;
