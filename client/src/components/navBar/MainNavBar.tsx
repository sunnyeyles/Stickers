import { useEffect, useState } from "react";
import {
  Header,
  Group,
  Container,
  Burger,
  TextInput,
  Button,
  Box,
  List,
  Anchor,
  Menu,
  rem,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { navBarStyles } from "./nav_bar_styles";
import { IHeaderMiddleProps } from "./main_nav_bar_types";
import { IconBong, IconLogout, IconSettings } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from "../../app/api/authApi";
import { useAppSelector } from "../../app/hooks";

export function MainNavBar({ links }: IHeaderMiddleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes } = navBarStyles();
  const navigate = useNavigate();

  const [logout, {
    isLoading,
    isSuccess
  }] = useSendLogoutMutation()

  const currentUser = useAppSelector(state => state.auth)

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate('/login')
  //   }
  // }, [isSuccess, navigate])

  if (isLoading) {
    return <p>Logging out...</p>
  }

  const items = links.map((link) => (
    <Button
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        // Set the active state to indicate the currently selected button/link
        setActive(link.link);
      }}
    >
      {link.label}
    </Button>
  ));

  const authButton = () => {
    if (currentUser.userName === null) {
      return (
        <Group>
          <Button component="a" href="/login" radius="xl">Login</Button>
          <Button component="a" href="/register" radius="xl">Signup</Button>
        </Group>
      )
    } else {
      return (
        <>
          <Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar color="orange" radius="xl" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />Your Profile
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button onClick={logout} radius="xl"><IconLogout size="1rem" /></Button>
          </Group>
        </>
      )
    }
  }

  return (
    <Header height={56} m="1rem">
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.items} spacing={5}>
          {items}
        </Group>
        <Box display="flex">
          <IconBong size="3rem" />
        </Box>
        {/* <Group className={classes.textBox} spacing={0} position="right" noWrap>
          <TextInput icon={<IconSearch size="1rem" />} placeholder="Search" />
        </Group> */}
        {authButton()}
      </Container>
      {/* <Box>
        <List
          spacing="lg"
          sx={{ textDecoration: "none", listStyleType: "none" }}
        >
          <List.Item>Shirts</List.Item>
          <List.Item>Pants</List.Item>
          <List.Item>Accessories</List.Item>
          <List.Item>Sale</List.Item>
        </List>
      </Box> */}
    </Header>
  );
}
