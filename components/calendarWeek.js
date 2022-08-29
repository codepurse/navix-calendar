import { Space } from "@codepurse/navix";
import moment from "moment";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export default function CalendarWeek() {
  const dateNow = new Date();
  const [date, setDate] = useState(
    moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  );
  return (
    <Container className="divCalParent">
      <Row>
        <Col lg={12}>
          <div className="form-inline">
            <p className="pHeader">{date.format("MMMM YYYY")}</p>
            <Space gap={10}>
              <i className="iconPrev">
                <FiChevronLeft />
              </i>
              <i className="iconNext">
                <FiChevronRight />
              </i>
            </Space>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
