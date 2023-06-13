import Footer from '../Pages/Shared/Footer/Footer';
import Navigation from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Main;