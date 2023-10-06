import { Card, Text, Badge, Button, Box, Grid, Title } from '@mantine/core'
import { ReactNode } from 'react'
import { ShoppingCartItem } from '../shoppingCartItem/ShoppingCartItem'
import frogWaterfall from '../../assets/frog_waterfall.png'

interface IOrderSummaryCard {
  amountTotal: string
  shippingCost: string | ReactNode
}
const items = ['1', '2', '3', '4']

export function OrderSummaryCard({
  amountTotal,
  shippingCost,
}: IOrderSummaryCard) {
  return (
    <Box>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>Order Summary</Title>

        {items.map((item, index) => {
          return (
            <ShoppingCartItem
              image={frogWaterfall}
              itemName="Frog Waterfall"
              alt="Frog Waterfall"
              itemPrice="$13.95"
            />
          )
        })}
        <Grid p="md">
          <Grid.Col span={6}>
            <Text sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              Shipping
            </Text>
          </Grid.Col>
          <Grid.Col
            span={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {shippingCost}
          </Grid.Col>
        </Grid>
        <Box>
          <Grid p="md">
            <Grid.Col
              span={6}
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              Total
            </Grid.Col>
            <Grid.Col span={6}>
              <Text sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {amountTotal}
              </Text>
            </Grid.Col>
          </Grid>
        </Box>

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
