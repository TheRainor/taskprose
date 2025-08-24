import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTaskCountsContext } from '../../contexts/useTaskCountsContext.jsx';

export default function Sidebar() {
 
  const [isOpen, setIsOpen] = useState(false);
  const { counts, loading } = useTaskCountsContext();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const categories = [
    { name: 'Tüm Görevler', path: '/todo/all', color: 'bg-blue-400', countId: 'count_all' },
    { name: 'Bugün', path: '/todo/today', color: 'bg-green-400', countId: 'count_today' },
    { name: 'Önemli', path: '/todo/important', color: 'bg-orange-400', countId: 'count_important' },
    { name: 'Planlanan', path: '/todo/planned', color: 'bg-purple-400', countId: 'count_planned' },
    { name: 'Tamamlanan', path: '/todo/completed', color: 'bg-red-400', countId: 'count_completed' },
  ];

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
        <span className="text-white font-bold text-base">Menü</span>
      </div>

      {/* Sidebar content */}
      <div
        className={`lg:w-80 flex flex-col space-y-0 md:space-y-6 md:block overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
        }`}
      >
        {/* Categories */}
        <div className="bg-white/10 glass rounded-2xl p-6 border border-white/20">
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className={`flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${
                  currentPath === cat.path ? 'bg-white/20 border-2 border-blue-600' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${cat.color} rounded-full`}></div>
                  <span className="text-white">{cat.name}</span>
                </div>
                <span className="text-white/70 text-sm bg-white/10 px-2 py-1 rounded-full">
                  {loading ? '...' : counts?.[cat.countId] || 0}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Lists */}
        <div className="bg-white/10 glass rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Listeler</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white">Tüm Listeler</span>
              </div>
              <span className="text-white/70 text-sm bg-white/10 px-2 py-1 rounded-full">12</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/10 glass rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">İstatistikler</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Tamamlanan</span>
              <span className="text-green-400 font-semibold">8/12</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                style={{ width: '67%' }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Verimlilik</span>
              <span className="text-blue-400 font-semibold">67%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
