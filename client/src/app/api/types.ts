export interface IUser {
  email: string
  password?: string
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
  image: string
  itemCategory: string
  itemsInStock: number
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
  email: string
}
