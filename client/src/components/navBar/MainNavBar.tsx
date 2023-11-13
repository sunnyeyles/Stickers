import { ReactNode } from 'react'
import {
  Header,
  Group,
  Burger,
  Button,
  Box,
  List,
  Text,
  TextInput,
  useMantineColorScheme,
  UnstyledButton,
  ThemeIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { navBarStyles } from './nav_bar_styles'
import { Link } from 'react-router-dom'
import { useUser, useUserDetails } from '../../hooks/hooks'
import { DogHappy } from '../../assets/DogHappy'
import { NavBarLoggedOut } from './NavBarLoggedOut'
import { NavBarLoggedIn } from './NavBarLoggedIn'
import { IconSearch, IconArrowNarrowRight } from '@tabler/icons-react'

export function MainNavBar() {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = navBarStyles()
  // const [userAuth] = useUser()
  const [userAuth] = useUserDetails()

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
          <TextInput
            aria-label="Search Items"
            icon={<IconSearch size="1rem" />}
          />
        </Group>
        <UserButtons />
      </Header>
      {opened ? (
        <List className={classes.dropDownMenu}>
          <TextInput
            aria-label="Search Items"
            icon={<IconSearch size="1rem" />}
          />
          {userAuth.isAuthenticated ? (
            <Link to="/profile">
              <UnstyledButton>
                <Text size="xl">Account</Text>
              </UnstyledButton>
            </Link>
          ) : null}
          <Link to="/contact">
            <UnstyledButton>
              <Text size="xl">Contact</Text>
            </UnstyledButton>
          </Link>

          <Link to="/">
            <UnstyledButton>
              <Text size="xl">Collection</Text>
            </UnstyledButton>
          </Link>
          <Link to="/">
            <UnstyledButton>
              <Text size="xl">About</Text>
            </UnstyledButton>
          </Link>
        </List>
      ) : null}
    </Box>
  )
}
