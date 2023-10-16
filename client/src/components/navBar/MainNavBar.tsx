import { useEffect, useState } from 'react'
import {
  Header,
  Group,
  Burger,
  Button,
  Box,
  Menu,
  Avatar,
  ActionIcon,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { navBarStyles } from "./nav_bar_styles";
import { IconBong, IconLogout, IconSettings } from "@tabler/icons-react";
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from "../../app/features/auth/authApiSlice";
import { useAppSelector } from "../../hooks/hooks";
import { IconShoppingCartFilled } from '@tabler/icons-react'
import { IHeaderMiddleProps } from './main_nav_bar_types'
import dogHappy from './../../assets/dog_happy.svg'
import { LightDarkToggleButton } from '../lightDarkToggleButton/LightDarkToggleButton'
import { DogHappy } from '../../assets/DogHappy'
//import { useGetUserByIdMutation, useGetUserByIdQuery } from "../../app/features/users/usersApiSlice";

export function MainNavBar({ links }: IHeaderMiddleProps) {

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes } = navBarStyles();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  //  TO DO  show profile image from user
  //const profileImage = useAppSelector(state => state.auth.user?.profileImage)
  //const userId = useAppSelector(state => state.auth.user?._id) as string
  //console.log(userId)
  //const { data } = useGetUserByIdMutation(userId)
  //console.log(data)

  const [logout, {
    isLoading,
    isSuccess
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  const UserButtons = () => {
    if (isAuthenticated === false) {
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
            <Menu.Dropdown>
              <Menu.Item>
                <Link to="/profile">
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />Your Profile
                </Link>
              </Menu.Item>
            </Menu.Dropdown>
            <ActionIcon aria-label="Logout Icon">
              <IconLogout onClick={logout} />
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
