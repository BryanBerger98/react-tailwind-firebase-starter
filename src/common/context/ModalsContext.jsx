import { createContext, useContext, useState } from 'react';

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

    const openModal = (modalName) => {
        setCurrentModal(modalName);
    }

    const dismissAll = () => {
        setCurrentModal(null);
    }

    return(
        <ModalsContext.Provider value={{
            currentModal,
            openModal,
            dismissAll
        }}>
            {props.children}
        </ModalsContext.Provider>
    );

}
export default ModalsContextProvider;