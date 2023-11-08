import { Group, Button, ActionIcon, Text } from '@mantine/core'
import { navBarStyles } from './nav_bar_styles'
import { Link } from 'react-router-dom'
import { getTotalAmountOfItems } from '../../app/features/cart/cartSlice'
import { useAppSelector } from '../../hooks/hooks'
import { IconShoppingCartFilled } from '@tabler/icons-react'

export function NavBarLoggedOut() {
  const totalAmount = useAppSelector(getTotalAmountOfItems)

  const { classes } = navBarStyles()

  return (
    <Group>
      <Link to="/cart">
        <ActionIcon aria-label="Shopping Cart Icon">
          <IconShoppingCartFilled />
        </ActionIcon>
      </Link>
      {totalAmount > 0 ? (
        <Text className={classes.itemAmount}>{totalAmount}</Text>
      ) : null}
      <Button component={Link} to="/login" radius="xl">
        Login
      </Button>
      <Button component={Link} to="/register" radius="xl">
        Signup
      </Button>

      {/* <Link to="/order-summary">
        <Button>CLICK FOR ORDER SUMMARY</Button>
      </Link> */}
      {/* <LightDarkToggleButton /> */}
    </Group>
  )
}
