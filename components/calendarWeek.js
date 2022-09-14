import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
import { Time } from "../json/itemCalendar";
export default function CalendarWeek(props) {
  const [target, setTarget] = React.useState("");
  const [events, setEvents] = useState([{ id: 1, start: 70, end: 150 }]);
  const [position, setPosition] = useState(null);
  const [frame] = React.useState({
    translate: [0, 0],
  });

  function setMaxHeight(e, node) {
    var parentPos = document.getElementById("bodyDay").getBoundingClientRect();
    var childPos = e.getBoundingClientRect();
    let top = childPos.top - parentPos.top;
    let max = 900 - top - 50 + "px";
    console.log("max:", max);
    console.log(top);
    return max;
  }
  useEffect(() => {
    try {
      let str = target;
      let letterCount = str.replace(/\s+/g, "").length;
      if (letterCount < 20) {
        setTarget(document.getElementById(target));
      }
    } catch (error) {}
  }, [target]);
  useEffect(
    (e) => {
      console.log(events);
      /*  console.log(roundnum(102)); */
    },
    [events]
  );

  var layOutDay = function (events) {
    var eventsLength = events.length;
    var timeslots = [];
    var event, i, j;
    var returnEvent = [];
    events = events.sort(function (a, b) {
      return a.id - b.id;
    });
    for (i = 0; i < 1000; i++) {
      timeslots[i] = [];
    }
    for (i = 0; i < eventsLength; i++) {
      event = events[i];

      for (j = event.start; j < event.end; j++) {
        timeslots[j].push(event.id);
      }
    }
    for (i = 0; i < 1000; i++) {
      var next_hindex = 0;
      var timeslotLength = timeslots[i].length;
      if (timeslotLength > 0) {
        for (j = 0; j < timeslotLength; j++) {
          event = events[timeslots[i][j] - 1];
          if (!event.cevc || event.cevc < timeslotLength) {
            event.cevc = timeslotLength;
            if (!event.hindex) {
              event.hindex = next_hindex;
              next_hindex++;
            }
          }
        }
      }
    }
    for (i = 0; i < events.length; i++) {
      event = events[i];
      event.pxh = event.end - event.start;
      event.pxy = event.start;
      event.pxw = 160 / event.cevc;
      event.pxx = event.hindex * event.pxw;
      returnEvent.push(
        <Draggable
          axis="y"
          grid={[
            50,
            Math.abs(roundnum(event.pxy) - event.pxy) === 0
              ? 50
              : Math.abs(Math.abs(roundnum(event.pxy) - event.pxy) - 50),
          ]}
          position={position}
          bounds={"parent"}
          onStop={(e) => {
            setPosition({ y: 0, x: 0 });
            var parentPos = document
              .getElementById("bodyDay")
              .getBoundingClientRect();
            var childPos = e.target.getBoundingClientRect();
            let top = childPos.top - parentPos.top;
            let height = top + e.target.clientHeight;
            setTime(top, height, e.target.getAttribute("data-id"));
          }}
        >
          <div
            className="divItemMonth "
            id={"targetTues" + i}
            data-id={i + 1}
            onMouseUp={(e) => {
              e.stopPropagation();
              console.log("test");
            }}
            onClick={(e) => {
              e.stopPropagation();
              setTarget(e.currentTarget.id);
            }}
            style={{
              width: event.pxw + "px",
              height: event.pxh + "px",
              left: event.pxx + "px",
              top: event.pxy + "px",
            }}
          >
            <p className="p1">Task Title</p>
          </div>
        </Draggable>
      );
    }

    return returnEvent;
  };

  function setTime(x, y, z) {
    const newState = events.map((obj) => {
      if (obj.id === parseInt(z)) {
        if (obj.top != x) {
          return { ...obj, start: Math.round(x / 50) * 50, end: y };
        } else {
          return { ...obj };
        }
      }
      return obj;
    });

    setEvents(newState);
  }

  function roundnum(num) {
    return Math.round(num / 50) * 50;
  }
  return (
    <table className="tblWeek">
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
          console.log(e.target);
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
      <thead id="thead">
        <tr>
          <th
            style={{ minWidth: "50px", maxWidth: "50px", width: "50px" }}
          ></th>
          {props.weeks?.map((date, i) => (
            <th key={i}>
              <p>{moment(date).format("dd")}</p>
              <p>{new Date(date).getDate()}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="bodyDay">
        {Time.map((number, i) => (
          <tr key={i} data-time={i === 12 ? "13" : ""} id={"trDay" + i}>
            <td>{number}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
        <Container fluid className="conTblWeek" id="conTblWeek">
          <Row>
            <Col>{layOutDay(events)}</Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </tbody>
    </table>
  );
}
