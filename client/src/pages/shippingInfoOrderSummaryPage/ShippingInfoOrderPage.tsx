import { Grid, Box, Badge } from '@mantine/core'

import { OrderSummaryCard } from '../../components/orderSummaryCard/OrderSummaryCard'
import { ShoppingCartItem } from '../../components/shoppingCartItem/ShoppingCartItem'
import { ShippingInfoForm } from '../../components/shippingInfoForm/ShippingInfoForm'
export const ShippingInfoOrderPage = () => {
  return (
    <Grid>
      <Grid.Col span={6}>
        <ShippingInfoForm />
      </Grid.Col>
      <Grid.Col span={6}>
        <Box>
          <OrderSummaryCard
            amountTotal="$13.50"
            shippingCost={<Badge size="lg">FREE</Badge>}
          />
        </Box>
      </Grid.Col>
    </Grid>
  )
}
