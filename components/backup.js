import { useUpdate } from "@codepurse/navix";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useResizeAware from "react-resize-aware";
export default function CalendarDay(props) {
  const customReporter = (target) => ({
    clientWidth: target != null ? target.clientWidth : null,
  });

  var dx = 0,
    dy = 0,
    draggedItem = undefined;

  const [resizeListener, sizes] = useResizeAware(customReporter);
  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const cr = entry.contentRect;
      /*    console.log(cr.height); */
      return cr.height;
    }
  });

  useUpdate((e) => {
    var arrOfPtags = document.getElementsByClassName("tdDay");
    for (var i = 0; i < arrOfPtags.length; i++) {
      /*  console.log(i); */
    }
  }, []);

  function isOverlapping(x, y) {
    let div1 = x.getBoundingClientRect();
    let div2 = y.getBoundingClientRect();
    return (
      div1.right > div2.left &&
      div1.left < div2.right &&
      div1.bottom > div2.top &&
      div1.top < div2.bottom
    );
  }

  function onDragStart(e) {
    draggedItem = e.currentTarget;
    dx = e.clientX - draggedItem.getBoundingClientRect().x;
    dy = e.clientY - draggedItem.getBoundingClientRect().y;
    draggedItem.style.position = "absolute";
  }

  function onDrag(e) {
    /*     console.log(e.clientX - dx); */
    console.log(e);
    draggedItem.style.left = e.clientX - dx + "px";
    draggedItem.style.top = e.clientY - dy + "px";
  }

  function snapHeigt() {}

  return (
    <table className="tblDay1">
      <thead>
        <tr>
          <th>
            <p>Wed</p>
            <p>1</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 18 }, (_, i) => (
          <tr key={i}>
            <td data-time={i} className="tdDay" id={"tblDay" + i}>
              <Container style={{ marginTop: "-25px" }}>
                <Row>
                  {(() => {
                    if (i == 0 || i == 10) {
                      return (
                        <Fragment>
                          <Col>
                            <div
                              className="divItemCal"
                              draggable
                              /*     onDragStart={(e) => {
                                onDragStart(e);
                              }}
                              onDrag={(e) => {
                                onDrag(e);
                              }}
                              id={"divItemCalDay" + i}
                              onClick={(e) => {
                                console.log(
                                  document
                                    .getElementById("divItemCalDay0")
                                    .getBoundingClientRect()
                                );
                              }} */
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                              onMouseUp={(e) => {
                                console.log("Test");
                                e.stopPropagation();
                                if (e.currentTarget.clientHeight > 870) {
                                  e.currentTarget.style.height = "921px";
                                } else if (e.currentTarget.clientHeight > 818) {
                                  e.currentTarget.style.height = "864px";
                                } else if (e.currentTarget.clientHeight > 768) {
                                  e.currentTarget.style.height = "814px";
                                } else if (e.currentTarget.clientHeight > 717) {
                                  e.currentTarget.style.height = "763px";
                                } else if (e.currentTarget.clientHeight > 668) {
                                  e.currentTarget.style.height = "714px";
                                } else if (e.currentTarget.clientHeight > 564) {
                                  e.currentTarget.style.height = "612px";
                                } else if (e.currentTarget.clientHeight > 509) {
                                  e.currentTarget.style.height = "561px";
                                } else if (e.currentTarget.clientHeight > 462) {
                                  e.currentTarget.style.height = "508px";
                                } else if (e.currentTarget.clientHeight > 411) {
                                  e.currentTarget.style.height = "460px";
                                } else if (e.currentTarget.clientHeight > 356) {
                                  e.currentTarget.style.height = "410px";
                                } else if (e.currentTarget.clientHeight > 310) {
                                  e.currentTarget.style.height = "355px";
                                } else if (e.currentTarget.clientHeight > 257) {
                                  e.currentTarget.style.height = "309px";
                                } else if (e.currentTarget.clientHeight > 203) {
                                  e.currentTarget.style.height = "256px";
                                } else if (e.currentTarget.clientHeight > 153) {
                                  e.currentTarget.style.height = "202px";
                                } else if (e.currentTarget.clientHeight > 102) {
                                  e.currentTarget.style.height = "152px";
                                } else if (e.currentTarget.clientHeight > 51) {
                                  e.currentTarget.style.height = "101px";
                                }
                              }}
                            >
                              <p className="p1"></p>
                              <p className="p2">Meeting with John Sins</p>
                            </div>
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
