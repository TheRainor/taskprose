import { View, Text, AntDesign } from "../libs/index";
import { useUser } from "../context/index";


export default function Header() {
  const { user } = useUser();
  return (
    <View className="h-[14%] w- bg-indigo-950 flex-row items-center self-center">
      <View className="mt-[10%] ml-[5%] h-[45%] w-[13%] p-3 rounded-xl items-center justify-center bg-purple-500">
        <AntDesign name="check" size={26} color="white" />
      </View>
      <Text className="flex-1 ml-[3%] mt-[10%] text-white text-2xl font-bold">
        TaskProse
      </Text>
      <View className="flex-1 items-end justify-center mt-12 mr-[3%]">
        <View className="flex-row gap-2">
          <Text className="text-white text-xl">{user?.first_name || "Name"}</Text>
          <Text className="text-white text-xl">{user?.last_name || "Surname"}</Text>
        </View>
        <Text className="text-gray-200 text-sm mt-1">{user?.email || "E-mail"}</Text>
      </View>
    </View>
  );
}
