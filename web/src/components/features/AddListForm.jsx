import { useTranslation } from "react-i18next";
export default function ListAdd({ handleSubmit, listName, setListName }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white/10 rounded-2xl p-6 mb-5 border border-white/20">
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="flex-1">
          <h3 className="text-white font-semibold">{t("listAdd.title")}</h3>
        </div>
        <div className="space-y-3 mt-6">
          <input
            type="text"
            name="listName"
            placeholder={t("listAdd.placeholder")}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-800 via-purple-800 to-violet-800 hover:from-violet-700 hover:via-purple-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] mt-2"
          >
            <svg
              className="w-5 h-5 inline mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {t("listAdd.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
