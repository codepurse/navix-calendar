import dynamic from "next/dynamic";
const Calendar = dynamic(() => import("../components/calendar"), {
  ssr: false,
});
export default function Home() {
  return <Calendar />;
}
