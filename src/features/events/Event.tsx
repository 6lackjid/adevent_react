import React, { useState } from 'react';
import Styles from "./Event.module.css";
import AvatarGroup from '@mui/material/AvatarGroup';
import {useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '../../app/store';
import { selectAccounts } from '../auth/authSlice';

import {
selectEvents,
fetchEventStart,
fetchEventEnd,
} from "./eventSlice";

import { PROPS_EVENTS } from "../types";

import Avatar from '@mui/material/Avatar';

<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

const Event: React.FC<PROPS_EVENTS> = ({
id,
jenre,
title,
eventpics,
time,
location,
over_view,

}) => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const events = useSelector(selectEvents);
    const accounts = useSelector(selectAccounts);
    const [text, setText ] = useState("");
    
  return (
    <div></div>
  )
};

export default Event;