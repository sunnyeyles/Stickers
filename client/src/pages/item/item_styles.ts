import { createStyles, rem } from '@mantine/core'

export const itemStyles = createStyles((theme) => ({
    arrowBackText: {
        writingMode: "vertical-lr",
        textOrientation: "upright",
        color: theme.colors.orange[6]
    },
    selectAmount: {
        width: rem(160)
    }
}))
