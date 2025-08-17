import { View, Text, Animated, Easing, useEffect, useRef, Fontisto } from "../libs/index";
import { useMessageContext } from "../context/index";

export default function StatusView({ loading }) {
  const { successMessage, errorMessage } = useMessageContext();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation(); // loading bitince dursun
    }
  }, [loading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (loading) {
    return (
      <View className="absolute mt-[100%] left-0 right-0 z-50 py-2 flex-row items-center justify-center">
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Fontisto name="spinner" size={24} color="white" />
        </Animated.View>
        <Text className="text-white text-center ml-2">Yükleniyor...</Text>
      </View>
    );
  }

  if (successMessage) {
    return (
      <View className="absolute mt-[27%] left-0 right-0 z-50 bg-green-800/80 py-2">
        <Text className="text-white text-center">{successMessage}</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View className="absolute mt-[27%] left-0 right-0 z-50 bg-red-800/80 py-2">
        <Text className="text-white text-center">{errorMessage}</Text>
      </View>
    );
  }

  return null;
}
