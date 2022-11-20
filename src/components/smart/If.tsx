import useUser from "@hooks/shared/useUser";
import React from "react";

type Props = {
  condition: boolean;
  children: React.ReactNode;
  hasPerm?: string | string[] | "no-check";
  elseChildren?: React.ReactNode;
};

const If: React.FC<
  | Props
  | {
      condition?: boolean;
      hasPerm: string | string[];
      children: React.ReactNode;
      elseChildren?: React.ReactNode;
    }
> = ({ children, hasPerm, condition, elseChildren }) => {
  const { hasPerm: hasPermission } = useUser();

  if (condition) return <>{children}</>;
  if (hasPerm) {
    if (hasPerm === "no-check") return <>{children}</>;
    else if (Array.isArray(hasPerm)) {
      if (hasPerm.some((perm) => hasPermission(perm))) {
        return <>{children}</>;
      }
    } else if (hasPermission(hasPerm)) {
      return <>{children}</>;
    }
  }

  return elseChildren ? <>{elseChildren}</> : null;
};

export default If;
