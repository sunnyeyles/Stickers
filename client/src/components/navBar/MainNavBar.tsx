import { Header, Group, Burger, Button, Box, List} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { navBarStyles } from './nav_bar_styles'
import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/hooks'
import { DogHappy } from '../../assets/DogHappy'
import { NavBarLoggedOut } from './NavBarLoggedOut'
import { NavBarLoggedIn } from './NavBarLoggedIn'

export function MainNavBar() {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = navBarStyles()
  const [userAuth] = useUser()

  const UserButtons = () => {

    if (userAuth?.isAuthenticated === false) {
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
