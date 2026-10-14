import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";
import { HabitProvider } from "./context/HabitProvider";

export default function App() {
  
  return (
    <div className="max-w-2xl mx-auto flex flex-col p-4 gap-4">
      <HabitProvider>
        <Header />
        <HabitForm />
        <HabitList />
      </HabitProvider>
    </div>
  );
}
