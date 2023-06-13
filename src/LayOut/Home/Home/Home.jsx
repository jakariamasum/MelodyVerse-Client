import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Slider from "../Slider/Slider";

const Home = () => {
    return (
        <div>
            <Slider/>
            <PopularClass/>
            <PopularInstructor/>
        </div>
    );
};

export default Home;