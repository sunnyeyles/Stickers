import { Button, Grid, Paper, Stack, Text, Title } from "@mantine/core";
import { useUploadMutation } from "../../app/features/upload/uploadApiSlice";
import { useAppSelector } from "../../app/hooks";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FileInput } from "../../components/fileInput/FileInput";
import { useStyles } from "./profile_styles";

const imageUploadSchema = object({
    profileImage: z.instanceof(File),
});

export type UploadImageType = z.infer<typeof imageUploadSchema>;

export function Profile() {

    const { classes } = useStyles();

    const userEmail = useAppSelector(state => state.auth.email)
    console.log("userEmail: ", userEmail)

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
        values.userEmail = userEmail
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
                >Profile Settings
                </Title>
                <Grid justify="space-around" align="center">
                    <Grid.Col sm={6}>
                        <Text size="md">Upload/Update your profile Image</Text>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        {/* <Avatar color="orange" radius="xl" /> */}
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
        </>
    );
}

