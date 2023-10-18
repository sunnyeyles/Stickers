import { Card, Image, AspectRatio, SimpleGrid, Text, Title, Stack, useMantineTheme } from '@mantine/core'
import { useStyles } from './items_collection_styles';
import { useGetAllItemsQuery } from '../../app/features/items/itemsApiSlice';

export function ItemsCollection() {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const { data: items } = useGetAllItemsQuery()

    return (
        <>
            <Title size="h1" pt="xl" pb="lg" align='center'>COLLECTION</Title>
            {items?.length === 0 ? (
                <Card>
                    <Text>
                        No items at the moment
                    </Text>
                </Card>
            ) : (
                <SimpleGrid
                    cols={4}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: '62rem', cols: 3, spacing: 'md' },
                        { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
                    ]}
                >
                    {items?.map((item, index) => (
                        <Card
                            key={item.itemName}
                            style={{ backgroundColor: index % 2 === 0 ? theme.colors.orange[1] : theme.colors.orange[2] }}
                        >
                            <Card.Section
                                component="a"
                                href="#"
                                target="_blank"
                            >
                                <AspectRatio ratio={2000 / 1700}>
                                    <Image src={item.imagePath} />
                                </AspectRatio>
                            </Card.Section>
                            <Stack>
                                <Text size="md" className={classes.itemTitle}>
                                    {item.itemName}
                                </Text>

                                <Text size="md" fw={700} className={classes.itemTitle}>
                                    {item.itemPrice}
                                </Text>
                            </Stack>

                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </>
    );
}

