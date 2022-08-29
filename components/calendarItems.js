import { Overlay, useToggle } from "@codepurse/navix";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdKeyboardArrowUp } from "react-icons/md";
export default function CalendarItem() {
  const [show, setShow] = useToggle(false);
  function drag(ev) {
    console.log("test");
    ev.target.style.opacity = 0.99999;
  }

  return (
    <div className="divCalItems">
      <div>
        <Overlay
          show={show}
          rendered={
            <div className="divOverlay d-none">
              <p>Test Overlay 😘</p>
            </div>
          }
        >
          <div className="form-inline" onClick={setShow}>
            <span className="pHeader">Items</span>
            <i style={{ transform: show ? "rotate(0deg)" : "rotate(180deg)" }}>
              <MdKeyboardArrowUp />
            </i>
          </div>
        </Overlay>
        <div
          className="divItems"
          draggable
          onDragStart={(e) => {
            drag(e);
          }}
        >
          <p className="pHeader">Task title</p>
          <div className="form-inline">
            <i>
              <AiOutlineClockCircle />
            </i>
            <p>2 hours</p>
          </div>
          <div className="form-inline">
            <i>
              <AiOutlineClockCircle />
            </i>
            <p>Mental Health House</p>
          </div>
        </div>
      </div>
    </div>
  );
}
