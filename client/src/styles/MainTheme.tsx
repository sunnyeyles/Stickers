import { MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'
import { Button } from './button'
import { Input } from './input'
import { ActionIcon } from './actionIcon'
import { Container } from './container'
interface IMainTheme {
  children: ReactNode
}

export const MainTheme = ({ children }: IMainTheme) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      inherit
      theme={{
        fontFamily: 'Noto Sans',
        colorScheme: 'light',
        primaryColor: 'orange',

        colors: {
          orange: [
            '#fff4e2',
            '#ffe9cc',
            '#ffd09c',
            '#fdb766',
            '#fca13a',
            '#fb931d',
            '#fc8c0c',
            '#e17900',
            '#c86a00',
            '#ae5a00',
          ],
          'ocean-blue': [
            '#7AD1DD',
            '#5FCCDB',
            '#44CADC',
            '#2AC9DE',
            '#1AC2D9',
            '#11B7CD',
            '#09ADC3',
            '#0E99AC',
            '#128797',
            '#147885',
          ],
        },

        // declare colors for consistency, colors will go from lightest to darkest
        // primary: [
        //   '#f7e3cb',
        //   '#f5901c',
        //   '#B14630',
        //   '#347c72',
        //   '#77bfb4',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        // ],
        // secondary: [
        //   '#94c7c0',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        //   '#FFF',
        // ],
        // },

        shadows: {
          md: '1px 1px 3px rgba(0, 0, 0, .25)',
          xl: '5px 5px 3px rgba(0, 0, 0, .25)',
        },

        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: {
            h1: { fontSize: '2rem' },
          },
        },
        breakpoints: {
          xs: '30em',
          sm: '48em',
          md: '64em',
          lg: '74em',
          xl: '90em',
        },
        components: {
          Button,
          Input,
          ActionIcon,
          Container
        },
      }}
    >
      {children}
    </MantineProvider>
  )
}
