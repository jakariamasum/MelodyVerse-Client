import Navigation from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    );
};

export default Main;