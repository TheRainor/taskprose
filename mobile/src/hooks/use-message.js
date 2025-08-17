import { useState, useEffect, useRoute, useNavigation } from "../libs/index";

/**
 * Genel mesaj hook'u (success, error vs. için kullanılabilir)
 * @param {string} key - route.params içinde kullanılacak param adı ("successMessage", "errorMessage")
 * @param {number} duration - mesajın ekranda kalma süresi (ms)
 */

function useMessage(key, duration = 3000) {
  const route = useRoute();
  const navigation = useNavigation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (route.params?.[key]) {
      setMessage(route.params[key]);
      const timer = setTimeout(() => {
        setMessage("");
        navigation.setParams({ [key]: null });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [route.params?.[key], duration]);

  return message;
}

export function useSuccessMessage(duration) {
  return useMessage("successMessage", duration);
}

export function useErrorMessage(duration) {
  return useMessage("errorMessage", duration);
}