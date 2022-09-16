import { useUpdate } from "@codepurse/navix";
import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import CalendarContext from "./calendarContext";
const weekNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function App(props) {
  const value = useContext(CalendarContext);
  const [date, setDate] = useState(
    moment(
      new Date(
        new Date(value.date).getFullYear(),
        new Date(value.date).getMonth(),
        1
      )
    )
  );
  const dateNow = new Date();
  const [selectedDate, setSelectedDate] = useState(dateNow.getDate());
  const [days, setDays] = useState(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setDays(getDaysInaMonth(date));
  }, [date]);

  const handleClickPrev = useCallback(
    (event) => {
      const clonedDate = date.clone();
      clonedDate.subtract(1, "months");
      setDate(clonedDate);
    },
    [date]
  );

  const handleClickNext = useCallback(
    (event) => {
      const clonedDate = date.clone();
      clonedDate.add(1, "months");
      setDate(clonedDate);
    },
    [date]
  );

  useUpdate(
    (e) => {
      setDate(
        moment(
          new Date(
            new Date(value.date).getFullYear(),
            new Date(value.date).getMonth(),
            1
          )
        )
      );
    },
    [value]
  );

  useEffect((e) => {
    const element = document.getElementById("circle");
    try {
      var strLength = selectedDate.toString().replace(/\s+/g, "").length;
    } catch (error) {}
    try {
    } catch (error) {}
    const dateSelected = document.getElementById("selected");
    try {
      if (selectedDate && !toggle) {
        if (strLength < 2) {
          element.style.left = dateSelected.offsetLeft - 13 + "px";
        } else {
          element.style.left = dateSelected.offsetLeft - 8 + "px";
        }
        element.style.top = dateSelected.offsetTop - 5 + "px";
      }
    } catch (error) {}
  });

  function getDaysInaMonth(mDate) {
    const date = mDate.toDate();
    const week = date.getDay();
    const prevMDayCount = mDate.clone().subtract(1, "months").daysInMonth();
    const dayCount = mDate.daysInMonth();
    const days = [];
    for (let i = 0; i < week; i += 1) {
      days.push(prevMDayCount - (week - i) + 2);
    }
    for (let i = 0; i < dayCount; i += 1) {
      days.push(i + 1);
    }
    const length = days.length;
    if (length < 35) {
      for (let i = length; i < 35; i++) {
        days.push(i - length + 1);
      }
    } else if (length > 35) {
      for (let i = length; i < 42; i++) {
        days.push(i - length + 1);
      }
    }
    return days;
  }

  return (
    <div className="calendar_container">
      <div
        className="circle"
        id="circle"
        style={{ display: toggle ? "none" : selectedDate ? "" : "none" }}
      ></div>
      <div className="calendarToggle">
        <i
          style={{ transform: toggle ? "rotate(180deg)" : "rotate(0deg)" }}
          onClick={(e) => {
            setToggle((prev) => !prev);
          }}
        >
          <MdKeyboardArrowUp />
        </i>
      </div>
      <div
        className="calendar_header"
        style={{ marginTop: toggle ? "-23px" : "" }}
      >
        <div className="calendar_month">{date.format("MMMM YYYY")}</div>
        <button
          onClick={(e) => {
            handleClickPrev();
            setSelectedDate(null);
          }}
        >
          <i>
            <RiArrowLeftSLine />
          </i>
        </button>
        <button
          onClick={(e) => {
            handleClickNext();
            setSelectedDate(null);
          }}
        >
          <i>
            <RiArrowRightSLine />
          </i>
        </button>
      </div>
      <div className="calendar_body" style={{ display: toggle ? "none" : "" }}>
        {weekNames?.map((wname, index) => (
          <p key={index} className="calendar_week">
            {wname}
          </p>
        ))}
        {days?.map((day, index) => (
          <p
            key={index}
            onClick={(e) => {
              if (!e.currentTarget.className.includes("disabled")) {
                setSelectedDate(day);
                props.onChange(moment(date).set("date", day));
              }
            }}
            id={
              selectedDate != day
                ? ""
                : (day < 7 && index > 27) || (day > 20 && index < 7)
                ? ""
                : "selected"
            }
            className={`calendar_day ${
              (day < 7 && index > 27) || (day > 20 && index < 7)
                ? "disabled"
                : ""
            }`}
          >
            {day}
          </p>
        ))}
      </div>
    </div>
  );
}
