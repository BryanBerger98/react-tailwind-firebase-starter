import { memo, useCallback, useContext, useEffect, useState } from "react";
import { ToastsContext } from "../context/ToastsContext";
import { FiX, FiArrowRight } from 'react-icons/fi';
import { Link } from "react-router-dom";

function Toast({id, color, title, message, dismissable, autoDismissDelay, showTime, redirectTo}) {

    const toastsContext = useContext(ToastsContext);

    const [hiddenToast, setHiddenToast] = useState(false);

    const getToastColor = () => {
        switch (color) {
            case 'primary':
                return 'bg-sky-500';
            case 'danger':
                return 'bg-rose-500';
            case 'success':
                return 'bg-green-500';
            default:
                return 'bg-sky-500';
        }
    };

    const dismissToast = useCallback(() => {
        setHiddenToast(true);
        setTimeout(() => {
            document.getElementById(`toast${id}`).className = 'hidden';
            toastsContext.dismissToast(id);
        }, 310);
    }, [id, toastsContext]);

    useEffect(() => {
        const interval = setInterval(() => {
            dismissToast();
        }, autoDismissDelay);
        return () => {
            clearInterval(interval);
        }
    }, [autoDismissDelay, dismissToast]);

    return(
        <div id={'toast'+id} className={`transition ease-out duration-300 text-slate-50 text-sm rounded-lg drop-shadow-lg opacity-100 ${getToastColor()} ${hiddenToast ? 'translate-x-20 opacity-0' : ''}`}>
            <div className="w-72">
                <div className={`${(redirectTo && redirectTo !== '') || (message && message !== '') ? 'py-2' : 'py-4'} px-4 flex font-semibold items-center`}>
                    <p>{title}</p>
                    <div className="ml-auto flex items-center">
                        {showTime ? <p className="text-xs mr-3">11m ago</p> : null}
                        {dismissable ?
                            <button type="button" className="flex items-center justify-center text-base" onClick={dismissToast}>
                                <FiX />
                            </button>
                            : null
                        }
                    </div>
                </div>
                {
                    redirectTo && redirectTo !== '' ?
                    <Link className={`border-t border-slate-700 bg-slate-800 rounded-b-lg px-4 py-3 font-medium hover:bg-slate-700 block`} to={redirectTo}>
                        <p className="flex items-center justify-between">
                            <span>{message ? message : 'See more'}</span>
                            <FiArrowRight />
                        </p>
                    </Link>
                    :
                    message ?
                    <div className={`border-t border-slate-700 bg-slate-800 rounded-b-lg px-4 py-3 font-medium`}>
                        <p className="flex items-center justify-between">
                            <span>{message}</span>
                        </p>
                    </div>
                    : null
                }
            </div>
        </div>
    );

};
export default memo(Toast);