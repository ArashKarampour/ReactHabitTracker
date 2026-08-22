import Button from "./Button";

export default function HabitForm() {
    return (
        <form className="flex gap-2">
            <input type="text" placeholder="Habit name" className="flex-1 rounded-lg bg-zinc-800 px-2 py-1 me-1 outline-none focus:ring-1 focus:ring-violet-500" />
            <Button >Add Habit</Button>
        </form>
    )
}