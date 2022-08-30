import { Space } from "@codepurse/navix";
import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Draggable from "react-draggable";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export default function CalendarWeek(props) {
  const [dateNow, setDateNow] = useState(props.date ? props.date : new Date());
  const [date, setDate] = useState(
    moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  );
  const [weeks, setWeeks] = useState();
  function getThisWeekDates() {
    var weekDates = [];
    for (var i = 1; i <= 7; i++) {
      weekDates.push(moment(dateNow).day(i - 1));
    }
    return weekDates;
  }
  useEffect(
    (e) => {
      var thisWeekDates = getThisWeekDates();
      setWeeks(thisWeekDates);
    },
    [dateNow]
  );

  useEffect(
    (e) => {
      if (props.date) {
        console.log(props.date);
        setDateNow(props.date);
      }
    },
    [props.date]
  );
  return (
    <Container className="divCalParent">
      <Row
        style={{ borderBottom: "1px solid lightgray", paddingBottom: "15px" }}
      >
        <Col lg={12}>
          <div className="form-inline">
            <p className="pHeader">{moment(dateNow).format("MMMM YYYY")}</p>
            <Space gap={10}>
              <i
                className="iconPrev"
                onClick={(e) => {
                  setDateNow(moment(dateNow).subtract(7, "days").day(1));
                }}
              >
                <FiChevronLeft />
              </i>
              <i
                className="iconNext"
                onClick={(e) => {
                  setDateNow(moment(dateNow).add(7, "days").day(1));
                }}
              >
                <FiChevronRight />
              </i>
            </Space>
          </div>
        </Col>
      </Row>
      <Row style={{ padding: "15px 0px" }}>
        <table>
          <thead>
            <tr>
              {weeks?.map((date, i) => (
                <>
                  <th key={i}>
                    <p>{moment(date).format("dd")}</p>
                    <p>{new Date(date).getDate()}</p>
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {/*  <tr>
              <td>
                <div
                  className="divTest"
                  draggable
                  onResize={(e) => {
                    console.log("as");
                  }}
                ></div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
            {Array.from({ length: 18 }, (_, i) => (
              <tr>
                <td
                  onMouseEnter={(e) => {
                    console.log(e);
                  }}
                >
                  <Draggable
                    onDrag={(e) => {
                      /* console.log(e); */
                    }}
                    onStop={(e) => {
                      console.log(e);
                    }}
                  >
                    <div className="divTest"></div>
                  </Draggable>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </Container>
  );
}
