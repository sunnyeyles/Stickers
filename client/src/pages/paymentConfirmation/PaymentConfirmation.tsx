import { Box, Button, Group, Title, rem } from '@mantine/core'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { usePaymentConfirmationStyles } from './payment_confirmation_styles';

export function PaymentConfirmation() {
    const { classes } = usePaymentConfirmationStyles();

    return (
        <>
            <Box className={classes.box}>
                <IconCircleCheckFilled
                    className={classes.icon}
                    size={100}
                    strokeWidth={2}
                />
                <Title mt={rem(20)} mb={rem(80)}>Payment Successful</Title>
                <Group>
                    <Button component="a" href="/profile" radius="xl">
                        Your Order
                    </Button>
                    <Button component="a" href="/products" radius="xl">
                        Products
                    </Button>
                </Group>
            </Box>
        </>
    )
}