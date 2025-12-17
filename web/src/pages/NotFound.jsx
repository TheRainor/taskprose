import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const isElectron = !!window.electronStore;
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center px-6 py-12 bg-gray-800 bg-opacity-50 rounded-2xl shadow-lg">
        <h1 className="text-6xl font-extrabold text-white mb-4 animate-pulse">404</h1>
        <p className="text-white text-xl mb-6">Üzgünüz, sayfa bulunamadı.</p>
        <Link
          to={isElectron ? "#/" : "/"}
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}
