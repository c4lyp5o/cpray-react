import { Outlet, Link } from "react-router-dom";
import './css/pico.min.css';
import './css/custom.css';

const Layout = () => {
  return (
    <>
      <main className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quran">Quran</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </main>

      <Outlet />
    </>
  )
};

export default Layout;