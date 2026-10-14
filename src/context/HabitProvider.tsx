import { isSameDay } from "date-fns";
import { createContext, useState, type ReactNode, useContext } from "react";

export type Habit = { id: number; name: string, completions: Date[] }

type Context = {
    habits: Habit[];
    addHabit: (name: string) => void;
    deleteHabit: (id: number) => void;
    toggleHabit: (id: number, date: Date) => void;
}

type HabitProviderProps = {
    children: ReactNode;
}

export const HabitContext = createContext<null | Context>(null)

export function HabitProvider({ children }: HabitProviderProps) {
    const [habits, setHabits] = useState<Habit[]>([]);

    function addHabit(name: string) {
        setHabits((current) => [
          ...current,
          { id: current.length + 1, name, completions: [] },
        ]); // we use the function form of setState to ensure we always have the latest state when adding a new habit (updating the habits list. we use the function form to avoid potential issues with stale state when multiple updates happen in quick succession)
      }
    
      function deleteHabit(id: number) {
        setHabits((current) => current.filter((habit) => habit.id !== id));
      }
    
      function toggleHabit(id: number, date: Date) {
        setHabits((current) =>
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
        );
      }

    return <HabitContext value={{habits, addHabit, toggleHabit, deleteHabit}}>{children}</HabitContext>
}

// our custom Hook
export function useHabit(){
    const habitContext = useContext(HabitContext)
    if (habitContext == null) throw new Error("Null Context")
    return habitContext
}