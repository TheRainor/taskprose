import { useState } from "react";
import { useAuth } from "../../hooks/index.js";
import { useUser } from "../../contexts/userContext.jsx";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const { handleLogout } = useAuth();
  const { user } = useUser();
  const handleClear = () => setSearch("");

  return (
    <nav className="w-full bg-white/10 glass rounded-2xl p-4 md:p-6 border border-white/20 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h1 className="flex items-center text-lg md:text-2xl font-bold text-white pl-2">
              TaskProse
            </h1>
          </div>

          <div className="relative w-full md:w-auto md:ml-4 mt-2 flex items-center">
            <input
              id="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 md:h-10 w-full md:w-20 focus:md:w-44 px-3 bg-gray-900 border border-white/20 rounded-lg text-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all delay-100 duration-300 md:transition-width"
              placeholder="Ara"
            />
            <button
              type="button"
              onClick={handleClear}
              className={`absolute ${
                search ? "block" : "hidden"
              } text-gray-200 hover:text-white right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-white/20`}
              title="Temizle"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end mt-3 md:mt-0">
          <div className="text-right">
            <p className="text-white font-semibold">
              {user ? `${user.first_name} ${user.last_name}` : "Kullanıcı"}
            </p>
            <p className="text-white/70 text-sm">
              {user ? user.email : "Giriş yapılmamış"}
            </p>
          </div>
          <div className="w-12 h-10 md:h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user
              ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
              : "K"}
          </div>
          <form onSubmit={handleLogout} style={{ display: "inline" }}>
            <button
              type="submit"
              className="py-1 px-1 md:py-2 md:px-3 text-white/70 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 hover:scale-105 rounded-lg transition-all duration-200"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
