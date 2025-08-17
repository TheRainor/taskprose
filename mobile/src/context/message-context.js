import { createContext, useContext, useState, useCallback } from "../libs/index";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showSuccess = useCallback((message, duration = 3000) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, duration);
  }, []);

  const showError = useCallback((message, duration = 3000) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, duration);
  }, []);

  const clearMessages = useCallback(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, []);

  return (
    <MessageContext.Provider
      value={{
        successMessage,
        errorMessage,
        showSuccess,
        showError,
        clearMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
} 