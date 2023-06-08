import Navigation from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navigation />
            <button className="btn btn-active">Default</button>
            <button className="btn btn-active btn-neutral">Neutral</button>
            <button className="btn btn-active btn-primary">Primary</button>
            <button className="btn btn-active btn-secondary">Secondary</button>
            <button className="btn btn-active btn-accent">Accent</button>
            <button className="btn btn-active btn-ghost">Ghost</button>
            <Outlet />
        </div>
    );
};

export default Main;