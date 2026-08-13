import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  business_id?: number;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  role: string;
  status: number | string;
  avatar?: string | null;
}

export interface Business {
  id: number;
  name: string;
  type: string;
  gst_number: string | null;
  phone: string;
  email: string;
  address: string;
  city: string | null;
  state: string | null;
  country: string | null;
  logo_path: string | null;
  opening_time: string | null;
  closing_time: string | null;
  timezone: string | null;
  status: string;
}

interface AuthState {
  user: User | null;
  business: Business | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  business: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; business?: Business; token: string }>) => {
      state.user = action.payload.user;
      if (action.payload.business) {
        state.business = action.payload.business;
      }
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.business = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, setInitialized, updateUser } = authSlice.actions;
export default authSlice.reducer;
