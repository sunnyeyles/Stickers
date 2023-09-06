import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

interface IMainTheme {
  children: ReactNode;
}

export const MainTheme = ({ children }: IMainTheme) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      inherit
      theme={{
        colorScheme: "dark",
        fontFamily: "monospace",

        shadows: {
          md: "1px 1px 3px rgba(0, 0, 0, .25)",
          xl: "5px 5px 3px rgba(0, 0, 0, .25)",
        },

        headings: {
          fontFamily: "Roboto, sans-serif",
          sizes: {
            h1: { fontSize: "2rem" },
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};
