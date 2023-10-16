import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserAddressInfo } from '../../api/types'

const initialState: IUserAddressInfo = {
  email: '',
  firstName: '',
  lastName: '',
  streetName: '',
  houseNumber: '',
  postCode: '',
  city: '',
  country: '',
}

export const userAddressInfoSlice = createSlice({
  name: 'addressInfo',
  initialState,
  reducers: {
    setAddressInfoState: (state, action: PayloadAction<IUserAddressInfo>) => {
      return { ...state, ...action.payload }
    },
  },
})
export const { setAddressInfoState } = userAddressInfoSlice.actions
