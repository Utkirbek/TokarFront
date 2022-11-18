import ErrorFallbackUI from "@components/ErrorFallbackUI";
import FallbackSkeletonUI from "@components/skeleton/FallbackSkeletonUI";
import React from "react";
import { SWRResponse } from "swr";

type Props = {
  children:
    | React.ReactComponentElement<any, { data: any }>
    | React.ReactComponentElement<any, { data: any }>[];
  query: SWRResponse;
  FallbackLoadingUI?: typeof React.Component<any> | (() => JSX.Element);
  FallbackErrorUI?: typeof React.Component<any>;
  withRenderProps?: boolean;
};

const WithLoading = (props: Props) => {
  const {
    children,
    query,
    FallbackLoadingUI = FallbackSkeletonUI,
    FallbackErrorUI = ErrorFallbackUI,
  } = props;
  const { data, error } = query;

  if (error) return <FallbackErrorUI message={query.error.message} />;
  if (!data) return <FallbackLoadingUI />;
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
