import { useState, useEffect } from 'react'
import { Grid, Box } from '@mantine/core'
import { OrderSummaryCard } from '../../components/orderSummaryCard/OrderSummaryCard'
import { ShippingInfoForm } from '../../components/form/shippingInfoForm/ShippingInfoForm'
import { ConfirmAddressDetails } from '../../components/confirmAddressDetails/ConfirmAddressDetails'
import { useGetUserByIdQuery } from '../../app/features/users/usersApiSlice'
import { updateUserAddress } from '../../app/features/users/userSlice'
import { useUser } from '../../hooks/hooks'
import { useDispatch } from 'react-redux'

export const ShippingInfoOrderPage = () => {
  const [addressExists, setAddressExists] = useState<boolean>()

  const dispatch = useDispatch()
  const [user] = useUser()
  // const userDetails = useGetUserByIdQuery(user._id)
  // console.log(userDetails)

  useEffect(() => {
    // dispatch(updateUserAddress(newAddress))

    // check for address on initial render, depending on if the user has an address, it will render either the ShippingInfoForm or the ConfirmAddresDetails
    user && user.hasOwnProperty('address')
      ? setAddressExists(true)
      : setAddressExists(false)
  }, [])
  // when this is called it will set the addressExists state to false, this will render the ShippingInfoForm
  const handleAddressChange = () => {
    setAddressExists(false)
  }
  // this will be triggered when the user submits the form in the ShippingInfoForm, this will set the addressExists state to true in turn rendering the ConfirmAddressInfo component
  const handleAddessUpdated = (hasChanged: boolean) => {
    // dispatch(updateUserAddress(userDetails))
    setAddressExists(hasChanged)
  }

  return (
    <Grid justify="space-around" gutterSm={25} gutterMd={60}>
      <Grid.Col xs={12} sm={12} lg={5}>
        {!addressExists ? (
          <ShippingInfoForm onAddressUpdate={handleAddessUpdated} />
        ) : (
          <ConfirmAddressDetails
            firstName={user.address.firstName}
            lastName={user.address.lastName}
            streetName={user.address.streetName}
            houseNumber={user.address.houseNumber}
            postCode={user.address.postCode}
            city={user.address.city}
            country={user.address.country}
            handleAddressChange={handleAddressChange}
          />
        )}
      </Grid.Col>
      <Grid.Col xs={12} sm={12} lg={5}>
        <Box>
          <OrderSummaryCard />
        </Box>
      </Grid.Col>
    </Grid>
  )
}
