import { Card, Button, Box } from '@mantine/core'
import { ShoppingTableItem } from '../shoppingTableItem/ShoppingTableItem'

export function OrderSummaryCard() {
  return (
    <Box m="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ShoppingTableItem />
        <Button variant="light" fullWidth mt="md" radius="md">
          Paypal
        </Button>
        <Button variant="light" fullWidth mt="md" radius="md">
          Debit or Credit Card
        </Button>
      </Card>
    </Box>
  )
}
