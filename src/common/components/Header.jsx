import { Link } from 'react-router-dom';

function Header() {

    return(
        <nav className="flex p-5 bg-slate-900 drop-shadow-lg text-slate-50 fixed inset-x-0">
            <Link to='/' className='font-bold'>React - Tailwind | Firebase</Link>
            <ul className="list-none flex ml-auto gap-4 text-sm items-center">
                <li>
                    <Link className='hover:underline' to='/'>Home</Link>
                </li>
                <li>
                    <Link className='hover:underline' to='/signin'>Sign in</Link>
                </li>
                <li>
                    <Link className='px-5 py-3 bg-sky-500 hover:bg-sky-400 rounded-lg font-semibold' to='/signup'>Signup</Link>
                </li>
            </ul>
        </nav>
    );

}
export default Header;