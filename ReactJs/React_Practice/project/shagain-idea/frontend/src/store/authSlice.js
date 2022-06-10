import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {
    activated: null,
  },
  otp: {
    phoneNo: "",
    hash: "",
    expire: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
    
  reducers: {
    setAuth: (state, action) => {
      const {user} = action.payload;
      state.user = user;
      state.isAuth = true;
    },
    setOtp: (state, action) => {
      const { phoneNo, hash, expire } = action.payload;
      state.otp.phoneNo = phoneNo;
      state.otp.hash = hash;
      state.otp.expire = expire;
    },
  },
});

export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
