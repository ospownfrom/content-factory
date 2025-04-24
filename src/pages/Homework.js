import { useState } from "react";
import { FaLock, FaCheck } from "react-icons/fa";

export default function Homework() {
  const [unlocked, setUnlocked] = useState(() => {
    const saved = localStorage.getItem("homeworkProgress");
    return saved ? JSON.parse(saved) : 1;
  });

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("homeworkDone");
    return saved ? JSON.parse(saved) : [];
  });

  const [modal, setModal] = useState(null);
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");

  const openModal = (num) => {
    if (num <= unlocked) {
      setModal(num);
      setFile(null);
      setComment("");
    }
  };

  const submitHomework = () => {
    console.log("Отправка домашки №" + modal, {
      comment,
      file,
    });

    const newCompleted = [...completed, modal];
    setCompleted(newCompleted);
    localStorage.setItem("homeworkDone", JSON.stringify(newCompleted));

    if (modal === unlocked) {
      const next = unlocked + 1;
      setUnlocked(next);
      localStorage.setItem("homeworkProgress", JSON.stringify(next));
    }

    setModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] p-4 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">домашнее задание</h2>

      <div className="grid grid-cols-5 gap-4 max-w-xl mx-auto">
        {Array.from({ length: 25 }, (_, i) => {
          const num = i + 1;
          const isLocked = num > unlocked;
          const isCompleted = completed.includes(num);

          return (
            <button
              key={num}
              onClick={() => openModal(num)}
              disabled={isLocked}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                isLocked
                  ? "bg-purple-300 text-white cursor-not-allowed"
                  : isCompleted
                  ? "bg-green-400 text-white"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {isLocked ? (
                <FaLock size={20} />
              ) : isCompleted ? (
                <FaCheck size={24} />
              ) : (
                `№${num}`
              )}
            </button>
          );
        })}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-black w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-2">Задание №{modal}</h3>

            <textarea
              placeholder="Комментарий"
              className="w-full border rounded p-2 mb-4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <input
              type="file"
              accept="image/*,video/*"
              className="mb-4"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              onClick={submitHomework}
              className="bg-purple-600 text-white px-4 py-2 rounded w-full"
            >
              Отправить
            </button>

            <button
              className="text-sm text-gray-500 mt-3 underline block text-center"
              onClick={() => setModal(null)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
