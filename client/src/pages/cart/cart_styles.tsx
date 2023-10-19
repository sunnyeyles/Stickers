import { createStyles, rem } from '@mantine/core'

export const cartStyles = createStyles((theme) => ({
  table: {
    tableLayout: "fixed",
    width: "100%"
  },
  itemAmount: {
    width: rem(100)
  },
  itemPrice: {
    textAlign: "right",
  },
  total: {
    fontWeight: "bold"
  }
}))