import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tracker from './pages/Tracker';
import FAQ from './pages/FAQ';
import Homework from './pages/Homework';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user?.id) {
      console.log("Telegram ID:", tg.initDataUnsafe.user.id);
    } else {
      console.log("Не запущено из Telegram WebApp");
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#271C99] to-[#18087E] text-white flex flex-col items-center justify-start p-6 space-y-4">
        <h1 className="text-3xl font-bold mt-4 mb-6 text-center">Контент-Фабрика</h1>

        <Link
          to="/tracker"
          className="w-full max-w-xs py-4 rounded-xl text-center text-lg font-semibold bg-[#E6A6FF] hover:bg-[#f1b8ff] transition-all duration-300 shadow-md"
        >
          Трекер 30 дней
        </Link>

        <Link
          to="/faq"
          className="w-full max-w-xs py-4 rounded-xl text-center text-lg font-semibold bg-[#E6A6FF] hover:bg-[#f1b8ff] transition-all duration-300 shadow-md"
        >
          Вопрос-ответ
        </Link>

        <Link
          to="/homework"
          className="w-full max-w-xs py-4 rounded-xl text-center text-lg font-semibold bg-[#E6A6FF] hover:bg-[#f1b8ff] transition-all duration-300 shadow-md"
        >
          Домашка
        </Link>

        <Routes>
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/homework" element={<Homework />} />
        </Routes>
      </div>
  </Router>

  );
}
