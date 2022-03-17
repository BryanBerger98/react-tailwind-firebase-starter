import { useEffect, useMemo, useState } from "react";
import { useToastsContext } from "../context/ToastsContext";
import Toast from './Toast';

function ToastsStack() {

    const toastsContext = useToastsContext();

    const initialState = useMemo(() => [
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
    ], []);

    // const [toasts, setToasts] = useState([]);
    const toasts = toastsContext.toastsList;
    // useEffect(() => {
    //     setToasts(toastsContext.toastsList);
    // }, [toastsContext]);

    return(
        <div className='fixed top-20 right-4 flex flex-col gap-2'>
            {console.log('RENDER')}
            {
                toasts.map(toast => 
                (
                    <Toast
                    key={toast.id.toString()}
                    id={toast.id}
                    color={toast.color}
                    title={toast.title}
                    message={toast.message}
                    dismissable={toast.dismissable}
                    showTime={toast.showTime}
                    autoDismissDelay={toast.autoDismissDelay}
                    redirectTo={toast.redirectTo} />
                ))
            }
        </div>
    );

}
export default ToastsStack;