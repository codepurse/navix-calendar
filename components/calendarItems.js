import { Overlay, useToggle } from "@codepurse/navix";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdKeyboardArrowUp } from "react-icons/md";
export default function CalendarItem() {
  const [show, setShow] = useToggle(false);
  // dummy item
  const [item, setItem] = useState([
    {
      title: "Brainstorming",
      time: "2 hours",
      venue: "Mental Health house",
    },
    {
      title: "Lunch",
      time: "1 hour",
      venue: "Mental Health house",
    },
  ]);
  function drag(ev) {
    console.log("test");
    ev.target.style.opacity = 0.99999;
  }

  useEffect((e) => {}, [item]);

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

        {item.map((data, i) => (
          <div
            className="divItems"
            id={"drag" + i}
            data-id={i}
            key={i}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text", e.target.id);
            }}
            onDragEnd={(e) => {
              if (e.dataTransfer.dropEffect === "copy") {
                console.log(item.splice(i, 1));
                setItem(item.splice(i, 1));
              }
            }}
          >
            <p className="pHeader">{data.title}</p>
            <div className="form-inline">
              <i>
                <AiOutlineClockCircle />
              </i>
              <p>{data.time}</p>
            </div>
            <div className="form-inline">
              <i>
                <AiOutlineClockCircle />
              </i>
              <p>{data.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
