import { Card, Button, Box } from '@mantine/core'
import { ShoppingTableItem } from '../shoppingTableItem/ShoppingTableItem'
import { getCartItems } from '../../app/features/cart/cartSlice'
import { useAppSelector, useUser } from '../../hooks/hooks'
import { useStripeCheckoutMutation } from '../../app/features/placeOrder/placeOrderApi'

export function OrderSummaryCard() {

  const cartItems = useAppSelector(getCartItems)
  const [user, loading] = useUser()
  const token = useAppSelector((state) => state.auth.token)

  const [stripeCheckout, { isLoading, isSuccess }] = useStripeCheckoutMutation()
    if (isLoading) {
        return <p>Loading...</p>
    }

  const handlePayment = async () => {
    console.log("cartItems", cartItems)
    await stripeCheckout({userId: user._id, token: token!, shoppingCart: cartItems})
  }

  return (
    <Box m="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ShoppingTableItem />
        <Button variant="light" fullWidth mt="md" radius="md">
          Paypal
        </Button>
        <Button
          variant="light"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => handlePayment()}
        >
          Debit or Credit Card
        </Button>
      </Card>
    </Box>
  )
}
