import { format, isToday } from "date-fns";
import { useHabit } from "../context/HabitProvider";
import Button from "./Button";

type HeaderProps = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

export default function Header({ visibleDates, onPrev, onNext }: HeaderProps) {
  const { habits } = useHabit();
  const doneToday = habits.filter((h) =>
    h.completions.some((c) => isToday(c))
  ).length;
  const dateRante = `${format(visibleDates[0], "MMM d")} - ${format(
    visibleDates.at(-1)!,
    "MMM d"
  )}`;

  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habbit Tracker</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday}/{habits.length} done Today
        </span>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <span className="text-zinc-400 text-sm">{dateRante}</span>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev}>Prev</Button>
          <Button
            onClick={onNext}
            disabled={visibleDates.some((d) => isToday(d))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
