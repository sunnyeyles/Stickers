import { Box, Text, Anchor, Card, Group, Button } from '@mantine/core'
import { useGetAllUsersQuery } from '../../app/features/users/usersApiSlice'
import { IConfirmAddressProps } from './confirm_address_details_types'
import { useUser } from '../../hooks/hooks'
export const ConfirmAddressDetails = ({
  firstName,
  lastName,
  streetName,
  houseNumber,
  postCode,
  city,
  country,
  handleAddressChange,
}: IConfirmAddressProps) => {
  // gotta talk about this
  const { data: allUsersData } = useGetAllUsersQuery()
  const data = allUsersData
  const [user] = useUser()
  // console.log(user)
  const handleGetAllUserData = () => {
    console.log(data)
  }
  return (
    <Box>
      <Card shadow="sm" padding="lg" radius="md">
        <Group mb="sm">
          <Text size="lg" weight={600}>{`${firstName} ${lastName}`}</Text>
        </Group>
        <Group mb="xs">
          <Text>{`${houseNumber} ${streetName}`}</Text>
        </Group>
        <Group mb="xs">
          <Text>{`${city} ${postCode}`}</Text>
        </Group>
        <Group mb="sm">
          <Text>{country}</Text>
        </Group>
        <Group>
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={handleAddressChange}
            size="xs"
          >
            Not your Address? Update Address details
          </Anchor>
          <Button onClick={handleGetAllUserData}>Get Address Data</Button>
        </Group>
      </Card>
    </Box>
  )
}
