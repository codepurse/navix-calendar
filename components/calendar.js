import { Button, SegmentedButton } from "@codepurse/navix";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CalendarContext from "./calendarContext";
import CalendarItem from "./calendarItems";
import CalendarMain from "./calendarMain";
import CalendarMini from "./miniCalendar";
export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("three");
  const segmentedArray = [
    {
      id: "one",
      label: "Month",
    },
    {
      id: "two",
      label: "Week",
    },
    {
      id: "three",
      label: "Day",
    },
  ];
  return (
    <Container fluid style={{ marginTop: "40px", paddingBottom: "100px" }}>
      <Row>
        <Col lg={4}>
          <Button type="primary">Add Event</Button>
        </Col>
        <Col lg={8}>
          <div
            style={{ maxWidth: "240px", marginRight: 0, marginLeft: "auto" }}
          >
            <SegmentedButton
              value={segmentedArray}
              onSelect={(e) => {
                console.log(e);
                setView(e);
              }}
            />
          </div>
        </Col>
      </Row>
      <CalendarContext.Provider value={{ date, setDate }}>
        <Row style={{ marginTop: "15px" }}>
          {view != "one" ? (
            <Col className="colSideCalendar">
              <CalendarMini
                date={date ? date : null}
                onChange={(e) => {
                  setDate(e);
                }}
              />
              <CalendarItem />
            </Col>
          ) : (
            ""
          )}
          <Col>
            <CalendarMain date={date} view={view} />
          </Col>
        </Row>
      </CalendarContext.Provider>
    </Container>
  );
}
