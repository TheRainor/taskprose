// src/context/list-id-context.js
import { createContext, useContext, useState } from "react";

const ListIdContext = createContext();

export function ListIdProvider({ children }) {
  const [currentListId, setCurrentListId] = useState(null);

  return (
    <ListIdContext.Provider value={{ currentListId, setCurrentListId }}>
      {children}
    </ListIdContext.Provider>
  );
}

export function useListId() {
  const context = useContext(ListIdContext);
  if (!context) {
    throw new Error("useListId must be used within ListIdProvider");
  }
  return context;
}