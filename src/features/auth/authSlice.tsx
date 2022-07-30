import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_ACCOUNT, PROPS_AUTHEN, PROPS_EVENTS } from "../types";
import { stat } from "fs";

const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const fetchAsyncLogin = createAsyncThunk(
  "auth/post",
  async (auth: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}auth/jwt/create`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (account: PROPS_ACCOUNT) => {
    const res = await axios.post(`${apiUrl}api/register/`, account, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsynCreateEvents = createAsyncThunk(
  "events/post",
  async (events: PROPS_EVENTS) => {
    const res = await axios.post(`${apiUrl}api/events/`, events, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsynUpdateEvent = createAsyncThunk(
  "events/put",
  async (events: PROPS_EVENTS) => {
    const uploadData = new FormData();
    uploadData.append("title", events.title);
    events.eventpics &&
      uploadData.append("eventpics", events.eventpics, events.eventpics.name);
    const res = await axios.put(
      `${apiUrl}api/events/{events.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetMyAccount = createAsyncThunk(
  "myaccont/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/myaccount/display`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data[0];
  }
);

export const fetchAsyncGetEvents = createAsyncThunk("events/get", async () => {
  const res = await axios.get(` ${apiUrl}api/events/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // サインイン用のモーダル
    openSignIn: true,
    // register用のモーダル
    openSignUp: false,
    // 右上のアカウントを押すと編集用のモーダルが出現
    openAccount: false,
    isLoadingAuth: false,
    myaccount: {
      id: 0,
      username: 0,
      email: 0,
      last_name: "",
      first_name: "",
      password: "",
      zip_code: "",
      address1: "",
      address2: "",
      address3: "",
      phone_number: "",
      user_icon: "",
      self_introduction: "",
    },
    account: [
      {
        id: 0,
        username: "",
        email: 0,
        last_name: "",
        first_name: "",
        password: "",
        zip_code: "",
        address1: "",
        address2: "",
        address3: "",
        phone_number: "",
        user_icon: "",
        self_introduction: "",
      },
    ],
    event: [
      {
        id: 0,
        jenre: "",
        title: "",
        eventpics: "",
        time: "",
        location: "",
        over_view: "",
      },
    ],
    // events: [
    //   {
    //     id: 0,
    //     jenre: "",
    //     title: "",
    //     eventpics: "",
    //     time: "",
    //     location: "",
    //     over_view: "",
    //   },
    // ],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchCredStart(state) {
      state.isLoadingAuth = true;
    },
    fetchCredEnd(state) {
      state.isLoadingAuth = false;
    },
    setOpenSignIn(state) {
      state.openSignIn = true;
    },
    resetOpenSignIn(state) {
      state.openSignIn = false;
    },

    setOpenSignUp(state) {
      state.openSignUp = true;
    },
    resetOpenSignUp(state) {
      state.openSignUp = false;
    },
    setOpenAccount(state) {
      state.openAccount = true;
    },
    resetOpenAccount(state) {
      state.openAccount = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
    });
    builder.addCase(fetchAsynCreateEvents.fulfilled, (state, action) => {
      state.event = action.payload;
    });
    builder.addCase(fetchAsyncGetMyAccount.fulfilled, (state, action) => {
      state.myaccount = action.payload;
    });
    builder.addCase(fetchAsyncGetEvents.fulfilled, (state, action) => {
      state.event = action.payload;
    });
    builder.addCase(fetchAsynUpdateEvent.fulfilled, (state, action) => {
      state.event = action.payload;
      state.event = state.event.map((eve) =>
        eve.id === action.payload.id ? action.payload : eve
      );
    });
  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenAccount,
  resetOpenAccount,
} = authSlice.actions;


export const selectIsLoadingAuth = (state: RootState) =>
  state.auth.isLoadingAuth;
export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp;
export const selectOpenAccount = (state: RootState) => state.auth.openAccount;
export const selectAccount = (state: RootState) => state.auth.myaccount;
export const selectAccounts = (state: RootState) => state.auth.account; 


export default authSlice.reducer;
