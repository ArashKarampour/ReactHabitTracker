import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import Header from "./components/Header";
import { isSameDay } from "date-fns";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((current) => [...current, { id: current.length + 1, name, completions:[] }]); // we use the function form of setState to ensure we always have the latest state when adding a new habit (updating the habits list. we use the function form to avoid potential issues with stale state when multiple updates happen in quick succession)
  }

  function deleteHabit(id: number) {
    setHabits((current) => current.filter((habit) => habit.id !== id)); 
  }

  function toggleHabit(id: number, date: Date){
    setHabits((current) => (
      current.map((habit) => {
        if (habit.id === id) {
          const isCompleted = habit.completions.some((completionDate) =>
            isSameDay(completionDate, date)
          );

          if (isCompleted) {
            return {
              ...habit,
              completions: habit.completions.filter(
                (completionDate) => !isSameDay(completionDate, date)
              ),
            };
          } else {
            return {
              ...habit,
              completions: [...habit.completions, date],
            };
          }
        }
        return habit;
      })
    ))
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col p-4 gap-4">
      <Header />
      <HabitForm  addHabit={addHabit} />
      <HabitList toggleHabit={toggleHabit} deleteHabit={deleteHabit} habits={habits} />
    </div>
  );
}
