import Button from "./Button";
import {
  format,
  isFuture,
  isSameDay,
} from "date-fns";
import { type Habit, useHabit } from "../context/HabitProvider";

type HabitListProps = {
    visibleDates: Date[];
}

export default function HabitList({visibleDates}: HabitListProps) {
  const { habits } = useHabit();

  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habits yet! Add one to get started!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => {
        return <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />;
      })}
    </div>
  );
}

type HabitItemProps = {
  habit: Habit;
  visibleDates: Date[];
};

function HabitItem({ habit, visibleDates }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabit();

  // const visibleDates = eachDayOfInterval({
  //     start: startOfWeek(new Date(), { weekStartsOn: 1 }),
  //     end: endOfWeek(new Date(), { weekStartsOn : 1}) });

  const streak: number = getStreak(habit.completions);

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="font-medium">{habit.name}</span>
          {streak > 0 && (
            <span className="text-sm text-amber-200">🔥{streak}</span>
          )}
        </div>
        <Button
          onClick={() => deleteHabit(habit.id)}
          variant="ghost-destructive"
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            onClick={() => toggleHabit(habit.id, date)}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-sm"
            key={date.toISOString()}
            disabled={isFuture(date)}
            variant={
              habit.completions.some((c) => isSameDay(c, date))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function getStreak(completions: Date[]) {
  let streak = 0;
  let currentDate = new Date();

  while (completions.some((c) => isSameDay(c, currentDate))) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}
