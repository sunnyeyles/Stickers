import { Badge, Button, Flex, Grid, Input, Table, Title, rem } from "@mantine/core"
import { ArrowBack } from "../../components/backToArrow/ArrowBack"
import { Item } from "../../components/shoppingTableItem/ShoppingTableItem"
import { cartStyles } from "./cart_styles"
import frogWaterfall from '../../assets/frog_waterfall.png'
import { IconChevronDown } from '@tabler/icons-react'
import { useAppSelector } from "../../hooks/hooks"
import { getCartItems, getTotalPrice, removeItemFromCart } from "../../app/features/cart/cartSlice"
import { useDispatch } from "react-redux"

export const Cart = () => {
    const { classes } = cartStyles()

    const cartItems = useAppSelector(getCartItems)
    const totalPrice = useAppSelector(getTotalPrice)
    const dispatch = useDispatch()

    const removeFromCart = (itemId: string) => {
        dispatch(removeItemFromCart(itemId))
    }

    const elements: Item[] = [
        { itemId: "1", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
        { itemId: "2", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
        { itemId: "3", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
        { itemId: "4", itemImage: frogWaterfall, itemName: "Frog Waterfall", itemAmount: '', itemPrice: "$13.95" },
    ];

    const rows = elements.map((element) => (
        <tr key={element.itemId}>
            <td>
                <img className={classes.image} src={element.itemImage} alt="frog waterfall" width="100%" height="auto" />
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
            <Title mb={rem(50)} ml={rem(150)}>Shopping Cart</Title>
            <h5>{totalPrice}</h5>
            {cartItems.map(item => (
                <div key={item._id}>
                    <span>{item.itemName}</span>
                    <span>{item.quantity}</span>
                    <button onClick={() => removeFromCart(item._id)}>Remove item from cart</button>
                </div>
            ))}
            {/*<Grid>
                <Grid.Col xs={2} sm={2} md={1}>
                    <ArrowBack />
                </Grid.Col>
                <Grid.Col xs={8} sm={8} md={5} lg={5}>
                    <Table>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Grid.Col>
                <Grid.Col xs={8} offsetXs={2} sm={8} offsetSm={2} md={5} offsetMd={1} lg={5} offsetLg={1}>
                    <Table
                        className={classes.table}
                        striped
                        highlightOnHover
                        mt={rem(20)}
                    >
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
                    <Flex justify="center" mt={rem(50)}>
                        <Button size="md" type="submit">
                            Checkout
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid> */}
        </>
    )
}

