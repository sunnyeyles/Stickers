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
  const [addressExists, setAddressExists] = useState<boolean | undefined>(true)

  const handleAddressChange = () => {
    addressExists === true ? setAddressExists(false) : setAddressExists(true)
  }
  // get state user address state from store
  const address = useAppSelector((state) => state.userAddress)
  // check for users address in state
  const checkForEmptyState = (obj: IUserAddressInfo) => {
    // iterate over user address object in state to check for empty strings
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== '') {
        console.log('State has values')
        return true
      } else {
        console.log('State is empty')
        return false
      }
    }
  }
  // set state
  useEffect(() => {
    const shouldRenderAddress = checkForEmptyState(address)
    if (shouldRenderAddress !== undefined) {
      setAddressExists(shouldRenderAddress)
    }
  }, [])

  return (
    <Grid justify="space-around" gutterSm={25} gutterMd={60}>
      <Grid.Col xs={12} sm={12} lg={5}>
        {!addressExists ? (
          <ShippingInfoForm />
        ) : (
          <ConfirmAddressDetails
            firstName={addressDetails.firstName}
            lastName={addressDetails.lastName}
            streetName={addressDetails.streetName}
            houseNumber={addressDetails.houseNumber}
            postCode={addressDetails.postCode}
            city={addressDetails.city}
            country={addressDetails.country}
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
