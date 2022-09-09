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
  const { setDate, date } = useContext(CalendarContext);
  const [weeks, setWeeks] = useState();
  function getThisWeekDates() {
    var weekDates = [];
    for (var i = 1; i <= 7; i++) {
      weekDates.push(moment(date).day(i));
    }
    return weekDates;
  }
  useEffect(
    (e) => {
      var thisWeekDates = getThisWeekDates();
      setWeeks(thisWeekDates);
    },
    [date]
  );

  return (
    <Container className="divCalParent">
      <Row
        style={{ borderBottom: "1px solid lightgray", paddingBottom: "15px" }}
      >
        <Col lg={12}>
          <div className="form-inline">
            <p className="pHeader">{moment(date).format("MMMM YYYY")}</p>
            <Space gap={10}>
              <i
                className="iconPrev"
                onClick={(e) => {
                  if (props.view === "two") {
                    setDate(moment(date).subtract(7, "days").day(1));
                  } else if (props.view === "one") {
                    setDate(moment(date).subtract(1, "months"));
                  } else if (props.view === "three") {
                    setDate(moment(date).subtract(1, "days"));
                  }
                }}
              >
                <FiChevronLeft />
              </i>
              <i
                className="iconNext"
                onClick={(e) => {
                  if (props.view === "two") {
                    setDate(moment(date).add(7, "days").day(1));
                  } else if (props.view === "one") {
                    setDate(moment(date).add(1, "months"));
                  } else if (props.view === "three") {
                    setDate(moment(date).add(1, "days"));
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
          <CalendarMonth date={date} />
        ) : props.view === "two" ? (
          <CalendarWeek weeks={weeks} date={date} />
        ) : (
          <CalendarDay weeks={weeks} date={date} />
        )}
      </Row>
    </Container>
  );
}
