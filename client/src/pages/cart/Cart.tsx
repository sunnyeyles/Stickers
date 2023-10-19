import { Badge, Grid, Input, Table, Title } from "@mantine/core"
import { ArrowBack } from "../../components/backToArrow/ArrowBack"
import { Item } from "../../components/shoppingTableItem/ShoppingTableItem"
import { cartStyles } from "./cart_styles"
import frogWaterfall from '../../assets/frog_waterfall.png'
import { IconChevronDown } from '@tabler/icons-react'

export const Cart = () => {
    const { classes } = cartStyles()

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
    ))

    return (
        <>
            <Grid>
                <Grid.Col xs={2} sm={2}>
                    <ArrowBack />
                </Grid.Col>
                <Grid.Col xs={8} sm={8} lg={5}>
                    <Title>Shopping Cart</Title>
                    <Table>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Grid.Col>
                <Grid.Col xs={8} offsetXs={2} sm={8} offsetSm={2} lg={5} offsetLg={0}>
                    <Table className={classes.table} striped highlightOnHover>
                        <tbody>
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
                </Grid.Col>

            </Grid>
        </>
    )
}

