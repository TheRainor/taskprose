import { useState } from "react";
import {
  formatDateLocal,
  toMySQLDateTime,
  getDynamicDate,
} from "../../utils/dateUtils.js";

export default function TaskAdd({
  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  alarm,
  setAlarm,
  alarmValue,
  setAlarmValue,
  date,
  setDate,
  dateValue,
  setDateValue,
  repeat,
  setRepeat,
  repeatValue,
  setRepeatValue,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const clearAlarm = () => {
    setAlarm("");
    setAlarmValue("");
    setOpenDropdown(null);
  };

  const clearDate = () => {
    setDate("");
    setDateValue("");
    setOpenDropdown(null);
  };

  const clearRepeat = () => {
    setRepeat("");
    setRepeatValue("");
    setOpenDropdown(null);
  };

  const repeatOptions = [
    { label: "Günlük", value: "daily" },
    { label: "Haftalık", value: "weekly" },
    { label: "Aylık", value: "monthly" },
    { label: "Yıllık", value: "yearly" },
  ];

  return (
    <div className="task-input-container bg-white/10 glass rounded-2xl p-6 mb-5 border border-white/20">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="alarm" value={alarmValue} />
        <input type="hidden" name="date" value={dateValue} />
        <input type="hidden" name="repeat" value={repeatValue} />

        <div className="flex mb-4">
          <div className="flex-1">
            <h3 className="text-white font-semibold">Görev Ekle</h3>
          </div>
          <div className="flex-1 flex justify-end space-x-3 -mt-1">
            {/* Alarm Dropdown */}
            <div className="dropdown-container relative">
              <button
                type="button"
                className="data-toggle text-gray-200 rounded-full hover:bg-white/20 focus:bg-white/20 p-1"
                title="Bana Anımsat"
                onClick={() => toggleDropdown("alarm")}
              >
                <i className="bi bi-alarm text-xs md:text-base"></i>
                {alarm && (
                  <span className="text-xs md:text-base text-blue-500">
                    {" "}
                    {alarm}
                  </span>
                )}
              </button>

              {openDropdown === "alarm" && (
                <div className="dropdown-menu absolute top-full mt-2 left-1/2 transform -translate-x-1/2 min-w-[230px] text-white bg-white/20 glass border border-white/20 rounded shadow-lg z-50 md:left-auto md:right-0 md:transform-none">
                  <ul>
                    <li>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-300 hover:text-gray-950"
                        onClick={() => {
                          const dt = getDynamicDate("today");
                          setAlarm(formatDateLocal(dt));
                          setAlarmValue(toMySQLDateTime(dt));
                          setOpenDropdown(null);
                        }}
                      >
                        <span>Gün içinde</span>
                        <span className="font-medium">+3 saat</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-300 hover:text-gray-950"
                        onClick={() => {
                          const dt = getDynamicDate("tomorrow");
                          setAlarm(formatDateLocal(dt));
                          setAlarmValue(toMySQLDateTime(dt));
                          setOpenDropdown(null);
                        }}
                      >
                        <span>Yarın</span>
                        <span className="font-medium">09:00</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-300 hover:text-gray-950"
                        onClick={() => {
                          const dt = getDynamicDate("nextweek");
                          setAlarm(formatDateLocal(dt));
                          setAlarmValue(toMySQLDateTime(dt));
                          setOpenDropdown(null);
                        }}
                      >
                        <span>Gelecek hafta</span>
                        <span className="font-medium">09:00</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full text-center px-4 py-2 hover:bg-gray-300 hover:text-gray-950 border-t"
                        onClick={() => setOpenDropdown("alarmCustom")}
                      >
                        Özel Tarih & Saat
                      </button>
                    </li>
                    {alarm && (
                      <li>
                        <button
                          type="button"
                          className="w-full text-center px-4 py-2 text-red-500 hover:bg-gray-300 border-t"
                          onClick={clearAlarm}
                        >
                          <i className="bi bi-trash"></i> Anımsatıcıyı kaldır
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {openDropdown === "alarmCustom" && (
                <div className="dropdown-menu absolute top-full mt-2 left-1/2 transform -translate-x-1/2 min-w-[230px] text-white rounded shadow-lg z-50 md:left-auto md:right-0 md:transform-none">
                  <div className="max-w-md mx-auto">
                    <div className="relative">
                      <input
                        type="datetime-local"
                        className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl border border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            const dt = new Date(value);
                            setAlarm(formatDateLocal(dt));
                            setAlarmValue(toMySQLDateTime(dt));
                          } else {
                            setAlarm("");
                            setAlarmValue("");
                          }
                        }}
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                        <i className="bi bi-calendar-plus-fill text-2xl transform -translate-x-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Date Dropdown */}
            <div className="dropdown-container relative">
              <button
                type="button"
                className="data-toggle text-gray-200 rounded-full hover:bg-white/20 focus:bg-white/20 p-1"
                title="Son Tarih Ekle"
                onClick={() => toggleDropdown("date")}
              >
                <i className="bi bi-calendar3 text-xs md:text-base"></i>
                {date && (
                  <span className="text-xs md:text-base text-blue-500">
                    {" "}
                    {date}
                  </span>
                )}
              </button>

              {openDropdown === "date" && (
                <div className="dropdown-menu absolute right-0 mt-2 min-w-[230px] text-white bg-white/20 glass border border-white/20 rounded shadow-lg z-50">
                  <ul>
                    <li>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-300 hover:text-gray-950"
                        onClick={() => {
                          const dt = getDynamicDate("tomorrow");
                          setDate(formatDateLocal(dt));
                          setDateValue(toMySQLDateTime(dt));
                          setOpenDropdown(null);
                        }}
                      >
                        <span>Yarın</span>
                        <span className="font-medium">09:00</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-300 hover:text-gray-950"
                        onClick={() => {
                          const dt = getDynamicDate("nextweek");
                          setDate(formatDateLocal(dt));
                          setDateValue(toMySQLDateTime(dt));
                          setOpenDropdown(null);
                        }}
                      >
                        <span>Gelecek hafta</span>
                        <span className="font-medium">09:00</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full text-center px-4 py-2 hover:bg-gray-300 hover:text-gray-950 border-t"
                        onClick={() => setOpenDropdown("dateCustom")}
                      >
                        Özel Tarih
                      </button>
                    </li>
                    {date && (
                      <li>
                        <button
                          type="button"
                          className="w-full text-center px-4 py-2 text-red-500 hover:bg-gray-300 border-t"
                          onClick={clearDate}
                        >
                          <i className="bi bi-trash"></i> Son tarihi kaldır
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {openDropdown === "dateCustom" && (
                <div className="dropdown-menu absolute top-full mt-2 left-1/2 transform -translate-x-1/2 min-w-[230px] text-white rounded shadow-lg z-50 md:left-auto md:right-0 md:transform-none">
                  <div className="max-w-md mx-auto">
                    <div className="relative">
                      <input
                        type="datetime-local"
                        className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-xl border border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            const dt = new Date(value);
                            setDate(formatDateLocal(dt));
                            setDateValue(toMySQLDateTime(dt));
                          } else {
                            setDate("");
                            setDateValue("");
                          }
                        }}
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                        <i className="bi bi-calendar-plus-fill text-2xl transform -translate-x-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Repeat Dropdown */}
            <div className="dropdown-container relative">
              <button
                type="button"
                className="data-toggle text-gray-200 rounded-full hover:bg-white/20 focus:bg-white/20 p-1"
                title="Yinele"
                onClick={() => toggleDropdown("repeat")}
              >
                <i className="bi bi-arrow-clockwise text-xs md:text-base"></i>
                {repeat && (
                  <span className="text-xs md:text-base text-blue-500">
                    {" "}
                    {repeat}
                  </span>
                )}
              </button>

              {openDropdown === "repeat" && (
                <div className="dropdown-menu absolute right-0 mt-2 min-w-[230px] text-white bg-white/20 glass border border-white/20 rounded shadow-lg z-50">
                  <ul>
                    {repeatOptions.map((r) => (
                      <li key={r.value}>
                        <button
                          type="button"
                          className="w-full text-center px-4 py-2 hover:bg-gray-300 hover:text-gray-950"
                          onClick={() => {
                            setRepeat(r.label);
                            setRepeatValue(r.value);
                            setOpenDropdown(null);
                          }}
                        >
                          {r.label}
                        </button>
                      </li>
                    ))}
                    {repeat && (
                      <li>
                        <button
                          type="button"
                          className="w-full text-center px-4 py-2 text-red-500 hover:bg-gray-300 border-t"
                          onClick={clearRepeat}
                        >
                          <i className="bi bi-trash"></i> Yinelemeyi kaldır
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-3 mt-6">
          <input
            type="text"
            name="title"
            placeholder="Görev başlığı belirle..."
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            name="description"
            rows="2"
            placeholder="Görevin detayı..."
            className="w-full px-4 py-2 mt-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            Görev Ekle
          </button>
        </div>
      </form>
    </div>
  );
}
