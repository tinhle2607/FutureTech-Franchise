import { createSlice } from "@reduxjs/toolkit";
import { httpClient, REFRESH_TOKEN, TOKEN_AUTHOR, USER_LOGIN } from "../../Utils/Interceptors";
import { getDataJSONStorage, setDataJSONStorage, setDataTextStorage } from "../../Utils/UtilsFunction";
import { message } from "antd";

const initialState = {
  userLogin: getDataJSONStorage(USER_LOGIN),
};

const AuthenticationReducer = createSlice({
  name: "AuthenticationReducer",
  initialState,
  reducers: {
    setUserLogin: (state, action)=>{
      state.userLogin = action.payload
    }
  },
});

export const {setUserLogin} = AuthenticationReducer.actions;

export default AuthenticationReducer.reducer;
//------------API CALL------------
export const LoginActionAsync = (dataLogin) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post(`/api/v1/auth/login`, dataLogin);

      dispatch(setUserLogin(res.data.userViewModel))
      setDataJSONStorage(USER_LOGIN, res.data.userViewModel);
      setDataTextStorage(TOKEN_AUTHOR, res.data.refreshTokenModel.accessToken);
      setDataTextStorage(REFRESH_TOKEN, res.data.refreshTokenModel.refreshToken);
      message.success(`${res.message}`);

    } catch (error) {
      console.error(error);
    }
  };
};
