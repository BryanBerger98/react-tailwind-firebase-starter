import { Outlet } from 'react-router-dom';
import Header from './common/components/Header';

function Layout() {

    return(
        <>
            <Header />
            <Outlet />
        </>
    );

}
export default Layout;