import { Card, Image, Container, AspectRatio, SimpleGrid, Text, Col, Grid, Title } from '@mantine/core'
import { useStyles } from './items_collection_styles';

const mockdata = [
    {
        title: 'it in Norway this summer',
        image:
            'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',

    },
    {
        title: 'visit in North America',
        image:
            'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',

    },
    {
        title: ' beaches review: better than you think',
        image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',

    },
    {
        title: 'Mations to enjoy the view',
        image:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    },
    {
        title: 'Top 10 places to visit in Norway this summer',
        image:
            'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',

    }
];

export function ItemsCollection() {
    const { classes } = useStyles();

    const cards = mockdata.map((article) => (

        <Card key={article.title} component="a" href="#">
            <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} />
            </AspectRatio>
            <Text className={classes.itemTitle}>
                {article.title}
            </Text>
        </Card>


    ));

    return (
        <div className={classes.section}>
            <Container className={classes.container}>
                <Title className={classes.title}>COLLECTION</Title>
                <SimpleGrid cols={3}>{cards}</SimpleGrid>
            </Container>
        </div>
    );
}

