import { useEffect, useState, useRef } from 'react'
import {
  Header,
  Group,
  Burger,
  Button,
  Menu,
  Avatar,
  ActionIcon,
  rem,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { navBarStyles } from './nav_bar_styles'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../../app/features/auth/authApiSlice'
import { useAppSelector } from '../../hooks/hooks'
import { IconShoppingCartFilled } from '@tabler/icons-react'
import { IHeaderMiddleProps } from './main_nav_bar_types'

import { getTotalAmountOfItems } from '../../app/features/cart/cartSlice'

export function NavBarLoggedIn() {
  const { classes } = navBarStyles()
  const totalAmount = useAppSelector(getTotalAmountOfItems)

  const [logout, { isLoading, isSuccess }] = useSendLogoutMutation()

  if (isLoading) return <p>Logging Out...</p>
  return (
    <Group>
      <Menu shadow="md" width={200}>
        <Link to="/cart">
          <ActionIcon aria-label="Shopping Cart Icon">
            <IconShoppingCartFilled />
          </ActionIcon>
        </Link>
        {totalAmount > 0 ? (
          <Text className={classes.itemAmount}>{totalAmount}</Text>
        ) : null}
        {/* <Link to="/order-summary">
          <Button>CLICK FOR ORDER SUMMARY</Button>
        </Link> */}
        <Menu.Target>
          <Avatar radius="xl" />
        </Menu.Target>
        <ActionIcon aria-label="Logout Icon">
          <IconLogout onClick={logout} />
        </ActionIcon>
        <ActionIcon>{/* <LightDarkToggleButton /> */}</ActionIcon>
      </Menu>
    </Group>
  )
}
