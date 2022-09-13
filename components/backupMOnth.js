import { useUpdate } from "@codepurse/navix";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import Moveable from "react-moveable";
import { ItemMonth } from "../json/itemCalendar";
export default function CalendarMonth(props) {
  const weekName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [snapHeight, setSnapHeight] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
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
  const [selectedItem, setSelectedItem] = useState();
  const [target, setTarget] = React.useState("");
  const [frame] = React.useState({
    translate: [0, 0],
  });

  useEffect((e) => {
    setSnapHeight(document.getElementById("tblBodyMonth").clientWidth / 7);
    console.log(ItemMonth);
  }, []);

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

  function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add("tdDrag");
  }
  function onDragLeave(e) {
    e.currentTarget.classList.remove("tdDrag");
  }
  function onDrop(e) {
    console.log(e.currentTarget.id);
    e.currentTarget.classList.remove("tdDrag");
    document
      .getElementById(e.currentTarget.id)
      .appendChild(document.getElementById(selectedItem));
  }

  function setMaxWidth(e) {
    var parentPos = document
      .getElementById("tblBodyMonth")
      .getBoundingClientRect();
    var childPos = e.getBoundingClientRect();
    let left = childPos.left - parentPos.left;
    let max = left - snapHeight;
    console.log(max);
    return max;
  }
  return (
    <table style={{ height: "100%" }} className="tblMonth">
      <Moveable
        target={target}
        resizable={true}
        renderDirections={["e"]}
        snapThreshold={snapHeight}
        snapGridWidth={snapHeight}
        snappable={true}
        onResizeStart={(e) => {
          e.setOrigin(["%", "%"]);
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onResizeEnd={(e) => {
          console.log(e.target.style.height);
        }}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;
          frame.translate = beforeTranslate;
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          let max = setMaxWidth(e.target);
          /* e.target.style.maxHeight = max; */
        }}
      />
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
                <div
                  className="divMonthInner"
                  id={"divMonth" + i + y}
                  data-id={d}
                  onDragOver={allowDrop}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  <p className="pDay"> {d}</p>
                  {d === 5 || d === 23 ? (
                    <Fragment>
                      <div
                        className="divListMonth"
                        id={"monthItem" + d}
                        style={{ minWidth: snapHeight - 20 + "px" }}
                        onClick={(e) => {
                          setTarget(e.currentTarget.id);
                        }}
                        onMouseDown={(e) => {
                          setSelectedItem(e.currentTarget.id);
                        }}
                        draggable
                      >
                        <p className="p1">Meeting with Johnny Sins</p>
                      </div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
