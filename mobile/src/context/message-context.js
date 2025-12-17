import { createContext, useContext, useState, useCallback } from "../libs/index";
import i18n from "../libs/i18n";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showSuccess = useCallback((messageKey, duration = 3000) => {
    const translated = i18n.t(messageKey);
    setSuccessMessage(translated);

    setTimeout(() => {
      setSuccessMessage("");
    }, duration);
  }, []);

  const showError = useCallback((messageKey, duration = 3000) => {
    const translated = i18n.t(messageKey);
    setErrorMessage(translated);

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
