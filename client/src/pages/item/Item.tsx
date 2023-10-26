import { Grid, Button, Text, Title, Paper, rem } from "@mantine/core";
import { itemStyles } from "./item_styles"
import { useParams } from "react-router-dom"
import { useGetItemByIdQuery } from "../../app/features/items/itemsApiSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select } from "../../components/form/custom_input_fields/selectInput/SelectInput";
import { useEffect, useState } from "react";
import { ArrowBack } from "../../components/backToArrow/ArrowBack";
import { useDispatch } from "react-redux";
import { CartItem, addItemToCart } from "../../app/features/cart/cartSlice";
import { IItemResponse } from "../../app/api/types";

export type AmountType = {
    amount: string
}

interface ISelectData {
    value: string,
    label: string
}

export const Item = () => {

    const { classes } = itemStyles()
    const { id } = useParams<{ id: string }>()
    const idParam: string = id ?? ""
    const { data: item, isSuccess } = useGetItemByIdQuery(idParam)
    const [numOfItems, setNumOfItems] = useState<ISelectData[]>([])
    const dispatch = useDispatch()


    useEffect(() => {
        if (item) {
            generateNumOfItems()
        }
    }, [item]);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            amount: "",
        }
    })

    const onSubmit: SubmitHandler<AmountType> = async (itemAmount: AmountType) => {
        console.log("itemAmount:", itemAmount)
        dispatch(addItemToCart({ addedItem: item!, selectedAmount: itemAmount }))
    };

    const generateNumOfItems = (): void => {
        const amountFromDB: number = item!.numOfItems

        const options: ISelectData[] = []
        for (let i: number = 0; i < amountFromDB; i++) {
            const option: ISelectData = {
                value: `${i + 1}`,
                label: `${i + 1}`,
            };
            options.push(option);
        }

        setNumOfItems(options);
    }

    if (isSuccess) {

        return (
            <>
                <Grid>
                    <Grid.Col span={2}>
                        <ArrowBack />
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Paper my={rem(60)}>
                            <Title>{item?.itemName}</Title>
                            <Grid justify="space-between" align="center">
                                <Grid.Col xs={10} sm={5}>
                                    <img src={item?.imagePath} alt="frog waterfall" width="100%" height="auto"></img>
                                </Grid.Col>
                                <Grid.Col xs={10} sm={6}>
                                    <Text mt={rem(30)} fw="bold">€ 0,99</Text>
                                    <Text fs="italic" mt={rem(10)}>{item?.itemCategory}</Text>
                                    <Text mt={rem(20)} mb={rem(20)}>{item?.itemDescription}</Text>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Select
                                            name="amount"
                                            control={control}
                                            label="Quantity"
                                            placeholder="Choose amount"
                                            data={numOfItems.length === 0 ? [{ value: "0", label: "No items available" }] : numOfItems}
                                            className={classes.selectAmount}
                                        />
                                        <Button type="submit" mt={rem(40)}>Add to cart</Button>
                                    </form>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </>
        )
    }
}


