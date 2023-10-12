import { Button, Grid, Stack, Text } from "@mantine/core";
import { useUploadMutation } from "../../app/features/upload/uploadApiSlice";
import { useAppSelector } from "../../app/hooks";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FileInput } from "../../components/fileInput/FileInput";

const imageUploadSchema = object({
    profileImage: z.instanceof(File),
});

export type UploadImageType = z.infer<typeof imageUploadSchema>;

export function Profile() {

    const userEmail = useAppSelector(state => state.auth.email)
    console.log("userEmail: ", userEmail)

    const {
        control,
        handleSubmit
    } = useForm<UploadImageType>({
        resolver: zodResolver(imageUploadSchema),
    });

    const [upload, { isLoading }] = useUploadMutation()
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
            <h1>Profile Settings</h1>
            <Grid justify="space-around" align="center">
                <Grid.Col xs={12} sm={6}>
                    <Text size="md">Upload/Update your profile Image</Text>
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
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
                        </Stack>
                    </form>
                </Grid.Col>
            </Grid>
        </>
    );
}

