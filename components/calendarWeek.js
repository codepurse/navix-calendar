import moment from "moment";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ItemMonth, Time } from "../json/itemCalendar";
export default function CalendarWeek(props) {
  useEffect(() => {
    console.log(ItemMonth);
  }, []);

  function setTop(e) {
    return (moment(e).hour() - 8) * 50;
  }
  return (
    <table className="tblWeek">
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
              <div
                className="divItemMonth"
                style={{
                  top: setTop(ItemMonth.results.data.Monday[0].date_from),
                }}
              >
                <p className="p1">Task Title</p>
              </div>
            </Col>
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
