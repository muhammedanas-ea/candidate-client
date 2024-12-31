import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  accessToken: string | null;
  role: number[];
}

const initialState: AuthState = {
  userId: null,
  accessToken: null,
  role: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        userId: string;
        accessToken: string;
        role?: number;
      }>
    ) => {
      const { userId, accessToken, role } = action.payload;
      state.userId = userId;
      state.accessToken = accessToken;
      state.role = role !== undefined ? [role] : state.role;
    },
    updateToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.userId = null;
      state.accessToken = null;
      state.role = [];
    },
  },
});

export const { setCredentials, updateToken, logOut } = authSlice.actions;
export default authSlice.reducer;
