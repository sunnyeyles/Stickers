import {
  Title,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Grid,
  Box,
  TextInput,
} from '@mantine/core'

import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface IFormData {
  streetName: string
  streetNumber: number
  postCode: number
  city: string
  country: string
}

export function ShippingInfoForm({}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: IFormData) => console.log(data)

  const shippingInfoSchema = z.object({
    streetName: z.string().min(2, 'Street Name is Required'),
    streetNumber: z.string().min(2, 'Street is Required'),
    postCode: z.number().min(4, 'Invalid Postcode').max(5, 'Invalid Postcode'),
    city: z.string().min(2, 'City is Required'),
    country: z.string().min(2, 'Country is Required'),
  })

  return (
    <Box>
      <Title>Shipping Information</Title>
      <form>
        <TextInput
          placeholder="Username"
          size="md"
          radius="md"
          id="username"
          name="userName"
        />
        <TextInput
          placeholder="Username"
          size="md"
          radius="md"
          id="username"
          name="userName"
        />
        <TextInput
          placeholder="Username"
          size="md"
          radius="md"
          id="username"
          name="userName"
        />
        <TextInput
          placeholder="Username"
          size="md"
          radius="md"
          id="username"
          name="userName"
        />
      </form>
    </Box>
  )
}
