import { Link } from 'react-router-dom';
import { FiLogIn, FiHome } from 'react-icons/fi';

function Header() {

    return(
        <nav className="flex p-5 bg-slate-900 drop-shadow-lg text-slate-200 fixed inset-x-0">
            <Link to='/' className='font-bold'>React - Tailwind | Firebase</Link>
            <ul className="list-none flex ml-auto gap-4 text-sm items-center">
                <li>
                    <Link className='hover:text-slate-50 flex' to='/'><FiHome className='my-auto mr-1' />Home</Link>
                </li>
                <li>
                    <Link className='hover:text-slate-50 flex' to='/signin'><FiLogIn className='my-auto mr-1' /> Sign in</Link>
                </li>
                <li>
                    <Link className='px-5 py-3 bg-sky-500 text-slate-50 hover:bg-sky-400 rounded-lg font-semibold' to='/signup'>Signup</Link>
                </li>
            </ul>
        </nav>
    );

}
export default Header;