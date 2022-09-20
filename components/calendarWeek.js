import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
import { Time } from "../json/itemCalendar";
export default function CalendarWeek(props) {
  const [target, setTarget] = React.useState("");
  const [top, setTop] = useState(0);
  const [dragStart, setDragStart] = useState(false);
  const weekName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState();
  const [day, setDay] = useState("");
  const [id, setId] = useState("");
  const [eventsMon, setEvents] = useState([{ id: 1, start: 50, end: 250 }]);
  const [eventsTues, setEventsTues] = useState([
    { id: 1, start: 300, end: 350 },
  ]);
  const [eventsWed, setEventsWed] = useState([{ id: 1, start: 300, end: 350 }]);
  const [position, setPosition] = useState(null);
  const [frame] = React.useState({
    translate: [0, 0],
  });

  useEffect((e) => {
    setWidth(parseInt(document.getElementById("conTblWeek").offsetWidth / 7));
  });

  function setMaxHeight(e, node) {
    var parentPos = document.getElementById("bodyDay").getBoundingClientRect();
    var childPos = e.getBoundingClientRect();
    let top = childPos.top - parentPos.top;
    let height = childPos.height;
    let offsetTop = top + height;
    let max = height + (850 - offsetTop) + 5 + "px";
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

  useEffect((e) => {
    console.log(document.getElementById("conTblWeek").offsetTop);
  }, []);

  var bgcolor = ["#9f77ed", "#12b76a", "#ebaa08", "#2196F3", "#3F51B5"];

  function moveHorizontal(e) {}

  function layOutDay(data, cname) {
    var eventsLength = data.length;
    var timeslots = [];
    var event, i, j;
    var returnEvent = [];
    var eventsSort = [];
    eventsSort = data.sort(function (a, b) {
      return a.id - b.id;
    });
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
          event = eventsSort[timeslots[i][j] - 1];
          event.cevc = timeslotLength;
          event.hindex = next_hindex;
          next_hindex++;
          /*    if (!event.cevc || event.cevc < timeslotLength) {
            event.cevc = timeslotLength;
            if (!event.hindex) {
              event.hindex = next_hindex;
              next_hindex++;
            }
          } */
        }
      }
    }
    for (i = 0; i < eventsSort.length; i++) {
      event = eventsSort[i];
      event.pxh = event.end - event.start;
      event.pxy = event.start;
      event.pxw = width / event.cevc;
      event.pxx = event.hindex * event.pxw;
      var maxLeft = cname === "Mon" ? 0 : -Math.abs(width) - 5;
      var maxRight =
        cname === "Mon" ? Math.abs(width * 6) + 15 : Math.abs(width * 5) + 15;
      let maxBottom = 850 - event.end;
      returnEvent.push(
        <Draggable
          grid={[
            width + 3,
            Math.abs(roundnum(event.start) - event.start) === 0
              ? 50
              : Math.abs(Math.abs(roundnum(event.start) - event.start) - 50),
          ]}
          bounds={{
            top: -Math.abs(event.start),
            bottom: maxBottom,
            left: maxLeft,
            right: maxRight,
          }}
          position={position}
          onStart={(e) => {
            setId(e.target.getAttribute("data-id"));
            setDay(e.target.getAttribute("data-data"));
            e.currentTarget.style.width = "100%";
            e.currentTarget.style.left = "0px";
            e.currentTarget.style.zIndex = "999999999999999";
          }}
          onStop={(e) => {
            setPosition({ y: 0, x: 0 });
            var parentPos = document
              .getElementById("bodyDay")
              .getBoundingClientRect();
            var childPos = e.target.getBoundingClientRect();
            let top = childPos.top - parentPos.top;
            let height = top + e.target.clientHeight;
            try {
              e.target.style.zIndex = "auto";
            } catch (error) {}
            console.log(e.target.getAttribute("data-data"));
            console.log(childPos.left);
            console.log(
              document.getElementById("colMon").getBoundingClientRect().left
            );

            if (
              childPos.left ===
              document.getElementById("colTues").getBoundingClientRect().left
            ) {
              if (e.target.getAttribute("data-data") === "Tue") {
                console.log("a");
                console.log(top, height, id, day);
                setTime(top, height, id, day);
              } else {
                var offsetCol = document
                  .getElementById("colTues")
                  .getBoundingClientRect().left;
                if (childPos.left >= offsetCol) {
                  console.log("b");
                  let getInSequence = (filterId) => {
                    return eventsMon
                      .filter(({ id }) => !filterId.includes(id))
                      .map((v, i) => ({ ...v, id: i + 1 }));
                  };
                  setEvents(
                    getInSequence([parseInt(e.target.getAttribute("data-id"))])
                  );
                  eventsTues.push({
                    id: eventsTues.length + 1,
                    start: top,
                    end: parseInt(top + e.target.clientHeight),
                  });
                } else {
                }
              }
            } else if (
              childPos.left ===
              document.getElementById("colMon").getBoundingClientRect().left
            ) {
              console.log("move to monday");
              if (e.target.getAttribute("data-data") === "Mon") {
                console.log("a");
                console.log(top, height, id, day);
                setTime(top, height, id, day);
              } else {
                var offsetCol = document
                  .getElementById("colMon")
                  .getBoundingClientRect().left;
                if (childPos.left >= offsetCol) {
                  console.log("b");
                  let getInSequence = (filterId) => {
                    return eventsTues
                      .filter(({ id }) => !filterId.includes(id))
                      .map((v, i) => ({ ...v, id: i + 1 }));
                  };
                  setEventsTues(
                    getInSequence([parseInt(e.target.getAttribute("data-id"))])
                  );
                  eventsMon.push({
                    id: eventsMon.length + 1,
                    start: top,
                    end: parseInt(top + e.target.clientHeight),
                  });
                } else {
                }
              }
            } else {
              setTime(top, height, id, day);
            }
          }}
        >
          <div
            className="divItemMonth "
            id={cname + i}
            data-id={i + 1}
            data-data={cname}
            data-end={event.end}
            data-start={event.start}
            onMouseUp={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              setTarget(e.currentTarget.id);
            }}
            style={{
              width: isWhatPercentOf(event.pxw, width).toFixed(2) + "%",
              left: isWhatPercentOf(event.pxx, width).toFixed(2) + "%",
              height: event.pxh + "px",
              top: event.pxy + "px",
              background: bgcolor[Math.floor(Math.random() * bgcolor.length)],
              opacity: dragStart ? "0.5" : "",
            }}
          >
            <p className="p1">Task Title</p>
          </div>
        </Draggable>
      );
    }
    return returnEvent;
  }

  function setTime(x, y, z, cname) {
    let arr = cname === "Mon" ? eventsMon : eventsTues;
    const newState = arr.map((obj) => {
      if (obj.id === parseInt(z)) {
        if (obj.top != x) {
          return { ...obj, start: Math.round(x / 50) * 50, end: y };
        } else {
          return { ...obj };
        }
      }
      return obj;
    });
    if (cname === "Mon") {
      setEvents(newState);
    } else {
      setEventsTues(newState);
    }
  }

  function roundnum(num) {
    return Math.round(num / 50) * 50;
  }

  function isWhatPercentOf(numA, numB) {
    return (numA / numB) * 100;
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
          setDay(e.target.getAttribute("data-data"));
        }}
        onResizeEnd={(e) => {
          var parentPos = document
            .getElementById("bodyDay")
            .getBoundingClientRect();
          var childPos = e.target.getBoundingClientRect();
          let top = childPos.top - parentPos.top;
          let height = top + e.target.clientHeight;
          setTime(top, height, parseInt(e.target.getAttribute("data-id")), day);
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
            <td
              onDragEnter={(e) => {
                console.log("test");
              }}
            >
              {number}
            </td>

            {Array.from({ length: 7 }, (_, i) => (
              <td
                data-day={weekName[i]}
                onDragEnter={(e, text) => {
                  e.preventDefault();
                  document.getElementById("divTimeClone").style.display =
                    "block";
                  setTop(e.currentTarget.offsetTop);
                  setLeft(e.currentTarget.offsetLeft);
                  setDragStart(true);
                  e.dataTransfer.setDragImage(new Image(), 0, 0);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  let x = e.target.getAttribute("data-day");
                  setDragStart(false);
                  if (x == "Mon") {
                    eventsMon.push({
                      id: eventsMon.length + 1,
                      start: top,
                      end: top + 50,
                    });
                  } else {
                    eventsTues.push({
                      id: eventsTues.length + 1,
                      start: top,
                      end: top + 50,
                    });
                  }
                }}
              ></td>
            ))}
          </tr>
        ))}
        <Container fluid className="conTblWeek" id="conTblWeek">
          <Row>
            <div
              id="divTimeClone"
              style={{
                top: top + "px",
                width: width + "px",
                left: left - 50 + "px",
              }}
            ></div>
            <Col style={{ maxWidth: width + 3 + "px" }} id="colMon">
              {layOutDay(eventsMon, "Mon")}
            </Col>
            <Col style={{ maxWidth: width + 3 + "px" }} id="colTues">
              {layOutDay(eventsTues, "Tue")}
            </Col>
            <Col style={{ maxWidth: width + 3 + "px" }} id="colWed"></Col>
            <Col style={{ maxWidth: width + "px" }}></Col>
            <Col style={{ maxWidth: width + "px" }}></Col>
            <Col style={{ maxWidth: width + "px" }}></Col>
            <Col style={{ maxWidth: width + "px" }}></Col>
          </Row>
        </Container>
      </tbody>
    </table>
  );
}
