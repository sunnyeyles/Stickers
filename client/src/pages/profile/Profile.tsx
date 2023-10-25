import { Avatar, Button, Container, Grid, Paper, Stack, Text, Title, rem } from "@mantine/core";
import { useUploadMutation } from "../../app/features/upload/uploadApiSlice";
import { useAppSelector, useUser } from "../../hooks/hooks";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FileInput } from "../../components/form/custom_input_fields/fileInput/FileInput";
import { useStyles } from "./profile_styles";
import { Link } from "react-router-dom";

const imageUploadSchema = object({
    profileImage: z.instanceof(File),
});

export type UploadImageType = z.infer<typeof imageUploadSchema>;

export function Profile() {

    const { classes } = useStyles();
    
    //we use our custom hook with loading 
    const [user, loading] = useUser()
    console.log("user",user)
    console.log("loading",loading)
    
    const {
        control,
        handleSubmit
    } = useForm<UploadImageType>({
        resolver: zodResolver(imageUploadSchema),
    });

    const [upload, { isLoading, isSuccess }] = useUploadMutation()
    if (isLoading) {
        return <p>Loading...</p>
    }

    const onSubmit: SubmitHandler<UploadImageType> = async (values: any) => {
        const formData = new FormData()
        formData.append('profileImage', values.profileImage);
        values.userEmail = user.email
        formData.append('userEmail', values.userEmail)
        await upload(formData)
    };

    return (
        <>
            <Paper className={classes.form} radius={0} p={30}>
                <Title
                    order={2}
                    className={classes.title}
                    ta="center"
                    mt="md"
                    mb={50}
                >Settings
                </Title>
                <Paper withBorder p="xl">
                <Title order={3}>Account</Title>
                <Grid justify="space-around" align="center">
                    <Grid.Col sm={6}>
                        <Text size="md">Upload/Update your profile Image</Text>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <Avatar w={rem(100)} h={rem(100)} color="orange" radius="xl" mb="lg" />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack>
                                <FileInput
                                    control={control}
                                    placeholder="Choose image"
                                    size="md"
                                    radius="md"
                                    id="profileImage"
                                    name="profileImage"
                                    accept="image/*"
                                />
                                <Button type="submit" radius="xl">
                                    Save
                                </Button>
                                {isSuccess &&
                                    <p>
                                        Image saved successfully
                                    </p>
                                }
                            </Stack>
                        </form>
                    </Grid.Col>
                </Grid>
                </Paper>
                
                <Link to="/">Back to Dashboard</Link>
            </Paper>
        </>
    )
}

