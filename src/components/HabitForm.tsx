import { useState, type SubmitEvent } from "react";
import Button from "./Button";
import { useHabit } from "../context/HabitProvider";

export default function HabitForm() {
  const [name, setName] = useState("");
  const { addHabit } = useHabit();

  function handleSubmit(e: SubmitEvent){
    e.preventDefault()

    if (name.trim() === "") return
    addHabit(name)
    setName("")
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Habit name"
        className="flex-1 rounded-lg bg-zinc-800 px-2 py-1 me-1 outline-none focus:ring-1 focus:ring-violet-500"
      />
      <Button className="rounded-lg px-4 py-2 font-medium">Add Habit</Button>
    </form>
  );
}
