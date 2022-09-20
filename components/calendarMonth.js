import { useUpdate } from "@codepurse/navix";
import moment from "moment";
import React, { useEffect, useState } from "react";
export default function CalendarMonth(props) {
  const weekName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [date, setDate] = useState(
    moment(
      new Date(
        new Date(props.date).getFullYear(),
        new Date(props.date).getMonth(),
        1
      )
    )
  );
  const [days, setDays] = useState([]);
  const [target, setTarget] = React.useState("");

  function getDaysInaMonth(mDate) {
    const date = mDate.toDate();
    const week = date.getDay();
    const prevMDayCount = mDate.clone().subtract(1, "months").daysInMonth();
    const dayCount = mDate.daysInMonth();

    const days = [];
    for (let i = 0; i < week; i += 1) {
      days.push(prevMDayCount - (week - i) + 1);
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

  useUpdate(
    (e) => {
      if (props.date) {
        setDate(
          moment(
            new Date(
              new Date(props.date).getFullYear(),
              new Date(props.date).getMonth(),
              1
            )
          )
        );
      }
    },
    [props.date]
  );

  useEffect(
    (e) => {
      var returnDays = getDaysInaMonth(date);
      var arrays = [],
        size = 7;
      while (returnDays.length > 0) arrays.push(returnDays.splice(0, size));
      setDays(arrays);
    },
    [date]
  );

  useUpdate(() => {
    try {
      let str = target;
      let letterCount = str.replace(/\s+/g, "").length;
      if (letterCount < 13) {
        setTarget(document.getElementById(target));
      }
    } catch (error) {}
  }, [target]);

  return (
    <table style={{ height: "100%" }} className="tblMonth">
      <thead>
        <tr>
          {weekName.map((date, i) => (
            <th key={i}>
              <p>{date}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="tblBodyMonth">
        {days.map((date, y) => (
          <tr key={y}>
            {date.map((d, i) => (
              <td key={i}>
                <div className="divMonthInner">
                  <p className="pDay"> {d}</p>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
