import {
  Accordion,
  Button,
  Divider,
  Grid,
  Paper,
  Text,
  Title,
  rem,
} from '@mantine/core'
import { useStyles } from './profile_styles'
import { UpdatePassword } from '../../components/form/updatePassword/UpdatePassword'
import { ShippingInfoForm } from '../../components/form/shippingInfoForm/ShippingInfoForm'
import { MyOrders } from '../../components/myOrders/MyOrders'
import { UploadProfileImage } from '../../components/uploadProfileImage/UploadProfileImage'

export function Profile() {
  const { classes } = useStyles()
  return (
    <>
      <Paper className={classes.form} radius={0}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Settings
        </Title>
        <Accordion>
          <Accordion.Item value="Account">
            <Accordion.Control>Account</Accordion.Control>
            <Accordion.Panel mt={rem(10)}>
              <Paper p={rem(20)}>
                <Title mb="lg">Account</Title>
                <UploadProfileImage></UploadProfileImage>
                <Divider my="sm" />
                <UpdatePassword></UpdatePassword>
                <Divider my="sm" />
                <Grid justify="space-around" align="center">
                  <Grid.Col sm={6}>
                    <Text size="md">Danger Zone</Text>
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <Button radius="xl">Delete Account</Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Shipping Information">
            <Accordion.Control>Shipping Information</Accordion.Control>
            <Accordion.Panel mt={rem(10)}>
              <ShippingInfoForm></ShippingInfoForm>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="My Orders">
            <Accordion.Control>My Orders</Accordion.Control>
            <Accordion.Panel mt={rem(10)}>
              <MyOrders></MyOrders>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
    </>
  )
}
