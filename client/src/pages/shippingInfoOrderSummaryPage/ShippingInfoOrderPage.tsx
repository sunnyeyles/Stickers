import { useState, useEffect } from 'react'
import { Grid, Box } from '@mantine/core'
import { OrderSummaryCard } from '../../components/orderSummaryCard/OrderSummaryCard'
import { ShippingInfoForm } from '../../components/shippingInfoForm/ShippingInfoForm'
import { ConfirmAddressDetails } from '../../components/confirmAddressDetails/ConfirmAddressDetails'

import { useUser } from '../../hooks/hooks'

export const ShippingInfoOrderPage = () => {
  const [addressExists, setAddressExists] = useState<boolean>()
  const [user] = useUser()

  useEffect(() => {
    user && user.hasOwnProperty('address')
      ? setAddressExists(true)
      : setAddressExists(false)
  }, [user])

  const handleAddressChange = () => {
    setAddressExists(false)
    // navigate to shipping address form
  }

  return (
    <Grid justify="space-around" gutterSm={25} gutterMd={60}>
      <Grid.Col xs={12} sm={12} lg={5}>
        {!addressExists ? (
          <ShippingInfoForm />
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
