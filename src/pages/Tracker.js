import { useEffect, useState } from "react";

export default function Tracker() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("trackerProgress");
    return saved ? JSON.parse(saved) : Array(30).fill(false);
  });

  const [todayIndex, setTodayIndex] = useState(0);

  useEffect(() => {
    const startDate = new Date("2024-04-24"); // ЗАМЕНИ на дату старта
    const now = new Date();
    const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    setTodayIndex(Math.min(diff, 29));
  }, []);

  const toggleDay = (index) => {
    if (index > todayIndex) return;
    const newProgress = [...progress];
    newProgress[index] = !newProgress[index];
    setProgress(newProgress);
  };

  useEffect(() => {
    localStorage.setItem("trackerProgress", JSON.stringify(progress));
  }, [progress]);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-[#271C99] to-[#18087E] text-white font-semibold">
      <h2 className="text-3xl text-center font-bold mb-6">Мой трекер</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-xl mx-auto">
        {progress.map((completed, index) => {
          const isBlocked = index > todayIndex;
          let bg = "";

          if (isBlocked) {
            bg = "bg-[#9C8AFF]";
          } else if (completed) {
            bg = "bg-[#FF77BC]";
          } else {
            bg = "bg-[#D8A7FF]";
          }

          return (
            <button
              key={index}
              onClick={() => toggleDay(index)}
              disabled={isBlocked}
              className={`text-sm sm:text-base ${bg} h-14 sm:h-16 rounded-xl text-white shadow-md transition-all duration-300 ${
                isBlocked ? "cursor-not-allowed opacity-90" : "hover:scale-105"
              }`}
            >
              {index + 1} день
            </button>
          );
        })}
      </div>
    </div>
  );
}
