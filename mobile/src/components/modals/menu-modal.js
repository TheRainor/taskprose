import { Modal, Pressable, View, Text, Octicons } from "../../libs/index";

export default function PageSelectionModal({
  visible,
  onClose,
  onSelect,    
  currentPage,
  counts,  
}) {
  const pages = [
  { key: 'TodoAll', label: 'Tüm Görevler', count: counts.all },
  { key: 'TodoToday', label: 'Günlük Görevler', count: counts.today },
  { key: 'TodoImportant', label: 'Önemli Görevler', count: counts.important },
  { key: 'TodoPlanned', label: 'Planlanan Görevler', count: counts.planned },
  { key: 'TodoCompleted', label: 'Tamamlanan Görevler', count: counts.completed },
];

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Arka plan */}
      <Pressable
        className="min-h-screen bg-black/60"
        onPress={onClose}
      />
      {/* Modal kutusu */}
      <View className="absolute bottom-0 w-full bg-violet-950 rounded-t-2xl p-5">
        <Text className="text-center text-white text-xl font-semibold mb-4">
          Menü
        </Text>
        {pages.map(page => {
          const isActive = page.key === currentPage;
          return (
            <Pressable
              key={page.key}
              onPress={() => {
                onSelect(page.key);
              }}
              className={`
                flex-row items-center justify-between
                p-3 px-6 mb-4 rounded-xl
                ${isActive ? 'bg-purple-800' : 'bg-white/20'}
              `}
            >
              <Text
                className={`
                  text-lg
                  ${isActive ? 'text-white font-bold' : 'text-white'}
                `}
              >
                <Octicons name="tasklist" size={18} color="white" /> {page.label}
              </Text>
              <Text className="bg-white/20 px-3 py-1 rounded-full text-white">{page.count}</Text>
              {isActive && <Text className="text-white">✓</Text>}
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}
