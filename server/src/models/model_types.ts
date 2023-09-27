import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  userName: string | null
  email: string
  password: string
  shoppingCart: object[] | null
  address: {
    street: string
    streetNumber: number
    city: string
    postCode: string
  } | null
  terms: boolean
}

export interface IItem extends Document {
  _id: mongoose.Types.ObjectId
  itemName: string
  itemPrice: string
  itemDescription: string
  image: string
  itemCategory: string
  itemsInStock: number
  reduced?: boolean
  percentageReduced?: number
}
