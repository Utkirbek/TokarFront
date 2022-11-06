import { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { SpotlightProvider } from "@mantine/spotlight";
import { useNavActions } from "@services/spotlight";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const navActions = useNavActions();

  return (
    <SpotlightProvider
      shortcut={["mod + P", "mod + K", "/"]}
      actions={navActions}
      nothingFoundMessage="Hech narsa topilmadi"
      translate="yes"
      searchPlaceholder="Qidirish"
      highlightQuery
      sx={{
        colorScheme: "dark",
      }}
    >
      {children}
    </SpotlightProvider>
  );
};

export default AppWrapper;
