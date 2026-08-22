import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col p-4 gap-4">
      <Header />
      <HabitForm />
      <HabitList />
    </div>
  );
}