import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_NEWEVENT } from "../types";

const apiUrlEvent = `${process.env.REACT_APP_DEV_API_URL}api/events/`;

// eventの一覧取得
export const fetchAsyncGetEvents = createAsyncThunk("events/get", async () => {
  const res = await axios.get(apiUrlEvent, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

// 新規のeventを作成
export const fetchAsyncNewEvent = createAsyncThunk(
  "event/post",
  async (newEvent: PROPS_NEWEVENT) => {
    const uploadData = new FormData();
    uploadData.append("title", newEvent.title);
    newEvent.eventpics &&
      uploadData.append(
        "eventpics",
        newEvent.eventpics,
        newEvent.eventpics.name
      );
    const res = await axios.post(apiUrlEvent, uploadData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);
export const eventSlice = createSlice({
  name: "event",
  initialState: {
    isLoadingEvent: false,
    openNewEvent: false,
    events: [
      {
        user_id: "",
        jenre: "",
        title: "",
        eventpics: null,
        time: "",
        location: "",
        over_view: "",
      },
    ],

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
  },

  reducers: {
    fetchEventStart(state) {
      state.isLoadingEvent = true;
    },
    fetchEventEnd(state) {
      state.isLoadingEvent = false;
    },
    setOpenNewEvent(state) {
      state.openNewEvent = true;
    },
    resetOpenNewEvent(state) {
      state.openNewEvent = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetEvents.fulfilled, (state, action) => {
      return {
        ...state,
        events: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewEvent.fulfilled, (state, action) => {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    });
  },
});

export const {
  fetchEventStart,
  fetchEventEnd,
  setOpenNewEvent,
  resetOpenNewEvent,
} = eventSlice.actions;

export const selectIsLoadingEvent = (state: RootState) =>
  state.event.isLoadingEvent;
export const selectOpenNewEvent = (state: RootState) => state.event.openNewEvent;
export const selectEvents = (state: RootState) => state.event.events;


export default eventSlice.reducer;
