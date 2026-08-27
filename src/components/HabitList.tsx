import Button from "./Button";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";

export default function HabitList() {
    const habits = [{id: 1, name: "Drink Water"}, {id: 2, name: "Exercise"}, {id: 3, name: "Read a Book"}];
    
    if (habits.length === 0) {
        return ( 
            <p className="text-center text-zinc-500 py-12">
                No habits yet! Add one to get started!
            </p>
        )
    }


    return (
        <div className="flex flex-col gap-3">
            {habits.map(habit => {
                return <HabitItem key={habit.id} habit={habit}/>
            })}
        </div>
    )
}

type HabitItemProps = {
    habit : {id: number, name: string}
}

function HabitItem({ habit }: HabitItemProps) {
    const visibleDates = eachDayOfInterval({ 
        start: startOfWeek(new Date(), { weekStartsOn: 1 }), 
        end: endOfWeek(new Date(), { weekStartsOn : 1}) });

    return <div className="rounded-xl bg-zinc-800 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <span className="font-medium">{habit.name}</span>
                <span className="text-sm text-amber-200">🔥2</span>
            </div>
            <Button>Delete</Button>
        </div>
        <div className="flex gap-1.5">
            {visibleDates.map(date => (
                <Button key={date.toISOString()}>
                    <span className="font-medium">{format(date, "EEE")}</span>
                    <span>{format(date, "d")}</span>
                </Button>
            ))}
        </div>
    </div>
}