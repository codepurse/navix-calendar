import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
import { ItemMonth, Time } from "../json/itemCalendar";
export default function CalendarWeek(props) {
  const [target, setTarget] = React.useState("");
  const [frame] = React.useState({
    translate: [0, 0],
  });

  function setTop(e) {
    return (moment(e).hour() - 8) * 50;
  }

  function setMaxHeight(e, node) {
    var parentPos = document.getElementById("bodyDay").getBoundingClientRect();
    var childPos = e.getBoundingClientRect();
    let top = childPos.top - parentPos.top;
    let max = 900 - top - 50 + "px";
    console.log("max:", max);
    console.log(top);
    return max;
  }

  function setHeight(x, y) {
    return moment.duration(moment(x).diff(y)).asHours() * 50;
  }

  React.useEffect(() => {
    try {
      let str = target;
      let letterCount = str.replace(/\s+/g, "").length;
      if (letterCount < 20) {
        setTarget(document.getElementById(target));
      }
    } catch (error) {}
  }, [target]);

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
        <Container className="conTblWeek">
          <Row>
            <Col>
              {ItemMonth.results.data.Monday?.map((event, i) => (
                <Draggable axis="y" grid={[50, 50]} bounds={"parent"}>
                  <div
                    className="divItemMonth"
                    id={"targetWeekMon" + i}
                    onClick={(e) => {
                      setTarget(e.currentTarget.id);
                    }}
                    style={{
                      top: setTop(event.date_from),
                      height: setHeight(event.date_to, event.date_from),
                    }}
                  >
                    <p className="p1">Task Title</p>
                  </div>
                </Draggable>
              ))}
            </Col>
            <Col>
              {ItemMonth.results.data.Tuesday?.map((event, i) => (
                <Draggable axis="y" grid={[50, 50]} bounds={"parent"}>
                  <div
                    className="divItemMonth"
                    id={"targetWeekTues" + i}
                    onClick={(e) => {
                      setTarget(e.currentTarget.id);
                    }}
                    style={{
                      top: setTop(event.date_from),
                      height: setHeight(event.date_to, event.date_from),
                    }}
                  >
                    <p className="p1">Task Title</p>
                  </div>
                </Draggable>
              ))}
            </Col>
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
