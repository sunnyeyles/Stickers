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
        colorScheme: "light",
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
            defaultProps: {
            },
            styles: {
              root: {
                '&:focus-within': {
                  backgroundColor: "#f5901c",
                },
                '&:hover': {
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
              variant: 'filled',
            },
            styles: {
              input: { 
                '&:focus-within': {
                  borderColor: "#f5901c",
                },
                backgroundColor: "#f7e3cb",
                boxShadow: "5px 5px #f5901c"
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
