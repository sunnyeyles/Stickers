import {
  Input,
  Table,
  Badge
} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import frogWaterfall from '../../assets/frog_waterfall.png'
import { shoppingTableStyles } from './shopping_table_styles'

export interface Item {
  itemId: string
  itemImage: string
  itemName: string
  itemAmount: string
  itemPrice: string
}

export const ShoppingTableItem = () => {

  const { classes } = shoppingTableStyles()

  const elements: Item[] = [
    { itemId: "1", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
    { itemId: "2", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
    { itemId: "3", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
    { itemId: "4", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
  ];

  const rows = elements.map((element) => (
    <tr key={element.itemId}>
      <td>
        <img src={element.itemImage} alt="frog waterfall" width="100%" height="auto" />
      </td>
      <td>{element.itemName}</td>
      <td className={classes.itemAmount}>
        <Input
          component="select"
          rightSection={<IconChevronDown size={14} stroke={1.5} />}
          pointer
          mt="md"
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </Input>
      </td>
      <td className={classes.itemPrice}>{element.itemPrice}</td>
    </tr>
  ));

  return (
    <Table className={classes.table} striped highlightOnHover>
      <tbody>
        {rows}
        <tr>
          <td>Shipping</td>
          <td></td>
          <td></td>
          <td className={classes.itemPrice}><Badge size="lg">FREE</Badge></td>
        </tr>
        <tr className={classes.total}>
          <td>Total</td>
          <td></td>
          <td></td>
          <td className={classes.itemPrice}>$ 100</td>
        </tr>
      </tbody>
    </Table>
  )
}
