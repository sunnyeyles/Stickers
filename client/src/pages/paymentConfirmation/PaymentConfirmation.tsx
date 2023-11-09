import { Box, Button, Group, Modal, Portal, Title, rem } from '@mantine/core'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { usePaymentConfirmationStyles } from './payment_confirmation_styles'
import { useUser } from '../../hooks/hooks'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import dogSleeping from '../../assets/dog_sleeping.png'

export function PaymentConfirmation() {
    const { classes } = usePaymentConfirmationStyles()
    const [userAuth] = useUser()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const AuthenitcatedSwitch = () => {
        if (userAuth?.token === null || userAuth?.token === undefined) {
            openModal()
        } else {
            return <Button component={Link} to="/profile" radius="xl">Your Order</Button>
        }
    }

    return (
        <><Portal>
            {isModalOpen && (
                <Modal
                    opened={isModalOpen}
                    onClose={closeModal}
                    title="log in to see your orders">
                    <Group position="center">
                        <img src={dogSleeping} alt="dog-sleeping" width="50%" height="auto" />
                        <Button component={Link} to="/login" radius="xl">
                            Login
                        </Button>
                    </Group>
                </Modal>
            )}
        </Portal>
            <Box className={classes.box}>
                <IconCircleCheckFilled
                    className={classes.icon}
                    size={100}
                    strokeWidth={2}
                />
                <Title mt={rem(20)} mb={rem(80)}>Payment Successful</Title>
                <Group>
                    < AuthenitcatedSwitch />
                    <Button component={Link} to="/products" radius="xl">
                        Products
                    </Button>
                </Group>
            </Box>
        </>
    )
}