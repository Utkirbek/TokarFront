import { SpotlightProvider } from "@mantine/spotlight";
import useSearch from "@services/hooks/useSearch";
import { useNavActions } from "@services/spotlight";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  const navActions = useNavActions();

  return (
    <SpotlightProvider
      shortcut={["mod + P", "mod + K", "/"]}
      actions={navActions}
      nothingFoundMessage="Hech narsa topilmadi"
      translate="yes"
      searchPlaceholder="Qidirish"
      highlightQuery
    >
      {children}
    </SpotlightProvider>
  );
};

export default AppWrapper;
