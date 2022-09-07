import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
export default function CalendarDay(props) {
  const [target, setTarget] = React.useState("");
  const [boundsHeight, setBoundsHeight] = useState(0);
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

  useEffect((e) => {
    /*     setBoundsHeight(document.getElementById("tblDay").clientHeight); */
  });

  function setBoundsTop(e) {
    let top = e * 50;
    return Math.abs(top) * -1;
  }
  function setBoundsBottom(e) {
    let startTop = e * 50;
    let bottom = 850 - startTop;
    return bottom;
  }
  return (
    <table className="tblDay1">
      <Moveable
        draggable={true}
        target={target}
        resizable={true}
        renderDirections={["sw", "s", "se"]}
        edge={false}
        snapThreshold={50}
        snapGridHeight={50}
        snappable={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onResizeStart={(e) => {
          e.setOrigin(["%", "%"]);
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onResizeEnd={(e) => {
          console.log(e.target.clientHeight);
        }}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;
          frame.translate = beforeTranslate;
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
      />
      <thead>
        <tr>
          <th id="thDay">
            <p>Wed</p>
            <p>1</p>
          </th>
        </tr>
      </thead>
      <tbody id="bodyDay">
        {Array.from({ length: 18 }, (_, i) => (
          <tr key={i}>
            <td data-time={i} className="tdDay" id={"tblDay" + i}>
              <Container style={{ marginTop: "-25px" }}>
                <Row>
                  {(() => {
                    if (i === 0 || i === 3) {
                      return (
                        <Fragment>
                          <Col>
                            <Draggable
                              axis="y"
                              bounds={{
                                top: setBoundsTop(i),
                                bottom: setBoundsBottom(i),
                              }}
                              grid={[50, 50]}

                              /*  offsetParent={document.getElementById("bodyDay")} */
                            >
                              <div
                                className="divItemCal target"
                                id={"targetDay" + i}
                                onClick={(e) => {
                                  setTarget(e.currentTarget.id);
                                  console.log(
                                    document
                                      .getElementById("thDay")
                                      .getBoundingClientRect().top -
                                      document.getElementById("thDay")
                                        .clientHeight
                                  );

                                  console.log(
                                    document
                                      .getElementById("targetDay" + i)
                                      .getBoundingClientRect().top
                                  );
                                }}
                              >
                                <p className="p1"></p>
                                <p className="p2">Meeting with John Sins</p>
                              </div>
                            </Draggable>
                          </Col>
                        </Fragment>
                      );
                    }
                  })()}
                </Row>
              </Container>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
