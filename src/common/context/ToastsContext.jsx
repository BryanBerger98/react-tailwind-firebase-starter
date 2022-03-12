import React, { useCallback, useContext, useMemo, useState } from 'react';

const ToastsContext = React.createContext();
export { ToastsContext };

function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    first = ('000' + first.toString(36)).slice(-3);
    second = ('000' + second.toString(36)).slice(-3);
    return first + second;
  }

const ToastsContextProvider = ({children}) => {

    const initialState = [
        {
            id: 1,
            color: 'success',
            title: 'Saved successfully',
            message: null,
            dismissable: false,
            autoDismissDelay: 2000,
            showTime: false,
            redirectTo: null
        },
        {
            id: 2,
            color: 'primary',
            title: 'New message from Dave',
            message: 'Hi buddy! How are you doin\'?',
            dismissable: true,
            autoDismissDelay: 4000,
            showTime: true,
            redirectTo: '/'
        },
        {
            id: 3,
            color: 'primary',
            title: 'New message from Dave',
            message: 'Hi buddy! How are you doin\'?',
            dismissable: true,
            autoDismissDelay: 1000,
            showTime: true,
            redirectTo: '/'
        }
    ];

    const [toastsList, setToastsList] = useState(initialState);

    const pushToast = (toast) => {
        setToastsList([...toastsList, toast]);
    }

    const dismissToast = useCallback((toastId) => {
        const toasts = [...toastsList];
        const toastIndex = toasts.findIndex(toast => toast.id === toastId);
        toasts.splice(toastIndex, 1);
        setToastsList(toasts);
        return toasts;
    }, [toastsList]);

    const dismissAll = () => {
        setToastsList([]);
    }

    return(
        <ToastsContext.Provider value={useMemo(() => ({toastsList, dismissToast}), [toastsList, dismissToast])}>
            {children}
        </ToastsContext.Provider>
    );

}
export default ToastsContextProvider;

export const useToasts = () => {
    const ctx = useContext(ToastsContext);
  
    if (!ctx) {
      throw Error(
        'The `useToasts` hook must be called from a descendent of the `ToastProvider`.'
      );
    }
  
    return {
      addToast: ctx.add,
      removeToast: ctx.remove,
      removeAllToasts: ctx.removeAll,
      updateToast: ctx.update,
      toastStack: ctx.toasts,
    };
  };