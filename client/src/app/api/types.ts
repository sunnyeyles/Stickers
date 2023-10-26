export interface IUser {
  _id: string
  email: string
  password?: string
  profileImage: string | null
}

export interface IUserResponse {
  user: IUser
  token: string
}

export interface IItemResponse {
  _id: string
  itemName: string
  itemPrice: string
  itemDescription: string
  imagePath: string
  itemCategory: string
  numOfItems: number
  reduced: boolean
  percentageReduced: number
  createdAt: string
  updatedAt: string
}

export interface IUserAddressInfo {
  firstName: string
  lastName: string
  streetName: string
  houseNumber: string
  postCode: string
  city: string
  country: string
}

export interface IPlacedOrderData extends IUserAddressInfo {}

export interface IShippingInfoFormData {}
