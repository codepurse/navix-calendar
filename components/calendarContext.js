import { createContext } from "react";

const CalendarContext = createContext({
  date: new Date(),
  setDate: (auth) => {},
});

export default CalendarContext;
