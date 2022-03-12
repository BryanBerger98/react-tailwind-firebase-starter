import { useContext, useEffect, useState } from "react";
import { ModalsContext } from "../context/ModalsContext";

function Modal({children, modalName}) {

    const modalsContext = useContext(ModalsContext);
    const currentModal = modalsContext.currentModal;

    const [hiddenModal, setHiddenModal] = useState(true);
    const [hiddenBackground, setHiddenBackground] = useState(true);

    const dismissModal = () => {
        setHiddenModal(true);
        setTimeout(() => {
            setHiddenBackground(true);
        }, 350);
    }

    const openModal = () => {
        setHiddenBackground(false);
        setTimeout(() => {
            setHiddenModal(false);
        }, 350);
    }

    const onClickModalBackground = ($event) => {
        if ($event.target === $event.currentTarget) {
            modalsContext.dismissAll();
        }
    }

    useEffect(() => {
        if (currentModal && currentModal === modalName) {
            openModal();
        } else {
            dismissModal();
        }
    }, [currentModal, modalName]);
    
    useEffect(() => {
        const dismissButtons = document.querySelectorAll('[data-dismiss="modal"]');
        dismissButtons.forEach((el) => {
            el.addEventListener('click', () => {
                modalsContext.dismissAll();
            });
        });
    }, [modalsContext]);

    return (
        <div className={`transition ease-out duration-300 fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center opacity-100 ${hiddenBackground ? 'hidden' : ''} ${hiddenModal ? 'opacity-0' : ''}`} onClick={onClickModalBackground}>
             <div className={`transition ease-out duration-300 bg-slate-800 mx-2 md:mx-0 rounded-xl drop-shadow-lg ${hiddenModal ? '-translate-y-10' : ''}`}>
                {children}
            </div>
        </div>
    )

}
export default Modal;