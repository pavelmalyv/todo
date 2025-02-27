import type { RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	isProfileComplete: boolean;
}

const initialState: AuthState = {
	isProfileComplete: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsProfileComplete: (state, action: PayloadAction<boolean>) => {
			state.isProfileComplete = action.payload;
		},
	},
});

export const { setIsProfileComplete } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectProfileComplete = (state: RootState) => state.auth.isProfileComplete;
