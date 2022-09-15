import moment from "moment";
import React, { Fragment, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
import { ItemCalendar, Time } from "../json/itemCalendar";
import CalendarContext from "./calendarContext";
export default function CalendarDay(props) {
  const { date } = useContext(CalendarContext);
  const [target, setTarget] = React.useState("");
  const [frame] = React.useState({
    translate: [0, 0],
  });

  var events = [
    { id: 1, start: 30, end: 150 }, // an event from 9:30am to 11:30am
    { id: 2, start: 540, end: 600 }, // an event from 6pm to 7pm
    { id: 3, start: 560, end: 620 }, // an event from 6:20pm to 7:20pm
    { id: 4, start: 610, end: 670 }, // an event from 7:10pm to 8:10pm
  ];

  React.useEffect(() => {
    try {
      let str = target;
      let letterCount = str.replace(/\s+/g, "").length;
      if (letterCount < 13) {
        setTarget(document.getElementById(target));
      }
    } catch (error) {}
  }, [target]);

  function setMaxHeight(e, node) {
    var parentPos = document.getElementById("bodyDay").getBoundingClientRect();
    var childPos = e.getBoundingClientRect();
    let top = childPos.top - parentPos.top;
    let max = 900 - top - 50 + "px";
    console.log("max:", max);
    console.log(top);
    return max;
  }

  function setTop(e) {
    return (moment(e).hour() - 8) * 50;
  }

  function setHeight(x, y) {
    return moment.duration(moment(x).diff(y)).asHours() * 50;
  }

  function setWidth(x) {
    var width = 100 - x * 5 + "%";
    return width;
  }

  return (
    <table className="tblDay1">
      <Moveable
        target={target}
        resizable={true}
        renderDirections={["sw", "s", "se"]}
        snapThreshold={50}
        snapGridHeight={50}
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
          let max = setMaxHeight(e.target);
          e.target.style.maxHeight = max;
        }}
      />
      <thead>
        <tr>
          <th
            style={{ minWidth: "50px", maxWidth: "50px", width: "50px" }}
          ></th>
          <th>
            <div className="divTh">
              <p>{moment(date).format("dd")}</p>
              <p>{new Date(date).getDate()}</p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody id="bodyDay">
        {Time.map((number, i) => (
          <tr key={i} data-time={i === 12 ? "13" : ""} id={"trDay" + i}>
            <td>{number}</td>
            <td></td>
          </tr>
        ))}
        <Container className="conTblDay">
          <Row>
            <Fragment>
              <Col>
                {ItemCalendar.map((event, i) => (
                  <Draggable
                    axis="y"
                    onMouseDown={(e) => {
                      const spans = document.querySelectorAll(".divItemCal");
                      for (let i = 0; i < spans.length; i++) {
                        const span = spans[i];
                        span.classList.add("unselectedDay");
                      }
                    }}
                    grid={[50, 50]}
                    bounds={"#bodyDay"}
                    onStop={(e) => {
                      document
                        .getElementById("targetDay" + i)
                        .classList.remove("selectedDay");
                      const spans = document.querySelectorAll(".divItemCal");
                      for (let i = 0; i < spans.length; i++) {
                        const span = spans[i];
                        span.classList.remove("unselectedDay");
                      }
                    }}
                    onDrag={(e) => {
                      e.stopPropagation();
                      document
                        .getElementById("targetDay" + i)
                        .classList.add("selectedDay");
                    }}
                  >
                    <div
                      style={{
                        top: setTop(event.date_from),
                        height: setHeight(event.date_to, event.date_from),
                        width: setWidth(i),
                      }}
                      className="divItemCal target"
                      id={"targetDay" + i}
                      onMouseDown={(e) => {}}
                      onMouseUp={(e) => {
                        e.stopPropagation();
                        console.log("test");
                      }}
                      onClick={(e) => {
                        setTarget(e.currentTarget.id);
                      }}
                    >
                      <p className="p1"></p>
                      <p className="p2">Meeting with John Sins</p>
                    </div>
                  </Draggable>
                ))}
              </Col>
            </Fragment>
          </Row>
        </Container>
      </tbody>
    </table>
  );
}
