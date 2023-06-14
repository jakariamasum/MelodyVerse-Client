import OverView from "../OverView/OverView";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Slider from "../Slider/Slider";

const Home = () => {
    return (
        <div>
            <Slider/>
            <PopularClass/>
            <PopularInstructor/>
            <OverView/>
        </div>
    );
};

export default Home;