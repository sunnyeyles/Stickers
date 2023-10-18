import { ActionIcon, Grid, Input, Button, Stack, Text, Title, Paper, rem } from "@mantine/core";
import { IconArrowBack, IconChevronDown } from "@tabler/icons-react"
import { itemStyles } from "./item_styles"
import dog from "../../assets/dog_happy.svg";
import { Link } from "react-router-dom";

export function Item() {
    const { classes } = itemStyles();

    return (
        <>
            <Grid>
                <Grid.Col span={2}>
                    <Stack pl="md">
                        <Link to="/products">
                            <ActionIcon aria-label="Shopping Cart Icon">
                                <IconArrowBack size="xl" />
                            </ActionIcon>
                        </Link>
                        <Text size="lg" fw="bold" className={classes.arrowBackText}>back to products</Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Paper my={rem(60)}>
                        <Title>Dog Happy</Title>
                        <Grid>
                            <Grid.Col xs={12} sm={6}>
                                <Text mt={rem(100)} fw="bold">€ 0,99</Text>

                                <Text fs="italic" mt={rem(10)}>Comic Style</Text>
                                <Text mt={rem(20)}>Leopard cougar. Burmese siamese bobcat burmese havana brown and havana brown.</Text>
                                <Text mt={rem(20)} td="underline">Quantity</Text>
                                <Input
                                    component="select"
                                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                    pointer
                                    mt="sm"
                                    w={rem(80)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Input>
                                <Button mt={rem(40)}>Add to cart</Button>
                            </Grid.Col>
                            <Grid.Col xs={12} sm={6}>
                                <img src={dog} alt="frog waterfall" width="100%" height="auto"></img>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Grid.Col>
            </Grid>
        </>
    )
}


