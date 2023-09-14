import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

interface IMainTheme {
  children: ReactNode;
}

export const ButtonTheme = ({ children }: IMainTheme) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      inherit
      theme={{
        components: {
          Button: {
            defaultProps: {
            },
            styles: {
              root: {
                backgroundColor: "#95c7c0",
                color: "black",
              },
            },
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};
