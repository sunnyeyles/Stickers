import { ActionIcon, Grid, Button, Stack, Text, Title, Paper, rem } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react"
import { itemStyles } from "./item_styles"
import { Link, useParams } from "react-router-dom"
import { useGetItemByIdQuery } from "../../app/features/items/itemsApiSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select } from "../../components/form/custom_input_fields/selectInput/SelectInput";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";

type FormType = {
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

    const onSubmit: SubmitHandler<FormType> = async (itemAmount: FormType) => {
        console.log("itemAmount:", itemAmount)
    };

    const generateNumOfItems = (): void => {
        const amountFromDB: number = parseInt(item.item.numOfItems)

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
                        <Stack pl="md">
                            <Link to="/products">
                                <ActionIcon aria-label="Shopping Cart Icon">
                                    <IconArrowBack style={{ width: rem(25), height: rem(25) }} />
                                </ActionIcon>
                            </Link>
                            <Text size="lg" fw="bold" className={classes.arrowBackText}>back to products</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Paper my={rem(60)}>
                            <Title>{item?.item.itemName}</Title>
                            <Grid justify="space-between" align="center">
                                <Grid.Col xs={10} sm={5}>
                                    <img src={item.imageUrl} alt="frog waterfall" width="100%" height="auto"></img>
                                </Grid.Col>
                                <Grid.Col xs={10} sm={6}>
                                    <Text mt={rem(30)} fw="bold">€ 0,99</Text>
                                    <Text fs="italic" mt={rem(10)}>{item?.item.itemCategory}</Text>
                                    <Text mt={rem(20)} mb={rem(20)}>{item?.item.itemDescription}</Text>
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


