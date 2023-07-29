import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Redefine standard hooks `useDispatch` and `useSelector`, add TS typing
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
