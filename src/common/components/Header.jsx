import { Link } from 'react-router-dom';

function Header() {

    return(
        <nav className="flex p-5 bg-slate-900 drop-shadow-lg text-slate-50 fixed inset-x-0">
            <Link to='/' className='font-bold'>React - Tailwind | Firebase</Link>
            <ul className="list-none flex ml-auto gap-4">
                <li>
                    <Link className='hover:underline' to='/'>Home</Link>
                </li>
                <li>
                    <Link className='hover:underline' to='/signin'>Signin</Link>
                </li>
                <li>
                    <Link className='px-4 py-3 bg-cyan-700 hover:bg-cyan-800 rounded-xl' to='/signup'>Signup</Link>
                </li>
            </ul>
        </nav>
    );

}
export default Header;