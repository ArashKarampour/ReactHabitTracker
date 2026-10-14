import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";
import { HabitProvider } from "./context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({ 
    start: startOfWeek(week, { weekStartsOn: 1 }), 
    end: endOfWeek(week, { weekStartsOn : 1}) });

  return (
    <div className="max-w-2xl mx-auto flex flex-col p-4 gap-4">
      <HabitProvider>
        <Header onNext={() => setWeekOffset(o => o + 1)} onPrev={() => setWeekOffset(o => o - 1)} visibleDates={visibleDates}/>
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
}
