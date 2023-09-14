import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RoostState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RoostState> = useSelector