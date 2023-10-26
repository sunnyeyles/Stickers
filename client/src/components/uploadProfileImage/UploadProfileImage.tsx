import { Avatar, Button, Grid, Text, rem } from '@mantine/core'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, z } from 'zod';
import { useUploadMutation } from '../../app/features/upload/uploadApiSlice';
import { useUser } from '../../hooks/hooks';
import { FileInput } from "../../components/form/custom_input_fields/fileInput/FileInput";

const imageUploadSchema = object({
    profileImage: z.instanceof(File),
})

export type UploadImageType = z.infer<typeof imageUploadSchema>;

export function UploadProfileImage() {

    //we use our custom hook with loading 
    const [user, loading] = useUser()
    //console.log("image",user.profileImage)

    const [profileImage, setProfileImage] = useState()

    useEffect(() => {
        setProfileImage(user?.profileImage)
    }, [user]);

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
            <Grid justify="space-around" align="center">
                <Grid.Col sm={6}>
                    <Text size="md">Upload/Update your profile Image</Text>
                </Grid.Col>
                <Grid.Col sm={6}>
                    <Avatar src={profileImage} w={rem(100)} h={rem(100)} color="orange" radius="xl" mb="lg" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FileInput
                            control={control}
                            placeholder="Choose image"
                            size="md"
                            radius="md"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                        />
                        <Button mt={rem(10)} type="submit" radius="xl">
                            Save
                        </Button>
                        {isSuccess &&
                            <p>
                                Image saved successfully
                            </p>
                        }
                    </form>
                </Grid.Col>
            </Grid>
        </>
    )
}