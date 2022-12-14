import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
import { Time } from "../json/itemCalendar";
import CalendarContext from "./calendarContext";
export default function CalendarDay(props) {
  const { date } = useContext(CalendarContext);
  const [dragStart, setDragStart] = useState(false);
  const [target, setTarget] = React.useState("");
  const [width, setWidth] = useState();
  const [position, setPosition] = useState(null);
  const [top, setTop] = useState(0);
  const [frame] = React.useState({
    translate: [0, 0],
  });

  const [events, setEvents] = useState([
    { id: 1, start: 50, end: 150 },
    { id: 2, start: 250, end: 300 },
  ]);
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
    let height = childPos.height;
    let offsetTop = top + height;
    let max = height + (850 - offsetTop) + 5 + "px";
    return max;
  }

  var bgcolor = ["#9f77ed", "#12b76a", "#ebaa08", "#2196F3", "#3F51B5"];
  useEffect(
    (e) => {
      console.log(events);
    },
    [events]
  );
  function isWhatPercentOf(numA, numB) {
    return (numA / numB) * 100;
  }
  useEffect((e) => {
    setWidth(document.getElementById("bodyDay").offsetWidth);
  }, []);

  function layOutDay(data, cname) {
    var eventsLength = data.length;
    var timeslots = [];
    var event, i, j;
    var returnEvent = [];
    var eventsSort = [];
    eventsSort = data.sort(function (a, b) {
      return a.id - b.id;
    });
    eventsSort.cevc = 0;
    for (i = 0; i < 1000; i++) {
      timeslots[i] = [];
    }
    for (i = 0; i < eventsLength; i++) {
      event = eventsSort[i];

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
          if (!event.cevc || event.cevc < timeslotLength || event === null) {
            event.cevc = timeslotLength;
          }
          event.hindex = next_hindex;
          next_hindex++;
        }
      }
    }
    for (i = 0; i < eventsSort.length; i++) {
      event = eventsSort[i];
      event.pxh = event.end - event.start;
      event.pxy = event.start;
      event.pxw = width / event.cevc;
      event.pxx = event.hindex * event.pxw;
      event.cevc = null;
      event.hindex = null;
      returnEvent.push(
        <Draggable
          axis="y"
          grid={[
            50,
            Math.abs(roundnum(event.start) - event.start) === 0
              ? 50
              : Math.abs(Math.abs(roundnum(event.start) - event.start) - 50),
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
            setTime(
              top,
              height,
              e.target.getAttribute("data-id"),
              e.target.getAttribute("data-data")
            );
          }}
        >
          <div
            className="divItemMonth "
            id={cname + i}
            data-id={i + 1}
            data-data={cname}
            onMouseUp={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              setTarget(e.currentTarget.id);
            }}
            style={{
              width: isWhatPercentOf(event.pxw, width).toFixed(2) + "%",
              height: event.pxh + "px",
              left: isWhatPercentOf(event.pxx, width).toFixed(2) + "%",
              top: event.pxy + "px",
              background: "#12b76a",
              opacity: dragStart ? "0.5" : "",
            }}
            bac
          >
            <p className="p1">Task Title</p>
          </div>
        </Draggable>
      );
    }
    return returnEvent;
  }

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
            <td
              onDragEnter={(e, text) => {
                e.preventDefault();
                document.getElementById("divTimeClone").style.display = "block";
                setTop(e.currentTarget.offsetTop);
                setDragStart(true);
                e.dataTransfer.setDragImage(new Image(), 0, 0);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                console.log("drop");
                setDragStart(false);
                events.push({
                  id: events.length + 1,
                  start: top,
                  end: top + 50,
                });
              }}
            ></td>
          </tr>
        ))}
        <Container fluid className="conTblDay" id="conTblDay">
          <Row>
            <div id="divTimeClone" style={{ top: top + "px" }}></div>
            <Col>{layOutDay(events)}</Col>
          </Row>
        </Container>
      </tbody>
    </table>
  );
}
