import moment from "moment";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
import { ItemCalendar, Time } from "../json/itemCalendar";
export default function CalendarDay(props) {
  const [target, setTarget] = React.useState("");
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

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
    let top = e * 50;
    let calcHeight = 900 - node;
    let mx = 900 - calcHeight;
    console.log("Box height: ", node);
    let height = 900 - top + 3 + "px";
    console.log("Test");
    return height;
  }

  function setTop(e) {
    return (moment(e).hour() - 8) * 50;
  }

  function setHeight(x, y) {
    return moment.duration(moment(x).diff(y)).asHours() * 50;
  }

  return (
    <table className="tblDay1">
      <Moveable
        target={target}
        resizable={true}
        renderDirections={["sw", "s", "se"]}
        edge={false}
        snapDigit={0}
        snapThreshold={50}
        snapGridHeight={49.5}
        snappable={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onResizeStart={(e) => {
          e.setOrigin(["%", "%"]);
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onResizeEnd={(e) => {}}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;
          frame.translate = beforeTranslate;
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          let max = setMaxHeight(
            e.target.getAttribute("data-attr"),
            e.target.clientHeight
          );
          e.target.style.maxHeight = max;
        }}
      />
      <thead>
        <tr>
          <th
            style={{ minWidth: "50px", maxWidth: "50px", width: "50px" }}
          ></th>
          <th id="thDay">
            <p>Wed</p>
            <p>1</p>
          </th>
        </tr>
      </thead>
      <tbody id="bodyDay">
        {Time.map((number, i) => (
          <tr key={i} data-time={i === 12 ? "13" : ""} id={"trDay" + i}>
            <td>{number}</td>
            <td className="tdDay"></td>
          </tr>
        ))}
        <Container className="conTblDay">
          <Row>
            <Fragment>
              <Col>
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
                      .getElementById("targetDay")
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
                      .getElementById("targetDay")
                      .classList.add("selectedDay");
                  }}
                  /*  offsetParent={document.getElementById("bodyDay")} */
                >
                  <div
                    style={{
                      top: setTop(ItemCalendar[0].date_from),
                      height: setHeight(
                        ItemCalendar[0].date_to,
                        ItemCalendar[0].date_from
                      ),
                    }}
                    className="divItemCal target"
                    id={"targetDay"}
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
              </Col>
            </Fragment>
          </Row>
        </Container>
      </tbody>
    </table>
  );
}
