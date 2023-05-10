import Calendar, { CalendarProps } from "./components/Calendar";

const now: CalendarProps["date"] = new Date(2023, 4, 10);

function App() {
  return (
    <>
      <Calendar date={now} />
    </>
  );
}

export default App;
