import { MantineProvider } from "@mantine/core";
import { ReactNode, useState } from "react";

interface IMainTheme {
  children: ReactNode;
}

export const MainTheme = ({ children }: IMainTheme) => {
  // this example is with useState(), we would use redux to hold the theme state in practice
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // fancy looking mantine component we can use for the toggle button: https://v3.mantine.dev/core/switch/
  // for now we can just keep the default mantine dark theme, maybe tweak it slightly at the end, probably don't even need to though

  // simple function to toggle between light/dark theme
  // the function will trigger onClick()
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      inherit
      theme={{
        colorScheme: isDarkTheme ? "dark" : "light",
        fontFamily: "monospace",
        colors: {
          // declare colors for consistency, colors will go from lightest to darkest
          primary: [
            "#f7e3cb",
            "#f5901c",
            "#B14630",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
          ],
          secondary: [
            "#94c7c0",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
            "#FFF",
          ],
        },

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
        // custom styled deafult components now use the theme colors, this will help with maintainability
        components: {
          Button: {
            styles: (theme) => ({
              root: {
                "&:focus-within": {
                  backgroundColor: theme.colors.primary[1],
                },
                "&:hover": {
                  backgroundColor: theme.colors.primary[2],
                },
                backgroundColor: theme.colors.primary[1],
                color: "white",
              },
            }),
          },

          Input: {
            defaultProps: {
              variant: "filled",
            },

            styles: (theme) => ({
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.primary[1],
                },
                backgroundColor: theme.colors.primary[0],
                boxShadow: `5px 5px ${theme.colors.primary[1]}`,
              },
            }),
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};
