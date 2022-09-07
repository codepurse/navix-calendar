import { Space } from "@codepurse/navix";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CalendarContext from "./calendarContext";
import CalendarDay from "./calendarDay";
import CalendarMonth from "./calendarMonth";
import CalendarWeek from "./calendarWeek";
export default function CalendarMain(props) {
  const value = useContext(CalendarContext);
  const { setDate, date } = useContext(CalendarContext);
  const [dateNow, setDateNow] = useState(value);
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
        setDateNow(props.date);
      }
    },
    [props.date]
  );

  useEffect(
    (e) => {
      console.log(value);
    },
    [value]
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
                  if (props.view === "two") {
                    setDateNow(moment(dateNow).subtract(7, "days").day(1));
                    setDate(moment(dateNow).subtract(7, "days").day(1));
                  } else if (props.view === "one") {
                    setDateNow(moment(dateNow).subtract(1, "months"));
                    setDate(moment(dateNow).subtract(1, "months"));
                  }
                }}
              >
                <FiChevronLeft />
              </i>
              <i
                className="iconNext"
                onClick={(e) => {
                  if (props.view === "two") {
                    setDateNow(moment(dateNow).add(7, "days").day(1));
                    setDate(moment(dateNow).add(7, "days").day(1));
                  } else if (props.view === "one") {
                    setDateNow(moment(dateNow).add(1, "months"));
                    setDate(moment(dateNow).add(1, "months"));
                  }
                }}
              >
                <FiChevronRight />
              </i>
            </Space>
          </div>
        </Col>
      </Row>
      <Row>
        {props.view === "one" ? (
          <CalendarMonth date={dateNow} />
        ) : props.view === "two" ? (
          <CalendarWeek weeks={weeks} date={dateNow} />
        ) : (
          <CalendarDay weeks={weeks} date={dateNow} />
        )}
      </Row>
    </Container>
  );
}
