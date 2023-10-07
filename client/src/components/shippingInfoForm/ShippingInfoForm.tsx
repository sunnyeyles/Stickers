import { Title, Button, Grid, Box, TextInput } from '@mantine/core'

import { useDispatch } from 'react-redux'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  userAddressInfoSlice,
  setAddressInfoState,
} from '../../app/features/userAddressInfoSlice'

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
  houseNumber: z.string().min(1, { message: 'Street Number is Required' }),
  postCode: z
    .string()
    .min(3, 'Invalid Postcode')
    .max(5, { message: 'Invalid Postcode' }),
  city: z.string().min(2, { message: 'City is Required' }).toLowerCase(),
  country: z.string().min(2, { message: 'Country is Required' }).toLowerCase(),
  email: z.string().email().min(1, { message: 'Email is Required' }),
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
      houseNumber: '',
      postCode: '',
      city: '',
      country: '',
      email: '',
    },
    resolver: zodResolver(shippingInfoSchema),
  })
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data)
    dispatch(setAddressInfoState(data))
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
                <TextInput
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
                <TextInput
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
            {/* {errors.email?.message && <p>{errors.email?.message}</p>} */}
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
