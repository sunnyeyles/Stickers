import { Header, Group, Button, Box, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { navBarStyles } from './nav_bar_styles'
import { Link } from 'react-router-dom'
import { useUserDetails } from '../../hooks/hooks'
import { DogHappy } from '../../assets/DogHappy'
import { NavBarLoggedOut } from './NavBarLoggedOut'
import { NavBarLoggedIn } from './NavBarLoggedIn'
import { IconSearch } from '@tabler/icons-react'
import { HamburgerDropdown } from './HamburgerDropdown'
import { useUser } from '../../hooks/hooks'

export function MainNavBar() {
  const { classes } = navBarStyles()
  // const [userAuth] = useUserDetails()
  const [userAuth] = useUser()

  const UserButtons = () => {
    // gets set to false whenever page is refreshed
    // need persisted state for isAutheneticated
    if (userAuth?.isAuthenticated === false) {
      return <NavBarLoggedOut />
    } else {
      return <NavBarLoggedIn />
    }
  }

  return (
    <Box>
      <Header height={56} m="1rem" className={classes.inner}>
        <Box className={classes.burger}>
          <HamburgerDropdown />
        </Box>
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
          <TextInput
            aria-label="Search Items"
            icon={<IconSearch size="1rem" />}
          />
        </Group>
        <UserButtons />
      </Header>
    </Box>
  )
}
