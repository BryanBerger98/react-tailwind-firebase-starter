import '../styles/Home.css';
import logo from '../../logo.svg';

function Home() {

    return(
        <div className="Home h-screen text-center flex">
            <div className="Home-container px-2 m-auto">
                <img src={logo} className="Home-logo" alt="logo" />
                <p className='text-3xl'>
                    Welcome on <code>react-tailwind-firebase-starter</code>.
                </p>
                <p className='text-2xl mb-5'>A starter pack to develop the application of your dream easily.</p>
                <a
                    className="Home-link"
                    href="https://github.com/BryanBerger98/react-tailwind-firebase-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Checkout repository
                </a>
            </div>
        </div>
    )

}
export default Home;