import { ActionIcon, Badge, Button, Flex, Grid, NumberInput, Table, Title, rem } from "@mantine/core"
import { ArrowBack } from "../../components/backToArrow/ArrowBack"
import { cartStyles } from "./cart_styles"
import { IconX } from '@tabler/icons-react'
import { useAppSelector } from "../../hooks/hooks"
import { changeQuantityItemFromCart, getCartItems, getTotalPrice, removeItemFromCart } from "../../app/features/cart/cartSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

export const Cart = () => {
    const { classes } = cartStyles()
    const [itemAmount, setItemAmount] = useState<number>(0)
    const [maxAmountOfItems, setMaxAmountOfItems] = useState<number>(0)
    const cartItems = useAppSelector(getCartItems)
    console.log("Cart Items:", cartItems)

    const totalPrice = useAppSelector(getTotalPrice)
    const dispatch = useDispatch()

    useEffect(() => {
        //sets the selected amount
        if (cartItems.length > 0) {
            cartItems.forEach(element => {
                setItemAmount(element.quantity)
                handleMaxAmountOfItems(element)
            })
        }
    }, [cartItems])

    const removeFromCart = (itemId: string) => {
        dispatch(removeItemFromCart(itemId))
    }

    const handleItemAmountChange = (item: any, selectedItemAmount: number) => {
        console.log("selectedItemAmount", selectedItemAmount)
       setItemAmount(selectedItemAmount);
       dispatch(changeQuantityItemFromCart({ addedItem: item!, amount: selectedItemAmount }))
    }

    const handleMaxAmountOfItems = (item: any) => {
        let restItems = 0
        const id = item._id
        const itemIndex = cartItems.findIndex(item => item._id === id)
        console.log("itemIndex", itemIndex)
        if ((itemIndex !== -1 && cartItems.length === 0)) {
            console.log("maxAmountOfItems",maxAmountOfItems)
            console.log("itemAmount",itemAmount)
            restItems = maxAmountOfItems - itemAmount
            setMaxAmountOfItems(restItems)
            console.log("rest Imtems:", restItems)
            // if(restItems <= 0){
            //     setDisabled(true)
            //     setItemAmount(0)
            // }
        } 
        else if(itemIndex !== -1 && cartItems.length !== 0 ) {
            console.log("item!.numOfItems",item!.numOfItems)
            console.log("itemAmount",itemAmount)
            // restItems = item!.numOfItems - itemAmount
            console.log("rest Imtems:", restItems)
            setMaxAmountOfItems(item!.numOfItems)
            // if(restItems <= 0){
            //     setDisabled(true)
            //     setItemAmount(0)
            // }
        }
    }

    const rows = cartItems.map((item) => (
        <tr key={item._id}>
            <td>
                <img className={classes.image} src={item.imagePath} alt="frog waterfall" width="100%" height="auto" />
            </td>
            <td>{item.itemName}</td>
            <td className={classes.itemAmount}>
                <NumberInput
                    key={item._id}
                    value={0 ? item.quantity : itemAmount}
                    max={maxAmountOfItems}
                    min={0}
                    onChange={(amount) => handleItemAmountChange(item, Number(amount))}
                />
            </td>
            <td className={classes.itemPrice}>Price of one item: {item.itemPrice}</td>
            <td className={classes.itemPrice}>Total Price of {item?.quantity}:  {item?.quantity * Number(item?.itemPrice)}</td>
            <td>
                <ActionIcon aria-label="Remove Item from Cart">
                    <IconX onClick={() => removeFromCart(item._id)} />
                </ActionIcon>
            </td>
        </tr>
    ))

    return (
        <>
            <Title mb={rem(50)} ml={rem(150)}>Shopping Cart</Title>
            <Grid>
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
                                <td className={classes.itemPrice}>{totalPrice}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Flex justify="center" mt={rem(50)}>
                        <Button size="md" type="submit">
                            Checkout
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </>
    )
}

