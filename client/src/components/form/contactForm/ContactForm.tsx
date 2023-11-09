import { useRef } from 'react'
import { Button, TextInput, Box, Grid, Title, Textarea } from '@mantine/core'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name is Required' }).toLowerCase(),
  email: z.string().email().min(2, { message: 'Email is Required' }),
  subject: z.string().min(2, { message: 'Subject is Required' }),
  message: z.string().min(2, { message: 'Message is Required' }).toLowerCase(),
})

type ContactFormType = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    resolver: zodResolver(contactSchema),
  })

  const onSubmit: SubmitHandler<ContactFormType> = async (formData) => {
    try {
      console.log(formData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Box>
      <Title mb="sm">Get in touch</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="name"
                  size="md"
                  radius="md"
                  id="name"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="email"
                  size="md"
                  radius="md"
                  id="email"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="subject"
                  size="md"
                  radius="md"
                  id="subject"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="message"
                  size="md"
                  radius="md"
                  id="message"
                  autosize
                  minRows={8}
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col sx={{ display: 'flex', justifyContent: 'right' }}>
            <Button type="submit" mt="sm">
              Send Message
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  )
}
