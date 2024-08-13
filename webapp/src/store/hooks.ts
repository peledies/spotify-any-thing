import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatchType, RootStateType } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();
export const useAppSelector = useSelector.withTypes<RootStateType>();
