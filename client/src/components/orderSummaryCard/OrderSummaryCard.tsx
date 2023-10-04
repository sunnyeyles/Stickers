import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Box,
  Grid,
  Title,
  NativeSelect,
  SimpleGrid,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useStyles } from './order_summary_styles'

import TwoDucks from '../../assets/frog_waterfall.png'

const numOfItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

function ItemCard() {
  const { classes } = useStyles()
  const matches = useMediaQuery('(max-width: 450px)')
  return (
    <Card sx={{ border: '2px solid black' }}>
      <Grid p="md">
        <Grid.Col span={{ sm: 4 }} m="sm">
          <Image src={TwoDucks} alt="Your Image" width="100%" height="auto" />
        </Grid.Col>
        <Grid.Col span={4} p="lg">
          <Title>3 Froggos</Title>

          <NativeSelect mt="md" placeholder="Native select" data={numOfItems} />
        </Grid.Col>
        <Grid.Col span={4} p="lg">
          <Title>$13.90</Title>
        </Grid.Col>
      </Grid>
    </Card>
  )
}

export function OrderSummaryCard() {
  const { classes } = useStyles()

  return (
    <Box>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section></Card.Section>

        <Group mt="md" mb="xs"></Group>

        <ItemCard />
        <ItemCard />
        <Grid>
          <Grid.Col>
            <Text>Total</Text>
          </Grid.Col>
          <Grid.Col>
            <Text>$14.89</Text>
          </Grid.Col>
        </Grid>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Paypal
        </Button>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Debit or Credit Card
        </Button>
      </Card>
    </Box>
  )
}
