import { useEffect } from 'react'
import { Header, Group, Burger, Button, Box, List } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { navBarStyles } from './nav_bar_styles'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../../app/features/auth/authApiSlice'
import { useAppSelector } from '../../hooks/hooks'
import { DogHappy } from '../../assets/DogHappy'
import { NavBarLoggedOut } from './NavBarLoggedOut'
import { NavBarLoggedIn } from './NavBarLoggedIn'

export function MainNavBar() {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = navBarStyles()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  //  TO DO  show profile image from user
  //const profileImage = useAppSelector(state => state.auth.user?.profileImage)
  //const userId = useAppSelector(state => state.auth.user?._id) as string
  //const { data } = useGetUserByIdMutation(userId)

  const [logout, { isLoading, isSuccess }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  const UserButtons = () => {
    if (isAuthenticated === false) {
      return <NavBarLoggedOut />
    } else {
      return <NavBarLoggedIn />
    }
  }

  return (
    <Box>
      <Header height={56} m="1rem" className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className={classes.burger}
        />
        <Link to="/">
          <DogHappy />
        </Link>
        <Group className={classes.items} spacing={5}>
          <Group>
            <Button variant="outline" component={Link} to="/products">
              Products
            </Button>
            <Button variant="outline" component={Link} to="/contact">
              Contact
            </Button>
            <Button variant="outline" component={Link} to="/about">
              About
            </Button>
          </Group>
        </Group>
        <UserButtons />
      </Header>
      {opened ? (
        <List size="md" withPadding sx={{}}>
          <Link to="/">
            <List.Item>Products</List.Item>
          </Link>
          <Link to="/">
            <List.Item>Contacts</List.Item>
          </Link>
          <Link to="/">
            <List.Item>About</List.Item>
          </Link>
        </List>
      ) : null}
    </Box>
  )
}
