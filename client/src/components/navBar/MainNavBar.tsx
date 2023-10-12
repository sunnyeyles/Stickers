import { useEffect, useState } from 'react'
import {
  Header,
  Group,
  Burger,
  Button,
  Menu,
  Avatar,
  ActionIcon,
  Image,
} from '@mantine/core'
import { IconShoppingCartFilled } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { navBarStyles } from './nav_bar_styles'
// import { IHeaderMiddleProps } from './main_nav_bar_types'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import dogHappy from './../../assets/dog_happy.svg'
import { LightDarkToggleButton } from '../lightDarkToggleButton/LightDarkToggleButton'
import { DogHappy } from '../../assets/DogHappy'

// import { useSendLogoutMutation } from '../../app/api/authApi'
// import { useAppSelector } from '../../app/hooks'

export function MainNavBar({}) {
  const [opened, { toggle }] = useDisclosure(false)
  // const [active, setActive] = useState(links[0].link)
  const { classes } = navBarStyles()
  const navigate = useNavigate()
  // const [logout, { isLoading, isSuccess }] = useSendLogoutMutation()
  // // get user state from store to check if user is logged in
  // const currentUser = useAppSelector((state) => state.auth)
  // // control user logged in state here for testing purposes
  const currentUser = {
    userName: true,
  }

  // if (isLoading) {
  //   return <p>Logging out...</p>
  // }

  // const items = links.map((link) => (
  //   <Button
  //     key={link.label}
  //     onClick={(event) => {
  //       event.preventDefault()
  //       // Set the active state to indicate the currently selected button/link
  //       setActive(link.link)
  //     }}
  //   >
  //     {link.label}
  //   </Button>
  // ))

  const UserButtons = () => {
    if (currentUser.userName === null) {
      return (
        <Group>
          <Button component="a" href="/login" radius="xl">
            Login
          </Button>
          <Button component="a" href="/register" radius="xl">
            Signup
          </Button>
          {/* <LightDarkToggleButton /> */}
        </Group>
      )
    } else {
      return (
        <Group>
          <Menu shadow="md" width={200}>
            <ActionIcon aria-label="Shopping Cart Icon">
              <IconShoppingCartFilled />
            </ActionIcon>
            <Menu.Target>
              <Avatar radius="xl" />
            </Menu.Target>
            <ActionIcon aria-label="Logout Icon">
              <IconLogout />
            </ActionIcon>
            <ActionIcon>{/* <LightDarkToggleButton /> */}</ActionIcon>
          </Menu>
        </Group>
      )
    }
  }

  return (
    <Header height={56} m="1rem" className={classes.inner}>
      <Burger
        opened={opened}
        onClick={toggle}
        size="sm"
        className={classes.burger}
      ></Burger>
      {/* <Image height="3.5rem" width="3.5rem" src={dogHappy} alt="Happy Dog" /> */}
      <DogHappy />
      <Group className={classes.items} spacing={5}>
        <Group>
          <Button variant="outline">Shop</Button>
          <Button variant="outline">Contact</Button>
          <Button variant="outline">Shop</Button>
          <Button variant="outline">Contact</Button>
        </Group>
      </Group>
      <UserButtons />
    </Header>
  )
}
