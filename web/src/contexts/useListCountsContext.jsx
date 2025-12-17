import { createContext, useContext, useState, useEffect } from "react";
import { controlTokens } from "../services/index.js";
import { getListCountsApi } from "../api/index.js";

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
  const [listCounts, setListCounts] = useState(0);
  const [listLoading, setListLoading] = useState(true);

  const fetchListCounts = async () => {
    try {
      setListLoading(true);

      // Tek bir token kontrolü yap
      const { success, accessToken } = await controlTokens();
      if (!success) {
        setListCounts(0);
        return;
      }
      // Yeni: Tek request ile backend'den tüm count'ları al
      const res = await getListCountsApi(accessToken);
      if (res.success) {
        setListCounts(res.listCounts);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
      setListCounts(0);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchListCounts();
  }, []);

  const updateListCount = (key, value) => {
  setListCounts((prev) => ({
    ...prev,
    [key]: value, // key mesela "list_count"
  }));
};

  const value = {
    listCounts,
    listLoading,
    refreshListCounts: fetchListCounts,
    updateListCount,
  };

  return (
    <ListCountsContext.Provider value={value}>
      {children}
    </ListCountsContext.Provider>
  );
};
