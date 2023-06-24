import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import CreateEventPopUp from "./CreateEventPopup";
import { setEventData } from "redux/events/eventsSlice";
import DeleteEventPopup from "./DeleteEventPopup";
const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

let currentDate = new Date();
let currentDay = currentDate.getDay();

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(currentDate, { weekStartsOn: currentDay }),
  getDay,
  locales,
});

const customDayPropGetter = (date) => {
  const currentDate = new Date();
  if (date < currentDate)
    return {
      className: "disabled-day",
      style: {
        cursor: "not-allowed",
        background: "rgba(184, 184, 184, 0.1)",
      },
    };
  else return {};
};

const CustomCalendar = ({ events = [], height, style, ...calendarProps }) => {
  const calendarRef = React.createRef();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [data, setData] = useState({});

  const setEventCellStyling = (event) => {
    if (event.background) {
      let style = {
        background: "rgba(7, 97, 125, 0.1)",
        border: `1px solid ${event.background}`,
        color: "#07617D",
        borderLeft: `3px solid ${event.background}`,

        fontWeight: 600,
        fontSize: "11px",
      };
      return { style };
    }
    let style = {
      background: "rgba(7, 97, 125, 0.1)",
      border: `1px solid #07617D`,
      color: "#07617D",
      borderLeft: "3px solid #07617D",

      fontWeight: 600,
      fontSize: "11px",
    };
    return { style };
  };

  const formats = {
    weekdayFormat: "EEE",
    timeGutterFormat: "hh a",
  };

  const handleSelect = ({ start, end }) => {
    const currentDate = new Date();
    if (start < currentDate) {
      return null;
    }
    if (start > end) return;

    handleOpenPopup();
    dispatch(setEventData({ start, end }));
  };
  const handleOpenPopup = () => {
    setOpenDialog(true);
  };
  const handleEventSelect = (event) => {
    handleRemoveDialogOpen();
    setData(event);
    console.log(event)
  };
  const handleRemoveDialogOpen = () => {
    setOpenRemoveDialog(true);
  };
  const handleRemoveDialogClose = () => {
    setOpenRemoveDialog(false);
    setEventData({});
    setData({});
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    dispatch(setEventData({}));
  };

  return (
    <>
      <DragAndDropCalendar
        ref={calendarRef}
        localizer={localizer}
        formats={formats}
        popup={true}
        events={events}
        selectable
        resizable
        longPressThreshold={1}
        eventPropGetter={setEventCellStyling}
        dayPropGetter={customDayPropGetter}
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
        views={{ week: true }}
        step={30}
        drilldownView={"week"}
        scrollToTime={currentDate.getHours()}
        defaultView={"week"}
        style={{ height: height ? height : "68vh", ...style }}
        {...calendarProps}
      />

      <CreateEventPopUp open={openDialog} handleClose={handleDialogClose} />
      <DeleteEventPopup
        open={openRemoveDialog}
        handleClose={handleRemoveDialogClose}
        event={data}
      />
    </>
  );
};

export default CustomCalendar;
