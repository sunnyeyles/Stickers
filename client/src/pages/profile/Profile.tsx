import { Avatar, Button, FileButton, Grid, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export function Profile() {

    const [file, setFile] = useState<File | null>(null);

    const handleImageUpload = async () => {
        console.log(file)
        convertToBase64(file)
    }

    useEffect(() => {
        handleImageUpload()
    },[file])

    return (
        <>
            <h1>Profile Settings</h1>
            <Grid justify="space-around" align="center">
                <Grid.Col xs={12} sm={6}>
                    <Text size="md">Upload/Update your profile Image</Text>
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
                    {/* <Avatar color="orange" radius="xl" /> */}
                    <Group>
                        <FileButton onChange={setFile} accept="image/png,image/jpeg">
                            {(props) => <Button {...props}>Upload image</Button>}
                        </FileButton>
                        {file && (
                            <Text size="sm" ta="center" mt="sm">
                                Picked file: {file.name}
                            </Text>
                        )}
                    </Group>
                </Grid.Col>
            </Grid>
        </>
    );
}

const convertToBase64 = (file: Blob | null) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        if(file !== null){
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        }
    })
}