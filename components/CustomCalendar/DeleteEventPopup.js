import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FormControlLabel, Radio, Typography } from "@mui/material";
import BaseDialog from "components/Common/Dialog";
import { fetchEventsStart } from "redux/events/eventsSlice";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

const DeleteEventPopup = ({ event, open, handleClose }) => {
  const dispatch = useDispatch();

  const handleRemoveEvent = () => {
    const data = {
      id: event._id,
    };
    fetch("/api/events", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        handleClose();

        dispatch(fetchEventsStart());
      });
  };

  return (
    <BaseDialog open={open} handleClose={handleClose}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "480px",
          flexDirection: "column",
          paddingLeft: "8px",
          paddingRight: "8px",
          marginTop: "16px",
        }}
      >
        <Typography fontSize={`20px`} fontWeight={`700`} paddingBottom="16px">
          Do you really want to delete this event?
        </Typography>

        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <PrimaryButton title={`Confirm`} onClick={handleRemoveEvent}>
            Confirm
          </PrimaryButton>
        </div>
      </div>
    </BaseDialog>
  );
};

export default DeleteEventPopup;
