import {
  Card,
  Image,
  Text,
  Grid,
  NativeSelect,
  AspectRatio,
  Input,
} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

interface IShoppingCartItem {
  image: string
  alt: string
  itemName: string
  // this will come from the db as a number and then be turned into a string when it is passed as a prop to the item
  itemPrice: string
  // need to work how the best way to figure this out, the NativeSelect component only takes an array of string and not and array of numbers...
}
export function ShoppingCartItem({
  image,
  alt,
  itemName,
  itemPrice,
}: IShoppingCartItem) {
  return (
    <Card sx={{ border: '2px solid red' }}>
      <Grid>
        <Grid.Col span="auto" mx="auto">
          <AspectRatio ratio={1.25 / 1} maw={250}>
            <Image src={image} alt={alt} />
          </AspectRatio>
        </Grid.Col>
        <Grid.Col span={4} mx="auto" p="xl">
          <Text>{itemName}</Text>

          <Input
            component="select"
            rightSection={<IconChevronDown size={14} stroke={1.5} />}
            pointer
            mt="md"
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </Input>
        </Grid.Col>
        <Grid.Col span="auto" p="xl">
          <Text fw={600} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {itemPrice}
          </Text>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
