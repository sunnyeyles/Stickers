import { useToggle, upperFirst } from "@mantine/hooks";
import {
  Title,
  Paper,
  createStyles,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  rem,
  Grid,
} from "@mantine/core";
import { TextInput } from "../textInput/TextInput";
import { PasswordInput } from "../passwordInput/PasswordInput";
import { GoogleButton, TwitterButton } from "../socialButtons/SocialButtons";
import Duck from "../../assets/duck_big.png";
import { ButtonTheme } from "../../styles/ButtonTheme";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/features/auth/authApi";
import { setCredentials } from "../../app/features/auth/authSlice";

const useStyles = createStyles((theme) => ({
  form: {
    maxWidth: rem(450),
    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export function LoginForm() {
  const [type, toggle] = useToggle(["login", "register"]);
  const { classes } = useStyles();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FormSchemaType> = async (loginData) => {
    const user = await login(loginData).unwrap();
    dispatch(setCredentials(user));
    navigate("/");
  };

  return (
    <>
      <Grid justify="space-around" align="center">
        <Grid.Col xs={12} sm={5} offsetSm={1} lg={4} offsetLg={1}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title
              order={2}
              className={classes.title}
              ta="center"
              mt="md"
              mb={50}
            >
              Welcome to the best Webstore ever, {type} with
            </Title>

            <Group grow mb="md" mt="md">
              <ButtonTheme>
                <GoogleButton radius="xl">Google</GoogleButton>
                <TwitterButton radius="xl">Twitter</TwitterButton>
              </ButtonTheme>
            </Group>

            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <TextInput
                  control={control}
                  placeholder="Email"
                  size="md"
                  radius="md"
                  id="email"
                  name="email"
                />

                {/* {type === 'register' && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                  radius="md"
                />
              )} */}

                {/* <PasswordInput
                  type="password"
                  placeholder="Password"
                  mt="md"
                  size="md"
                  radius="md"
                  id="password"
                  control={control}
                  name="password"
                /> */}
                <PasswordInput
                  placeholder="Password"
                  mt="md"
                  size="md"
                  radius="md"
                  id="password"
                  control={control}
                  name="password"
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
                  {type === "register"
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
                </Anchor>
                <Button type="submit" radius="xl" disabled={isSubmitting}>
                  {upperFirst(type)}
                </Button>
              </Group>
            </form>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={12} sm={6} lg={4}>
          <Paper p={30}>
            <img src={Duck} alt="Your Image" width="100%" height="auto" />
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}
