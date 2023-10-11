import { Card, Image, Container, AspectRatio, SimpleGrid, Text, Title } from '@mantine/core'
import { useStyles } from './items_collection_styles';
import { useGetAllItemsQuery } from '../../app/features/items/itemsApiSlice';

export function ItemsCollection() {
    const { classes } = useStyles();

    const { data: items } = useGetAllItemsQuery()

    return (
        <div className={classes.section}>
            <Container className={classes.container}>
                <Title className={classes.title}>COLLECTION</Title>
                {items?.length === 0 ? (
                    <Card>
                        <Text>
                            No items at the moment
                        </Text>
                    </Card>
                ) : (
                    <SimpleGrid cols={3}>
                        {items?.map((item) => (

                            <Card key={item.itemName} component="a" href="#">
                                <AspectRatio ratio={1920 / 1080}>
                                    <Image src={item.image} />
                                </AspectRatio>
                                <Text className={classes.itemTitle}>
                                    {item.itemName}
                                </Text>
                            </Card>

                        ))}
                    </SimpleGrid>
                )}
            </Container>
        </div>
    );
}

