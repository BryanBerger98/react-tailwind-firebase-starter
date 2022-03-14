import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ModalsContext = createContext();
export { ModalsContext };

const useModalsContext = () => {
    const context = useContext(ModalsContext);
    if (context === undefined) {
        throw new Error('useModalsContext was used outside of its Provider');
    }
    return context;
};
export { useModalsContext };

const ModalsContextProvider = props => {

    const [currentModal, setCurrentModal] = useState(null);

    const openModal = useCallback((modalName) => {
        setCurrentModal(modalName);
    }, []);

    const dismissAll = useCallback(() => {
        setCurrentModal(null);
    }, []);

    const contextValues = useMemo(() => ({
        currentModal,
        openModal,
        dismissAll
    }), [
        currentModal,
        openModal,
        dismissAll
    ]);

    return(
        <ModalsContext.Provider value={contextValues}>
            {props.children}
        </ModalsContext.Provider>
    );

}
export default ModalsContextProvider;