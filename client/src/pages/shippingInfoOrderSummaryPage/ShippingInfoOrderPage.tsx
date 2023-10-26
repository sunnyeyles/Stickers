import { useState, useEffect } from 'react'
import { Grid, Box } from '@mantine/core'
import { OrderSummaryCard } from '../../components/orderSummaryCard/OrderSummaryCard'
import { ShippingInfoForm } from '../../components/shippingInfoForm/ShippingInfoForm'
import { ConfirmAddressDetails } from '../../components/confirm_address_details/ConfirmAddressDetails'
import { useAppSelector } from '../../hooks/hooks'
import { IUserAddressInfo } from '../../app/api/types'

const addressDetails = {
  firstName: 'Max',
  lastName: 'Mustermann',
  streetName: 'Fake street',
  houseNumber: 123,
  postCode: 13357,
  city: 'Kabul',
  country: 'Afgahnistan',
}

export const ShippingInfoOrderPage = () => {
  const [addressExists, setAddressExists] = useState<boolean | undefined>()

  const handleAddressChange = () => {
    addressExists === true ? setAddressExists(false) : setAddressExists(true)
  }
  // get the state
  const userAddressInfo = useAppSelector((state) => state.userAddress)

  useEffect(() => {
    // check if state is empty
    const hasData = Object.values(userAddressInfo).some((value) => value !== '')
    setAddressExists(hasData)
  }, [userAddressInfo])

  return (
    <Grid justify="space-around" gutterSm={25} gutterMd={60}>
      <Grid.Col xs={12} sm={12} lg={5}>
        {!addressExists ? (
          <ShippingInfoForm />
        ) : (
          <ConfirmAddressDetails
            firstName={userAddressInfo.firstName}
            lastName={userAddressInfo.lastName}
            streetName={userAddressInfo.streetName}
            houseNumber={userAddressInfo.houseNumber}
            postCode={userAddressInfo.postCode}
            city={userAddressInfo.city}
            country={userAddressInfo.country}
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
