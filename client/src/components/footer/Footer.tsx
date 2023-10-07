import { Anchor, Group, ActionIcon, rem, Image } from '@mantine/core'
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons-react'
import { useStyles } from './footer_styles'
import { useMediaQuery } from '@mantine/hooks'
import { IconBeach } from '@tabler/icons-react'
import dogHappy from './../../assets/dog_happy.svg'

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Shop' },
]

export function Footer() {
  const { classes } = useStyles()
  const matches = useMediaQuery('(min-width: 56.25em)')

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="md"
    >
      {link.label}
    </Anchor>
  ))

  return (
    <Group
      className={classes.footer}
      sx={{
        flexDirection: matches ? 'row' : 'column',
        justifyContent: matches ? 'space-around' : 'center',
      }}
    >
      <Group>
        {/* <IconBeach size={50} /> */}
        <Image height="3.5rem" width="3.5rem" src={dogHappy} alt="Happy Dog" />
      </Group>

      {!matches && (
        <Group>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      )}

      <Group className={classes.links}>{items}</Group>

      {matches && (
        <Group>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      )}
    </Group>
  )
}
