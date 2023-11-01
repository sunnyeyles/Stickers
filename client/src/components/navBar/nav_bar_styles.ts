import { createStyles, rem } from '@mantine/core'

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
  }
}))
