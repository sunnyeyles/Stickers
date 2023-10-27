import { ActionIcon, Badge, Button, Flex, Grid, Table, Title, rem } from "@mantine/core"
import { ArrowBack } from "../../components/backToArrow/ArrowBack"
import { cartStyles } from "./cart_styles"
import { IconX } from '@tabler/icons-react'
import { useAppSelector } from "../../hooks/hooks"
import { getCartItems, getTotalPrice, removeItemFromCart } from "../../app/features/cart/cartSlice"
import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { Select } from "../../components/form/custom_input_fields/selectInput/SelectInput"
import { useEffect, useState } from "react"

export type AmountType = {
    amount: string | number
}

interface ISelectData {
    value: string,
    label: string
}

export const Cart = () => {
    const { classes } = cartStyles()

    const cartItems = useAppSelector(getCartItems)

    console.log("Cart Items:", cartItems)
    const [numOfAddedItems, setNumOfAddedItems] = useState<ISelectData[]>([])
    const totalPrice = useAppSelector(getTotalPrice)
    const dispatch = useDispatch()

    const removeFromCart = (itemId: string) => {
        dispatch(removeItemFromCart(itemId))
    }

    useEffect(() => {
       
            
            const options: ISelectData[] = []
            for (let i: number = 0; i < cartItems[0]?.quantity; i++) {
                const option: ISelectData = {
                    value: `${i + 1}`,
                    label: `${i + 1}`,
                };
                options.push(option);
            }

            setNumOfAddedItems(options);
        
    }, [cartItems]);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            amount: ""
        }
    })

    const onSubmit: SubmitHandler<AmountType> = async (selectedItemAmount: AmountType) => {
        console.log("selectedItemAmount:", selectedItemAmount)
    };

    const rows = cartItems.map((item) => (
        <tr key={item._id}>
            <td>
                <img className={classes.image} src={item.imagePath} alt="frog waterfall" width="100%" height="auto" />
            </td>
            <td>{item.itemName}</td>
            <td className={classes.itemAmount}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Select
                        name="amount"
                        control={control}
                        label="Quantity"
                        data={[cartItems[0]?.quantity.toString()]}
                    />
                    <Button type="submit" mt={rem(40)}>Add to cart</Button>
                </form>
            </td>
            <td className={classes.itemPrice}>{item.itemPrice}</td>
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

