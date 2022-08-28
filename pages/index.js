import dynamic from "next/dynamic";
const Calendar = dynamic(() => import("../components/miniCalendar"), {
  ssr: false,
});
export default function Home() {
  return (
    <div>
      <Calendar />
    </div>
  );
}
