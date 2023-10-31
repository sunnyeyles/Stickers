import { Title, Button, Grid, Box, TextInput, NumberInput } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { setAddressInfoState } from '../../../app/features/users/userAddressInfoSlice'
import { updateUserAddress } from '../../../app/features/users/userSlice'
import { useUserDetails } from '../../../hooks/hooks'

const shippingInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name is Required' })
    .toLowerCase(),
  lastName: z
    .string()
    .min(2, { message: 'Last Name is Required' })
    .toLowerCase(),
  streetName: z
    .string()
    .min(2, { message: 'Street Name is Required' })
    .toLowerCase(),
  houseNumber: z.number(),
  postCode: z.number(),
  city: z.string().min(2, { message: 'City is Required' }).toLowerCase(),
  country: z.string().min(2, { message: 'Country is Required' }).toLowerCase(),
})

type FormSchemaType = z.infer<typeof shippingInfoSchema>

export function ShippingInfoForm() {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      streetName: '',
      houseNumber: undefined,
      postCode: undefined,
      city: '',
      country: '',
    },
    resolver: zodResolver(shippingInfoSchema),
  })
  const [userData] = useUserDetails()

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    // dispatch(updateUserAddress(data))
    console.log(data)
    console.log('oi')
  }

  return (
    <Box m="sm">
      <Title mb="lg">Shipping Information</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="first name"
                  size="md"
                  radius="md"
                  id="firstName"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="last name"
                  size="md"
                  radius="md"
                  id="lastName"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="streetName"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="street name"
                  size="md"
                  radius="md"
                  id="streetName"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="houseNumber"
              control={control}
              render={({ field }) => (
                <NumberInput
                  placeholder="house number"
                  size="md"
                  radius="md"
                  id="houseNumber"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="postCode"
              control={control}
              render={({ field }) => (
                <NumberInput
                  placeholder="post code"
                  size="md"
                  radius="md"
                  id="postCode"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="city"
                  size="md"
                  radius="md"
                  id="city"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="country"
                  size="md"
                  radius="md"
                  id="country"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Button size="md" type="submit">
              Confirm Address
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  )
}
