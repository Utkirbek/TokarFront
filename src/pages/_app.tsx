import "../styles/globals.css";

import ProtectedRoute from "@components/smart/ProtectedRoute";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ProtectedRoute router={router}>
      <SWRConfig>
        <Component {...pageProps} />
      </SWRConfig>
    </ProtectedRoute>
  );
}

export default MyApp;
