import { useState } from "react";

const faqData = [
  {
    question: "Как пройдет марафон?",
    answer:
      "Марафон длится 30 дней. Каждый день вы выполняете задания, отмечаете прогресс и двигаетесь к миллионам охватов.",
  },
  {
    question: "Где найти домашнее задание?",
    answer: "Открой вкладку 'Домашка'. Задания открываются по мере прохождения.",
  },
  {
    question: "Как сделать фото до и после?",
    answer:
      "Сделай фото до начала марафона и после завершения — желательно в одинаковом освещении и ракурсе.",
  },
  {
    question: "Как отправлять домашнее задание?",
    answer:
      "Следуй инструкциям внутри каждого задания. Отправка — через Telegram-бота или форму.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#271C99] to-[#18087E] p-4 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">вопросы:</h2>
      <div className="space-y-4 max-w-xl mx-auto">
        {faqData.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-xl bg-[#F5A8FF] text-black shadow-md">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full px-4 py-4 text-left font-semibold text-lg sm:text-xl"
              >
                {item.question}
              </button>
              {isOpen && (
                <div className="bg-white text-sm sm:text-base text-black px-4 py-3 border-t rounded-b-xl">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
