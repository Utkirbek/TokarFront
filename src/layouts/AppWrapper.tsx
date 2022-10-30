import { SpotlightProvider } from "@mantine/spotlight";
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
      onQueryChange={(query) => console.log(query)}
    >
      {children}
    </SpotlightProvider>
  );
};

export default AppWrapper;
