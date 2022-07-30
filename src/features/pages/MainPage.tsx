import React, { useEffect } from "react";
import Auth from "../auth/Auth";
import styles from "./MainPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import {
  //   Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";
// import { MdAddAPhoto } from "react-icons/md";

import {
  selectIsLoadingAuth,
  selectAccount,
  setOpenAccount,
  setOpenSignIn,
  resetOpenAccount,
  setOpenSignUp,
  resetOpenSignUp,
  selectOpenAccount,
  fetchAsyncGetMyAccount,
  selectOpenSignIn,
  selectAccounts,
  selectOpenSignUp,
  resetOpenSignIn,
} from "../auth/authSlice";

import {
  selectEvents,
  selectIsLoadingEvent,
  setOpenNewEvent,
  resetOpenNewEvent,
  fetchAsyncGetEvents,
  fetchAsyncNewEvent,
} from "../events/eventSlice";

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const events = useSelector(selectEvents);
  const account = useSelector(selectAccount);
  const isLoadingEvent = useSelector(selectIsLoadingEvent);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        dispatch(resetOpenSignIn());
        const result = await dispatch(fetchAsyncGetMyAccount());
        if (fetchAsyncGetMyAccount.rejected.match(result)) {
          dispatch(setOpenSignIn());
          return null;
        }
        await dispatch(fetchAsyncGetEvents());
        await dispatch(fetchAsyncGetMyAccount());
      }
    };
    fetchBootLoader();
  }, [dispatch]);
  return (
    <div>
      <Auth />
      <div className={styles.mainpage_header}>
        <h1 className={styles.mainpage_title}>Events</h1>
        {account?.email ? (
          <>
            <button
              className={styles.mainpage_btnModal}
              onClick={() => {
                dispatch(resetOpenAccount());
                dispatch(setOpenNewEvent());
              }}
            >
              {/* <MdAddAPhoto /> */}
            </button>
            <div className={styles.mainpage_logout}>
              {(isLoadingEvent || isLoadingAuth) && <CircularProgress />}
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.removeItem("localJWT");
                  dispatch(resetOpenAccount());
                  dispatch(resetOpenNewEvent());
                  dispatch(setOpenSignIn());
                }}
              >
                ログアウト
              </Button>
              <button
                className={styles.mainpage_btnModal}
                onClick={() => {
                  dispatch(setOpenAccount());
                  dispatch(resetOpenNewEvent());
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar alt="who?" src={account.user_icon} />{" "}
                </Badge>
              </button>
            </div>
          </>
        ) : (
          <div>
            <Button
              onClick={() => {
                dispatch(setOpenSignIn());
                dispatch(resetOpenSignUp());
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                dispatch(setOpenSignUp());
                dispatch(resetOpenSignIn());
              }}
            >
              SignUp
            </Button>
          </div>
        )}
      </div>

      {account?.id && (
        <>
        <div className={styles.mainpage_events}>
            <Grid container spacing={4}>
                <events
                .slice(0)
                .reverse()
                .map((event) => (
                    <Grid key={event.user_id} item xs={12} md={4}>
                        <Event
                        EventId={event.id}
                        Title={event.title}
                        />
                        </Grid>
                        ))}
                
            </Grid>
        </div></>)}
    </div>
  );
};

export default MainPage;
