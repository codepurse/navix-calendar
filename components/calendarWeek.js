import moment from "moment";
import React, { useState } from "react";
import useResizeAware from "react-resize-aware";
export default function CalendarWeek(props) {
  const customReporter = (target) => ({
    clientWidth: target != null ? target.clientWidth : null,
  });

  const [resizeListener, sizes] = useResizeAware(customReporter);
  const [selectedItem, setSelectedItem] = useState("");
  const [weeks, setWeeks] = useState();

  function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add("tdDrag");
  }

  function onDragLeave(e) {
    e.currentTarget.classList.remove("tdDrag");
  }

  function onDrop(e) {
    e.currentTarget.classList.remove("tdDrag");
    var data = e.dataTransfer.getData("text");
    var div = document.createElement("div");
    div.innerHTML = ` <div class = "divItemCal">
    <p class="p1">Test</p>
    <p class="p2">Test</p>
  </div>`;

    e.target.appendChild(div);
  }

  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const cr = entry.contentRect;
      console.log(cr.height);
      return cr.height;
    }
  });

  return (
    <table>
      <thead id="thead">
        <tr>
          {props.weeks?.map((date, i) => (
            <th key={i}>
              <p>{moment(date).format("dd")}</p>
              <p>{new Date(date).getDate()}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 18 }, (_, i) => (
          <tr id={"tr" + i} key={i}>
            <td>
              <div
                className="clDrop"
                onDragOver={allowDrop}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              ></div>
              {(() => {
                if (i == 0) {
                  return (
                    <div
                      className="divItemCal"
                      id={"divItemCal" + i}
                      onMouseDown={(e) => {
                        setSelectedItem(e.currentTarget.id);
                        console.log("test");
                        ro.observe(document.getElementById(e.currentTarget.id));
                      }}
                      onMouseUp={(e) => {
                        ro.disconnect();
                      }}
                      onClick={(e) => {
                        const element1 = document.getElementById("thead");
                        const element = document.getElementById("tr1");
                        console.log(element.offsetTop - element1.clientHeight);
                        /*         console.log(
                              ro.observe(document.getElementById(selectedItem))
                            );
                            ro.disconnect(); */
                      }}
                    >
                      {resizeListener}
                      <p className="p1"></p>
                      <p className="p2">Test</p>
                    </div>
                  );
                }
              })()}
            </td>
            <td
              onDragOver={allowDrop}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            ></td>
            <td
              onDragOver={allowDrop}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            ></td>
            <td
              onDragOver={allowDrop}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            ></td>
            <td
              onDragOver={allowDrop}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            ></td>
            <td
              onDragOver={allowDrop}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            ></td>
            <td
              onDragOver={allowDrop}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            ></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
