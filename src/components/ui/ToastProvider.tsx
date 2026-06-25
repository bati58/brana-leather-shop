'use client';

import { useState, createContext, useContext, useCallback } from 'react';
import Toast from './Toast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={hideToast}
        type={toast.type}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
