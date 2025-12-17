import {
  useState, Modal, Pressable, View, Text, TextInput, Platform, 
  DateTimePicker, Ionicons, Entypo, MaterialIcons
} from "../../libs/index";
import { taskFormSubmit } from "../../services/index";
import { useRefresh, useMessageContext } from "../../context/index";
import { useTranslation } from "react-i18next";

export default function TaskAddModal({ visible, onClose, listId = null }) {
  const { t } = useTranslation();
  const { triggerRefresh } = useRefresh();
  const { showSuccess, showError } = useMessageContext();

  // --- state'ler
  const [activeMenu, setActiveMenu] = useState(null);

  // gösterim stringleri (UI)
  const [chosenAlarm, setChosenAlarm] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const [chosenRepeat, setChosenRepeat] = useState("");

  // gerçek Date objeleri (submit / hesaplama)
  const [chosenAlarmValue, setChosenAlarmValue] = useState(null);
  const [chosenDateValue, setChosenDateValue] = useState(null);

  // picker kontrol
  const [pickerMode, setPickerMode] = useState(null);
  const [tempDate, setTempDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // form input
  const [taskName, setTaskName] = useState("");

  // --- yardımcı (format)
  const pad = (n) => String(n).padStart(2, "0");
  const formatDateTime = (d) =>
    `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} - ${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;

  /**
   * Kesin çalışan tarih üretici:
   * - hours: saat ekle (pozitif/negatif)
   * - days: gün ekle
   * - forceMidnight: saati 00:00 yap
   *
   * ms toplama yöntemi ile hesaplama yapar (deterministic).
   */
  const getDateWithDisplay = ({ hours = 0, days = 0, forceMidnight = false } = {}) => {
    const now = new Date();
    const msToAdd = (hours * 3600 + days * 24 * 3600) * 1000; // saniye -> ms
    const d = new Date(now.getTime() + msToAdd);
    if (forceMidnight) d.setHours(0, 0, 0, 0);
    return { value: d, display: formatDateTime(d) };
  };

  // --- toggle menu
  const toggleMenu = (menu) =>
    setActiveMenu((prev) => (prev === menu ? null : menu));

  // --- reset / close
  const handleClose = () => {
    setActiveMenu(null);
    setShowPicker(false);
    setChosenAlarm("");
    setChosenDate("");
    setChosenRepeat("");
    setChosenAlarmValue(null);
    setChosenDateValue(null);
    setTempDate(new Date());
    setPickerMode(null);
    setTaskName("");
    onClose();
  };

  // --- submit (taskFormSubmit servisine Date objesi gönderiyoruz)
  const handleSubmit = async () => {
    try {
      const message = await taskFormSubmit({
        taskName,
        chosenDate: chosenDateValue,
        chosenAlarm: chosenAlarmValue,
        chosenRepeat,
        listId,
        t
      });

      triggerRefresh();
      showSuccess(message);
      handleClose();
    } catch (err) {
      showError(err.message);
    }
  };

  // --- tarih seçici event handler
  const onChangeDate = (event, selected) => {
    if (event?.type === "dismissed") {
      setShowPicker(false);
      return;
    }
    if (!selected) {
      setShowPicker(false);
      return;
    }

    if (pickerMode === "alarm-date") {
      setTempDate(selected);
      if (Platform.OS === "android") {
        setPickerMode("alarm-time");
        setShowPicker(true);
      } else {
        // iOS tek adım datetime seçtiyse
        setChosenAlarm(formatDateTime(selected));
        setChosenAlarmValue(selected);
        setShowPicker(false);
      }
    } else if (pickerMode === "alarm-time") {
      // android: önce tarih sonra saat seçimi -> tam tarih oluştur
      const full = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        tempDate.getDate(),
        selected.getHours(),
        selected.getMinutes()
      );
      setChosenAlarm(formatDateTime(full));
      setChosenAlarmValue(full);
      setShowPicker(false);
    } else if (pickerMode === "date") {
      setTempDate(selected);
      if (Platform.OS === "android") {
        setPickerMode("date-time");
        setShowPicker(true);
      } else {
        // iOS sadece tarih seçtiyse saati 00:00 yap
        const d = new Date(selected);
        d.setHours(0, 0, 0, 0);
        setChosenDate(formatDateTime(d));
        setChosenDateValue(d);
        setShowPicker(false);
      }
    } else if (pickerMode === "date-time") {
      const fullDate = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        tempDate.getDate(),
        selected.getHours(),
        selected.getMinutes()
      );
      setChosenDate(formatDateTime(fullDate));
      setChosenDateValue(fullDate);
      setShowPicker(false);
    } else {
      setShowPicker(false);
    }
  };

  // --- seçenekler (value: {value: Date, display: string})
  const options = {
    alarm: [
      { title: t("taskAdd.remindMe") },
      { label: t("taskAdd.todayWithin"), value: getDateWithDisplay({ hours: 3 }) }, // +3 saat
      { label: t("taskAdd.tomorrow"), value: getDateWithDisplay({ days: 1 }) }, // +1 gün (aynı saat)
      { label: t("taskAdd.nextWeek"), value: getDateWithDisplay({ days: 7 }) }, // +7 gün
    ],
    date: [
      { title: t("taskAdd.dueDate") },
      { label: t("taskAdd.tomorrow"), value: getDateWithDisplay({ days: 1 }) },
      { label: t("taskAdd.nextWeek"), value: getDateWithDisplay({ days: 7 }) },
    ],
    repeat: [
      { title: t("taskAdd.repeat") },
      { label: t("taskAdd.repeatOptions.daily"), value: "daily" },
      { label: t("taskAdd.repeatOptions.weekly"), value: "weekly" },
      { label: t("taskAdd.repeatOptions.monthly"), value: "monthly" },
      { label: t("taskAdd.repeatOptions.yearly"), value: "yearly" },
    ],
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable className="flex-1 bg-black/60" onPress={handleClose} />

      <View className="absolute bottom-0 w-full bg-violet-950 rounded-t-2xl p-5">
          {/* Menü seçenekleri */}
        {["alarm", "date", "repeat"].map(
          (menu) =>
            activeMenu === menu && (
              <View key={menu} className="bg-violet-950 rounded-lg gap-3 mb-5">
                <Text className="text-white text-lg font-semibold mb-2">
                  {options[menu][0].title}
                </Text>

                {/* Liste elemanları */}
                {menu !== "repeat" ? (
                  options[menu]
                    .slice(1)
                    .map(({ label, value }) => {
                      const dateObj = value?.value ?? value;
                      const display = value?.display ?? (dateObj ? formatDateTime(dateObj) : "");

                      return (
                        <Pressable
                          key={label}
                          onPress={() => {
                            if (menu === "alarm") {
                              setChosenAlarm(display);
                              setChosenAlarmValue(dateObj ?? null);
                            } else {
                              setChosenDate(display);
                              setChosenDateValue(dateObj ?? null);
                            }
                            setActiveMenu(null);
                          }}
                        >
                          <View className="flex-row justify-between bg-white/10 p-3 rounded-xl mb-2">
                            <Text className="text-white text-lg">{label}</Text>
                            <Text className="text-white text-lg font-semibold">
                              {display}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })
                ) : (
                  options.repeat
                    .slice(1)
                    .map(({ label, value }) => (
                      <Pressable
                        key={value}
                        onPress={() => {
                          setChosenRepeat(value);
                          setActiveMenu(null);
                        }}
                      >
                        <Text className="bg-white/10 p-3 rounded-xl text-white text-lg text-center mb-2">
                          {label}
                        </Text>
                      </Pressable>
                    ))
                )}

                {/* Özel Tarih/Saat butonu */}
                {menu !== "repeat" && (
                  <Pressable
                    onPress={() => {
                      setPickerMode(menu === "alarm" ? "alarm-date" : "date");
                      setShowPicker(true);
                    }}
                  >
                    <Text className="bg-white/10 p-3 rounded-xl text-white text-lg text-center">
                      {t("taskAdd.special")} {menu === "alarm" ? t("taskAdd.customDateTime") : t("taskAdd.customDate")}
                    </Text>
                  </Pressable>
                )}
              </View>
            )
        )}

        {/* Tarih seçici */}
        {showPicker && (
          <DateTimePicker
            value={tempDate}
            mode={
              pickerMode === "alarm-date"
                ? Platform.OS === "ios"
                  ? "datetime"
                  : "date"
                : pickerMode === "alarm-time"
                ? "time"
                : pickerMode === "date"
                ? Platform.OS === "ios"
                  ? "date"
                  : "date"
                : "time"
            }
            display="default"
            locale="tr-TR"
            onChange={onChangeDate}
          />
        )}

        {/* Üstteki ikon menüsü */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-xl text-white font-semibold">{t("taskAdd.title")}</Text>
          <View className="flex-row gap-7">
            <Pressable onPress={() => toggleMenu("alarm")}>
              <Ionicons
                name="alarm-outline"
                size={26}
                color={activeMenu === "alarm" ? "#3b82f6" : "#dedede"}
              />
            </Pressable>
            <Pressable onPress={() => toggleMenu("date")}>
              <Entypo
                name="calendar"
                size={24}
                color={activeMenu === "date" ? "#3b82f6" : "#dedede"}
              />
            </Pressable>
            <Pressable onPress={() => toggleMenu("repeat")}>
              <MaterialIcons
                name="event-repeat"
                size={25}
                color={activeMenu === "repeat" ? "#3b82f6" : "#dedede"}
              />
            </Pressable>
          </View>
        </View>

        {/* Seçilen değerlerin gösterimi */}
        <View className="items-end mb-3 gap-1">
          {chosenAlarm !== "" && (
            <Text className="text-white text-lg">
              {t("taskItem.info.remind")}: <Text className="text-blue-500 text-base">{chosenAlarm}</Text>
            </Text>
          )}

          {chosenDate !== "" && (
            <Text className="text-white text-lg">
              {t("taskItem.info.due")}: <Text className="text-blue-500 text-base">{chosenDate}</Text>
            </Text>
          )}

          {chosenRepeat !== "" && (
            <Text className="text-white text-lg">
              {t("taskItem.info.repeat")}:{" "}
              <Text className="text-blue-500 text-base">
                {options.repeat.find((r) => r.value === chosenRepeat)?.label || chosenRepeat}
              </Text>
            </Text>
          )}
        </View>

        {/* Başlık ve açıklama girişleri */}
        <TextInput
          value={taskName}
          onChangeText={setTaskName}
          className="text-white p-3 mb-3 bg-white/20 rounded-xl"
          placeholder={t("taskAdd.placeholders.taskName")}
          placeholderTextColor="#E5E7EB"
        />
        
        {/* Görev ekle butonu */}
        <Pressable
          onPress={handleSubmit}
          className="bg-purple-600 items-center p-3 rounded-xl"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="add" size={23} color="white" />
            <Text className="ml-2 text-white text-xl">{t("taskAdd.submit")}</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}
