import { Button, SegmentedButton } from "@codepurse/navix";
import { Col, Container, Row } from "react-bootstrap";
import CalendarItem from "./calendarItems";
import CalendarWeek from "./calendarWeek";
import CalendarMini from "./miniCalendar";
export default function Calendar() {
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
    <Container style={{ marginTop: "40px" }}>
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
              selected={2}
              onSelect={(e) => {
                console.log(e);
              }}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        <Col className="colSideCalendar">
          <CalendarMini />
          <CalendarItem />
        </Col>
        <Col>
          <CalendarWeek />
        </Col>
      </Row>
    </Container>
  );
}
