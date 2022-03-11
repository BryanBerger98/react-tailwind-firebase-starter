import { Outlet } from 'react-router-dom';
import Header from './common/components/Header';

function Layout() {

    return(
        <div className='bg-slate-800 text-slate-400 min-h-screen'>
            <Header />
            <Outlet />
        </div>
    );

}
export default Layout;