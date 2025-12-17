import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTaskCountsContext } from "../../contexts/useTaskCountsContext.jsx";
import { useListCountsContext } from "../../contexts/useListCountsContext.jsx";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { counts, loading } = useTaskCountsContext();
  const { listCounts, listLoading } = useListCountsContext();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const categories = [
    {
      name: t("sidebar.categories.all"),
      path: "/todo/all",
      color: "bg-blue-500",
      countId: "count_all",
    },
    {
      name: t("sidebar.categories.today"),
      path: "/todo/today",
      color: "bg-green-500",
      countId: "count_today",
    },
    {
      name: t("sidebar.categories.important"),
      path: "/todo/important",
      color: "bg-orange-500",
      countId: "count_important",
    },
    {
      name: t("sidebar.categories.planned"),
      path: "/todo/planned",
      color: "bg-purple-500",
      countId: "count_planned",
    },
    {
      name: t("sidebar.categories.completed"),
      path: "/todo/completed",
      color: "bg-red-500",
      countId: "count_completed",
    },
  ];

  const totalTasks = counts?.count_all || 0;
  const completedTasks = counts?.count_completed || 0;
  const productivity =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <>
      {/* Hamburger button */}
      <div
        className="md:hidden flex justify-center items-center gap-2 h-10 -mt-2 -mb-4 bg-gradient-to-r from-violet-800 via-purple-800 to-violet-800 rounded-2xl cursor-pointer"
        onClick={toggleSidebar}
      >
        <button className="text-white focus:outline-none text-xl">
          <i className="bi bi-list"></i>
        </button>
        <span className="text-white font-bold text-base">
          {t("sidebar.menu")}
        </span>
      </div>

      {/* Sidebar content */}
      <div
        className={`lg:w-80 flex flex-col space-y-0 md:space-y-6 md:block overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
        }`}
      >
        {/* Categories */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className={`flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${
                  currentPath === cat.path
                    ? "bg-white/20 border-2 border-blue-600"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${cat.color} rounded-full`}></div>
                  <span className="text-white">{cat.name}</span>
                </div>
                <span className="text-white/70 text-sm bg-white/10 px-2 py-1 rounded-full">
                  {loading ? "..." : counts?.[cat.countId] || 0}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Lists */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">
            {t("sidebar.lists.title")}
          </h3>
          <div className="space-y-2">
            <Link to="/todo/lists">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-rose-600 rounded-full"></div>
                  <span className="text-white">{t("sidebar.lists.all")}</span>
                </div>
                <span className="text-white/70 text-sm bg-white/10 px-2 py-1 rounded-full">
                  {listLoading ? "..." : listCounts?.list_count || 0}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">
            {t("sidebar.stats.title")}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">
                {t("sidebar.stats.completed")}
              </span>
              <span className="text-green-400 font-semibold">
                {loading ? "..." : `${completedTasks}/${totalTasks}`}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: loading ? "0%" : `${productivity}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">
                {t("sidebar.stats.productivity")}
              </span>
              <span className="text-blue-400 font-semibold">
                {loading ? "..." : `${productivity}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
