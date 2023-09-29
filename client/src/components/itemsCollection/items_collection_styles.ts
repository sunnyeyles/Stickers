import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    section: {
        backgroundColor: theme.colors.primary[4]
    },
    container: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    title: {
        fontSize: rem(20),
        fontWeight: 900,
        lineHeight: 1.1,
        textAlign: 'center',
        paddingBottom: '20px',
    },
    itemTitle: {
        color: theme.black,
        fontSize: rem(10),
        fontWeight: 900,
        lineHeight: 1.1,
        textAlign: 'center',
        paddingTop: '20px',
    
        [theme.fn.smallerThan('sm')]: {
          fontSize: rem(15),
          lineHeight: 1.2,
        },
    
        [theme.fn.smallerThan('xs')]: {
          fontSize: rem(15),
          lineHeight: 1.3,
        },
      },
}));