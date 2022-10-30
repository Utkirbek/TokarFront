import useUser from "@hooks/shared/useUser";
import React from "react";

type Props = {
  condition: boolean;
  children: React.ReactNode;
  hasPerm?: string | string[];
};

const If: React.FC<
  | Props
  | {
      condition?: boolean;
      hasPerm: string | string[];
      children: React.ReactNode;
    }
> = ({ children, hasPerm, condition }) => {
  const { hasPerm: hasPermission } = useUser();

  if (condition) return <>{children}</>;
  if (hasPerm) {
    if (Array.isArray(hasPerm)) {
      if (hasPerm.some((perm) => hasPermission(perm))) {
        return <>{children}</>;
      }
    } else if (hasPermission(hasPerm)) {
      return <>{children}</>;
    }
  }

  return null;
};

export default If;
