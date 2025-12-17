import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { controlTokens } from "../services/index.js";
import { getListCountsApi } from "../api/index.js";
import { useRefresh } from "./refresh-context.js";

const ListCountsContext = createContext();

export const useListCountsContext = () => {
  const context = useContext(ListCountsContext);
  if (!context)
    throw new Error(
      "useListCountsContext must be used within a ListCountsProvider"
    );
  return context;
};

export const ListCountsProvider = ({ children }) => {
  const { refreshKey } = useRefresh();
  const [listCounts, setListCounts] = useState({
    list_count: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchListCounts = useCallback(async () => {
    try {
      setLoading(true);

      const { success, accessToken } = await controlTokens();
      if (!success) {
        setListCounts({ list_count: 0 });
        return;
      }

      const res = await getListCountsApi(accessToken);

      // tolerate different backend shapes
      const payload = res?.listCounts || res?.counts || res || {};
      const newCounts = payload?.list_count ?? payload?.listCount ?? 0;

      setListCounts({ list_count: newCounts });
    } catch (error) {
      setListCounts({ list_count: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ refreshKey değiştiğinde list counts'u yeniden çek
  useEffect(() => {
    fetchListCounts();
  }, [refreshKey, fetchListCounts]);

  const value = {
    listCounts,
    loading,
    refreshListCounts: fetchListCounts,
  };

  return (
    <ListCountsContext.Provider value={value}>
      {children}
    </ListCountsContext.Provider>
  );
};
