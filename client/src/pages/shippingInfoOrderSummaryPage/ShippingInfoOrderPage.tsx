import { useEffect, useState, useRef } from 'react'
import { Grid, Box, Text, Header, Button } from '@mantine/core'
import { OrderSummaryCard } from '../../components/orderSummaryCard/OrderSummaryCard'
import { ShippingInfoForm } from '../../components/shippingInfoForm/ShippingInfoForm'
import { IShippingAddressInfo } from '../../components/confirm_address_details/confirm_address_details_types'
import { ConfirmAddressDetails } from '../../components/confirm_address_details/ConfirmAddressDetails'

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
  const [addressCorrect, setAddressCorrect] = useState<boolean>(false)
  const handleAddressChange = () => {
    addressCorrect === true ? setAddressCorrect(false) : setAddressCorrect(true)
  }

  return (
    <Grid justify="space-around" gutterSm={25} gutterMd={60}>
      <Grid.Col xs={12} sm={12} lg={5}>
        {!addressCorrect ? (
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
