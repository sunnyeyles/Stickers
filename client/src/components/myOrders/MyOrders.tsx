import { Card, Grid, List, Text, Title } from '@mantine/core'

export function MyOrders() {
  return (
    <>
    <Title mb="lg">My Orders</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid justify="space-around" align="center">
            <Grid.Col sm={3}>
                <Text>12345678fghjfhdgjhf</Text>
            </Grid.Col>
            <Grid.Col sm={3}>
                <Text>Dec 23 2022</Text>
            </Grid.Col>
            <Grid.Col sm={3}>
                <Text>€ 14,99</Text>
            </Grid.Col>
            <Grid.Col sm={3}>
                <List>
                    <List.Item>
                        10 x "3 Froggos"
                    </List.Item>
                    <List.Item>
                        1 x "Frog Waterfall"
                    </List.Item>
                </List>
            </Grid.Col>
        </Grid>
      </Card>
    </>
    
  )
}
