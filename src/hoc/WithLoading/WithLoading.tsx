import ErrorFallbackUI from "@components/ErrorFallbackUI";
import FallbackLoadingUi from "@components/FallBackLoadingUi";
import React from "react";
import { SWRResponse } from "swr";

type Props = {
  children: React.ReactNode;
  query: SWRResponse;
  FallbackLoadingUI?: typeof React.Component;
  FallbackErrorUI?: typeof React.Component<any>;
};

const WithLoading = (props: Props) => {
  const {
    children,
    query,
    FallbackLoadingUI = FallbackLoadingUi,
    FallbackErrorUI = ErrorFallbackUI,
  } = props;

  if (query.error) return <FallbackErrorUI message={query.error.message} />;
  if (!query.data) return <FallbackLoadingUI />;
  return <>{children}</>;
};

export default WithLoading;
