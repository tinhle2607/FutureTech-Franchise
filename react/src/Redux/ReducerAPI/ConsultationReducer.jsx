import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../Utils/Interceptors";

const initialState = {
  franchiseConsult: [
    {
      id: "d9bb3fcf-4053-44ed-0d94-08dcd8667c32",
      cusomterName: "hieu",
      email: "hieu@gmail.com",
      phoneNumber: 902451769,
      address: "123 street",
      status: "NotConsulted",
      consultantUserName: null,
    },
  ],
};

const ConsultationReducer = createSlice({
  name: "ConsultationReducer",
  initialState,
  reducers: {
    setFranchiseConsult: (state, action) => {
      state.franchiseConsult = action.payload;
    },
  },
});

export const { setFranchiseConsult } =
  ConsultationReducer.actions;

export default ConsultationReducer.reducer;
//------------API CALL------------
export const GetFranchiseRegistrationConsultActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await httpClient.get(
        `/api/v1/franchiseRegistrationRequests`
      );
      console.log(res.data.items);
      dispatch(setFranchiseConsult(res.data.items))
    } catch (error) {
      console.error(error);
    }
  };
};
