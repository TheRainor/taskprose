import { useState, useCallback, useFocusEffect } from "../libs/index";
import { getLists, controlTokens, listDeleteSubmit } from "../services/index";
import { useRefresh, useMessageContext } from "../context/index";

export function useListManagement(navigation, type) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey, triggerRefresh } = useRefresh();
  const { showSuccess, showError } = useMessageContext();

  // Auth control + get lists
  useFocusEffect(
    useCallback(() => {
      const checkAuthAndFetch = async () => {
        const { accessToken } = await controlTokens();
        if (!accessToken) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
          return;
        }

        setLoading(true);
        const { data, error } = await getLists(type);
        setLists(data);
        navigation.setParams({ errorMessage: error });
        setLoading(false);
      };

      checkAuthAndFetch();
    }, [navigation, type, refreshKey])
  );

  // Delete the list
  const handleDelete = async (listId) => {
    try {
      const message = await listDeleteSubmit(listId);
      triggerRefresh();
      showSuccess(message);
    } catch (err) {
      showError(err.message);
    }
  };

  return {
    lists,
    setLists,
    loading,
    handleDelete,
  };
}
