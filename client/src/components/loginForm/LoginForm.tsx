import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Title,
  Paper,
  createStyles,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  rem,
  Grid
} from '@mantine/core';
import { GoogleButton, TwitterButton } from '../socialButtons/SocialButtons';
import Duck from '../../assets/duck_big.png'
import { ButtonTheme } from '../../styles/ButtonTheme';

const useStyles = createStyles((theme) => ({
  form: {
    maxWidth: rem(450),
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function LoginForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  const { classes } = useStyles();
  return (
    <>
    <Grid justify="space-around" align="center">
      <Grid.Col xs={12} sm={5} offsetSm={1} lg={4} offsetLg={1}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome to the best Webstore ever, {type} with
          </Title>

          <Group grow mb="md" mt="md">
            <ButtonTheme>
              <GoogleButton radius="xl">Google</GoogleButton>
              <TwitterButton radius="xl">Twitter</TwitterButton>
            </ButtonTheme>
          </Group>

          <Divider label="Or continue with email" labelPosition="center" my="lg" />

          <form onSubmit={form.onSubmit(() => {})}>
            <Stack>
              {/* {type === 'register' && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                  radius="md"
                />
              )} */}

              <TextInput
                placeholder="Email"
                size='md'
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
                radius="md"
              />

              <PasswordInput
                placeholder="Password"
                mt="md" 
                size="md"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
                radius="md"
              />

              {/* {type === 'register' && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                />
              )} */}
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </Grid.Col>
        
      <Grid.Col xs={12} sm={6} lg={4}>
        <Paper p={30}>
          <img src={Duck} alt="Your Image" width='100%' height='auto'/> 
        </Paper>
      </Grid.Col>
    </Grid>
    </>
  );
}