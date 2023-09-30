import { useState } from "react";
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
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { navBarStyles } from "./nav_bar_styles";
import { IHeaderMiddleProps } from "./main_nav_bar_types";
import { IconSearch, IconBong } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from "../../app/api/authApi";

export function MainNavBar({ links }: IHeaderMiddleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes } = navBarStyles();
  const navigate = useNavigate();

  const userLogout = () => {
    //const user = await logout(loginData).unwrap();
    // selector from store the token
    navigate('/login')
  }

  const [logout] = useLoginMutation();

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
        <Group className={classes.textBox} spacing={0} position="right" noWrap>
          <TextInput icon={<IconSearch size="1rem" />} placeholder="Search" />
        </Group>
        <Button onClick={userLogout} radius="xl"
        >
          Log out
        </Button>
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
