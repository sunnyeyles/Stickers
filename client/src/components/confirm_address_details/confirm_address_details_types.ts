export interface IShippingAddressInfo {
  firstName: string
  lastName: string
  streetName: string
  houseNumber: number
  postCode: number
  city: string
  country: string
}

export interface IConfirmAddressProps extends IShippingAddressInfo {
  handleAddressChange: () => void
}
