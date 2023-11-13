import { createStyles, UnstyledButton, rem } from '@mantine/core'

export const navBarStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    height: rem(56),

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
    },
  },
  items: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    [theme.fn.smallerThan('md')]: {
      gap: '1rem',
    },
    gap: '2rem',
  },
  textBox: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  itemAmount: {
    position: 'relative',
    right: '1rem',
    borderRadius: '50%',
    padding: '5px',
    background: theme.colors.orange[5],
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  avatar: {
    border: `1px solid ${theme.colors.orange[5]}`,
  },
  dropDownMenu: {
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '2rem',
    marginBottom: '1rem',
    borderBottom: `${rem(0.1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[5]
    }`,
  },
}))
