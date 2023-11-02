export interface IUser {
  _id: string
  email: string
  password?: string
  profileImage: string | null
  address?: object
}

export interface IUserResponse {
  user: IUser
  // token: string
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
  houseNumber: number | null | undefined
  postCode: number | null | undefined
  city: string
  country: string
}

export interface CartItem extends IItemResponse {
  quantity: number
  restItems?: number
}

export interface IPlacedOrderData extends IUserAddressInfo {}

export interface IShippingInfoFormData {}
