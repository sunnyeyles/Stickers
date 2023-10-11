import { Avatar, Button, FileButton, Grid, Group, Stack, Text, FileInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useUploadMutation } from "../../app/features/upload/uploadApiSlice";
import { useAppSelector } from "../../app/hooks";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "@mantine/form";

// const formSchema = z.object({
//     profileImage: z.any()
// });

// export type FormSchemaType = z.infer<typeof formSchema>;

export function Profile() {

    type FormValues = {
        profileImage: File | null
    }
    const userEmail = useAppSelector(state => state.auth.email)
    console.log("userEmail: ", userEmail)

    //const [profileImage, setProfileImage] = useState<File | null>(null);

    // const {
    //     control,
    //     handleSubmit,
    //     formState: { isSubmitting },
    // } = useForm<FormSchemaType>({
    //     defaultValues: {
    //         profileImage: null,
    //     },
    //     resolver: zodResolver(formSchema),
    // });

    const form = useForm<FormValues>({
        initialValues: {
            profileImage: null,
        }
    });



    // useEffect(() => {
    //     handleImageUpload()
    // },[profileImage])
    const [upload, { isLoading }] = useUploadMutation()
    if (isLoading) {
        return <p>Loading...</p>
    }

    // const handleImageUpload = async () => {
    //     console.log("profileImage", profileImage)

    // }

    const handleSubmit = async (data: typeof form.values) => {
        console.log("data: ", data)
        const returnValue = await upload({ email: userEmail, profileImage: data })
        //const returnValue = await upload(data).unwrap()
        console.log("returnValue: ", returnValue)
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
                    {/* <form action="/upload" method="POST" enctype="multipart/form-data"> */}
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            {/* <input type="profileImage" name="profileImage" required /> */}
                            {/* <FileInput
                                control={control}
                                placeholder="Choose image"
                                size="md"
                                radius="md"
                                id="profileImage"
                                name="profileImage"
                                accept="image/*"
                            /> */}
                            <FileInput
                                placeholder="Upload a profile picture"
                                accept="image/*"
                                {...form.getInputProps("profileImage")}
                            />

                            <Button type="submit" radius="xl">
                                Save
                            </Button>
                        </Stack>
                    </form>



                    {/* <Group>
                        <FileButton onChange={setProfileImage} accept="image/png,image/jpeg">
                            {(props) => <Button {...props}>Upload image</Button>}
                        </FileButton>
                        {profileImage && (
                            <Text size="sm" ta="center" mt="sm">
                                Picked file: {profileImage.name}
                            </Text>
                        )}
                        <Button onClick={handleImageUpload}>Save</Button>
                    </Group> */}
                </Grid.Col>
            </Grid>
        </>
    );
}

