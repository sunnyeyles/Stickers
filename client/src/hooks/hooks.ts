import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
 
// if you want to grab a value from the state into your app
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// dispatch, when you want to change something in the app
export const useAppDispatch = () => useDispatch<AppDispatch>() 