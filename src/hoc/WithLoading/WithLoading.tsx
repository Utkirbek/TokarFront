import ErrorFallbackUI from "@components/ErrorFallbackUI";
import FallbackLoadingUi from "@components/FallBackLoadingUi";
import React from "react";
import { SWRResponse } from "swr";

type Props = {
  children:
    | React.ReactComponentElement<any, { data: any }>
    | React.ReactComponentElement<any, { data: any }>[];
  query: SWRResponse;
  FallbackLoadingUI?: typeof React.Component;
  FallbackErrorUI?: typeof React.Component<any>;
  withRenderProps?: boolean;
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
  if (props.withRenderProps) {
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { data: query.data });
      }
      return child;
    });

    return <>{childrenWithProps}</>;
  }

  return <>{children}</>;
};

export default WithLoading;
