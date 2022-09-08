import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import Moveable from "react-moveable";
export default function CalendarDay(props) {
  const [target, setTarget] = React.useState("");
  const [mouseHold, setMouseHold] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
  });

  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = React.useState({
      x: null,
      y: null,
    });

    React.useEffect(() => {
      const updateMousePosition = (ev) => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      };

      window.addEventListener("mousemove", updateMousePosition);

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
      };
    }, []);

    return mousePosition;
  };

  const mousePosition = useMousePosition();

  React.useEffect(() => {
    try {
      let str = target;
      let letterCount = str.replace(/\s+/g, "").length;
      if (letterCount < 13) {
        setTarget(document.getElementById(target));
      }
    } catch (error) {}
  }, [target]);

  function setBoundsTop(e) {
    let top = e * 50;
    return Math.abs(top) * -1;
  }
  function setBoundsBottom(e) {
    let startTop = e * 50;
    let bottom = 850 - startTop;
    return bottom;
  }

  function setMaxHeight(e, node) {
    let top = e * 50;
    let calcHeight = 900 - node;
    let mx = 900 - calcHeight;
    console.log("Box height: ", node);
    let height = 900 - top + 3 + "px";
    return height;
  }
  return (
    <table className="tblDay1">
      <Moveable
        draggable={true}
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
          console.log(e.target.offsetParent);
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
                    if (i === 3 || i == 0) {
                      return (
                        <Fragment>
                          <Col>
                            <Draggable
                              axis="y"
                              onMouseDown={(e) => {
                                const spans =
                                  document.querySelectorAll(".divItemCal");
                                for (let i = 0; i < spans.length; i++) {
                                  const span = spans[i];
                                  span.classList.add("unselectedDay");
                                }
                                setMousePos(mousePosition.y);
                              }}
                              bounds={{
                                top: setBoundsTop(i),
                                bottom: setBoundsBottom(i),
                              }}
                              grid={[50, 50]}
                              onStop={(e) => {
                                console.log("stop");
                                setMousePos(0);
                                document
                                  .getElementById("targetDay" + i)
                                  .classList.remove("selectedDay");
                                const spans =
                                  document.querySelectorAll(".divItemCal");
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
                                var parentPos = document
                                  .getElementById("bodyDay")
                                  .getBoundingClientRect();
                                var childPos = document
                                  .getElementById("targetDay" + i)
                                  .getBoundingClientRect();
                                let bottom = parentPos.bottom - childPos.bottom;
                                let top = childPos.top - parentPos.top;
                                /*     console.log("bottom", bottom);
                                console.log("top", top);
                                console.log(mousePosition.y); */

                                setMousePos(mousePosition.y);
                                if (bottom < 1) {
                                  if (mousePosition.y < mousePos) {
                                    console.log("bawal");
                                    return true;
                                  } else {
                                    console.log("pwede");
                                    return false;
                                  }
                                }
                              }}
                              /*  offsetParent={document.getElementById("bodyDay")} */
                            >
                              <div
                                className="divItemCal target"
                                id={"targetDay" + i}
                                onMouseDown={(e) => {}}
                                onMouseUp={(e) => {
                                  e.stopPropagation();
                                  console.log("test");
                                }}
                                data-attr={i}
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
