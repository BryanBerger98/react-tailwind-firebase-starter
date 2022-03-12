import { useContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/components/Header';
import Toast from './common/components/Toast';
import { ToastsContext } from './common/context/ToastsContext';

function Layout() {

    const toastsContext = useContext(ToastsContext)
    const toastsList = toastsContext.toastsList;
    
    return(
        <div className='bg-slate-800 text-slate-400 min-h-screen relative'>
            {console.log('RENDER')}
            <Header />
            <Outlet />
            <div className='fixed top-20 right-4 flex flex-col gap-2'>
                {
                    toastsList.map(toast => 
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
                    )
                }
            </div>
        </div>
    );

}
export default Layout;