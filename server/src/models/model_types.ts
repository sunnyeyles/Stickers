import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  userName: string | null
  email: string
  password: string
  address: {
    street: string
    streetNumber: number
    city: string
    postCode: string
  } | null
  shoppingCart: object[] | null
  orders: object[] | null
  terms: boolean
}

export interface IItem extends Document {
  _id: mongoose.Types.ObjectId
  itemName: string
  itemPrice: string
  itemDescription: string
  imagePath: string
  itemCategory: string
  numOfItems: number
  reduced?: boolean
  percentageReduced?: number
}
