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

        components: {
          //Button styles
          Button: {
            defaultProps: {},
            styles: {
              root: {
                "&:focus-within": {
                  backgroundColor: "#f5901c",
                },
                "&:hover": {
                  backgroundColor: "#B14630",
                },
                // Add custom styles here
                backgroundColor: "#f5901c",
                color: "white",
                // border radiuses set, you can now pass the mantine Button component the radius prop(radius="") "sm", "md", "lg" respectively
                // radius: {
                //   sm: "4px",
                //   md: "8px",
                //   lg: "12px",
                // },
              },
            },
          },

          Input: {
            defaultProps: {
              variant: "filled",
            },
            styles: {
              input: {
                "&:focus-within": {
                  borderColor: "#f5901c",
                },
                backgroundColor: "#f7e3cb",
                boxShadow: "5px 5px #f5901c",
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
