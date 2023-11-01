import { ActionIcon, Badge, Button, Flex, Grid, Group, MantineTheme, Modal, NumberInput, Portal, Table, Title, rem } from "@mantine/core"
import { ArrowBack } from "../../components/backToArrow/ArrowBack"
import { cartStyles } from "./cart_styles"
import { IconX } from '@tabler/icons-react'
import { useAppSelector, useUser } from "../../hooks/hooks"
import { changeQuantityItemFromCart, getCartItems, getTotalPrice, removeItemFromCart } from "../../app/features/cart/cartSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useVerifyCheckoutMutation } from "../../app/features/placeOrder/placeOrderApi"
import { CartItem } from "../../app/api/types"
import { notifications } from '@mantine/notifications'
import { Link } from "react-router-dom"
import dogSleeping from '../../assets/dog_sleeping.png'

export const Cart = (theme: MantineTheme) => {
    const { classes } = cartStyles()
    const [itemAmount, setItemAmount] = useState<number>(0)
    const [maxAmountOfItems, setMaxAmountOfItems] = useState<number>(0)
    const cartItems = useAppSelector(getCartItems)
    const totalPrice = useAppSelector(getTotalPrice)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [user, loading] = useUser()
    console.log("userID", user?._id)

    const [verifyCheckout, { isLoading, isSuccess }] = useVerifyCheckoutMutation()
    if (isLoading) {
        return <p>Loading...</p>
    }

    useEffect(() => {
        //sets the quantity from item single page
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
        setItemAmount(selectedItemAmount);
        dispatch(changeQuantityItemFromCart({ addedItem: item!, amount: selectedItemAmount }))
    }

    const handleMaxAmountOfItems = (item: any) => {
        let restItems = 0
        const id = item._id
        const itemIndex = cartItems.findIndex(item => item._id === id)
        if (itemIndex !== -1 && cartItems.length === 0) {
            restItems = maxAmountOfItems - itemAmount
            setMaxAmountOfItems(restItems)
        }
        if (itemIndex !== -1 && cartItems.length !== 0) {
            setMaxAmountOfItems(item!.numOfItems)
        }
    }

    const checkOut = async (cartItems: CartItem[]) => {
        console.log("cartItems:", cartItems)
        //console.log("userID:",user._id)
        if (user?._id !== undefined) {
            if (cartItems.length === 0) {
                notifications.show({
                    title: 'Sorry',
                    message: 'Your cart is empty'
                })
            } else {
                //await verifyCheckout(cartItems)
            }
        } else {
            openModal()
        }
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
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
                    value={item.quantity}
                    max={item.numOfItems}
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
            <Portal>
                {isModalOpen && (
                    <Modal
                        opened={isModalOpen}
                        onClose={closeModal}
                        title="log in to proceed to checkout">
                        <Group position="center">
                            <img src={dogSleeping} alt="dog-sleeping" width="50%" height="auto" />
                            <Button component={Link} to="/login" radius="xl">
                                Login
                            </Button>
                        </Group>
                    </Modal>
                )}
            </Portal>
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
                        <Button
                            onClick={() => { checkOut(cartItems) }}
                            size="md"
                            type="button"
                        >
                            Checkout
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </>
    )
}

