import { getCookie } from "cookies-next";
import React, { ReactElement } from "react";

import useUser from "@/hooks/shared/useUser";
import { appRoutes } from "@/utils/constants";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute: React.FC<{ router: any; children: ReactElement }> = ({
  router,
  children,
}) => {
  const { isLoggedIn } = useUser();
  const token = getCookie("token");

  let unprotectedRoutes = [appRoutes.login];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isLoggedIn && pathIsProtected && !token) {
    router.push(appRoutes.login);
  }

  return children;
};

export default ProtectedRoute;
