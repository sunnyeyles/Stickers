import { Card, Divider, Grid, Group, Text, Title } from '@mantine/core'
import Ducks from '../../assets/two_ducks_with_hat.png'
import { useGetAllOrdersFromUserQuery } from '../../app/features/placeOrder/placeOrderApi'
import { selectUser } from '../../app/features/users/userSlice'
import { useAppSelector } from '../../hooks/hooks'

export function MyOrders() {
  const user: any = useAppSelector(selectUser)
  const { data: orders } = useGetAllOrdersFromUserQuery(user?._id)
  console.log("Orders", orders)
  console.log("user", user)

  return (
    <>
      <Title mb="lg">My Orders</Title>
      {orders?.map((order) =>
      (
        <Card key={order._id} mb="lg" shadow="sm" padding="lg" radius="md" withBorder>
          <Group>
            <Title>customer name: {order.shipping.name}</Title>
            <Title>Order number: {order.paymentIntentId}</Title>
            <Text>Order date:</Text>
            <Text>Payment method: Credit Card</Text>
          </Group>

          {order.products.map((product) => (
            <>
              <Grid key={product._id} mt={60}>
                <Grid.Col sm={4}>
                  <img src={Ducks} alt="Duck" width="100%" height="auto" />
                </Grid.Col>
                <Grid.Col sm={4}>
                  <Text>{product.itemName}</Text>
                  <Text>quantity: {product.quantity}</Text>
                </Grid.Col>
                <Grid.Col sm={4}>
                  <Text align='right'>{product.itemPrice}</Text>
                </Grid.Col>
              </Grid>
            </>
          ))}
          <Divider my="sm" /><Grid mt={20}>
            <Grid.Col sm={8}></Grid.Col>
            <Grid.Col sm={2}>
              <Text>Subtotal:</Text>
              <Text>Delivery:</Text>
              <Text weight={"bold"}>Total:</Text>
            </Grid.Col>
            <Grid.Col sm={2}>
              <Text align='right'>{(order.subtotal / 100).toFixed(2)}</Text>
              <Text align='right'>0.00</Text>
              <Text weight={"bold"} align='right'>{(order.total / 100).toFixed(2)}</Text>
            </Grid.Col>
          </Grid>
          <Divider my="sm" />
          <Grid mt={20}>
            <Grid.Col sm={6}>
              <Title>Delivery address</Title>
              <Text>Name</Text>
              <Text>Street Nr.</Text>
              <Text>Post Code, City, Country</Text>
            </Grid.Col>
            <Grid.Col sm={6}>
              <Title>Billing address</Title>
              <Text>Name</Text>
              <Text>Street Nr.</Text>
              <Text>Post Code, City, Country</Text>
            </Grid.Col>
          </Grid>
        </Card>
      )
      )}
    </>
  )
}
