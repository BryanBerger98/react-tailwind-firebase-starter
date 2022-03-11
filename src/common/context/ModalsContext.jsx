import React, { useState } from 'react';

const ModalsContext = React.createContext();
export { ModalsContext };

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