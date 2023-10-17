import { Grid, Box } from '@mantine/core'
import { OrderSummaryCard } from '../../components/orderSummaryCard/OrderSummaryCard'
import { ShippingInfoForm } from '../../components/shippingInfoForm/ShippingInfoForm'

export const ShippingInfoOrderPage = () => {
  return (
    <Grid justify="space-around" gutterSm={25} gutterMd={60}>
      <Grid.Col xs={12} sm={12} lg={5}>
        <ShippingInfoForm />
      </Grid.Col>
      <Grid.Col xs={12} sm={12} lg={5}>
        <Box>
          <OrderSummaryCard />
        </Box>
      </Grid.Col>
    </Grid>
  )
}
