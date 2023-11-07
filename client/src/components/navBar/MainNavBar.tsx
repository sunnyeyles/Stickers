import { useEffect, useState } from 'react'
import {
  Header,
  Group,
  Burger,
  Button,
  Menu,
  Avatar,
  ActionIcon,
  rem,
  Text
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { navBarStyles } from "./nav_bar_styles";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../../app/features/auth/authApiSlice'
import { useAppDispatch, useAppSelector, useUser } from '../../hooks/hooks'
import { IconShoppingCartFilled } from '@tabler/icons-react'
import { IHeaderMiddleProps } from './main_nav_bar_types'
import { DogHappy } from '../../assets/DogHappy'
import { getTotalAmountOfItems } from '../../app/features/cart/cartSlice';
import { selectProfileImage, uploadImage } from '../../app/features/upload/uploadSlice';

export function MainNavBar({ links }: IHeaderMiddleProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const { classes } = navBarStyles()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const totalAmount = useAppSelector(getTotalAmountOfItems)
  const [user] = useUser()
  const [logout, { isLoading, isSuccess }] = useSendLogoutMutation()
  //shows profile img
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage)
  const profileImg: any = useAppSelector(selectProfileImage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setProfileImage(profileImg.profileImagePath)
    dispatch(uploadImage(profileImg))
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  const UserButtons = () => {
    if (isAuthenticated === false) {
      return (
        <Group>
          <Link to="/cart">
            <ActionIcon aria-label="Shopping Cart Icon">
              <IconShoppingCartFilled />
            </ActionIcon>
          </Link>
          {totalAmount > 0 ? <Text className={classes.itemAmount}>{totalAmount}</Text> : null}
          <Button component={Link} to="/login" radius="xl">
            Login
          </Button>
          <Button component={Link} to="/register" radius="xl">
            Signup
          </Button>

          <Link to="/order-summary">
            <Button>CLICK FOR ORDER SUMMARY</Button>
          </Link>
          {/* <LightDarkToggleButton /> */}
        </Group>
      )
    } else {
      return (
        <Group>
          <Menu shadow="md" width={200}>
            <Link to="/cart">
              <ActionIcon aria-label="Shopping Cart Icon">
                <IconShoppingCartFilled />
              </ActionIcon>
            </Link>
            {totalAmount > 0 ? <Text className={classes.itemAmount}>{totalAmount}</Text> : null}
            <Link to="/order-summary">
              <Button>CLICK FOR ORDER SUMMARY</Button>
            </Link>
            <Menu.Target>
              {user?.profileImage !== "" || user?.profileImage !== null
                ? <Avatar className={classes.avatar} src={profileImage} radius="xl" />
                : <Avatar radius="xl">{user?.email.substring(0, 1)}</Avatar>
              }
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                <Link to="/profile">
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  Settings
                </Link>
                <Menu.Item></Menu.Item>
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
      <Link to="/">
        <DogHappy />
      </Link>
      <Group className={classes.items} spacing={5}>
        <Group>
          <Button variant="outline" component={Link} to="/products">Products</Button>
          <Button variant="outline" component={Link} to="/contact">Contact</Button>
          <Button variant="outline" component={Link} to="/about">About</Button>
        </Group>
      </Group>
      <UserButtons />
    </Header>
  )
}
