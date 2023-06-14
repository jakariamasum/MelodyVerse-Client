
const OverView = () => {
    return (
        <div className="my-12 lg:mx-32">
            <h1 className="text-3xl font-bold my-5 text-center">Overview</h1>
            <div className="grid gap-4 text-center text-2xl font-bold grid-cols-1 md:grid-cols-3">
                <div className="bg-gray-400 ">
                    <img src="https://img.freepik.com/free-photo/group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-education-theme_627829-6007.jpg?size=626&ext=jpg" alt="" />
                    <p className="h-[50px] mt-4">Total Students: 200</p>
                </div>
                <div className="bg-gray-400">
                    <img src="https://img.freepik.com/free-photo/front-view-teacher-helping-kid_23-2150401322.jpg?size=626&ext=jpg" alt="" />
                        <p className="h-[50px] mt-4">Total instructor: 200</p>
                </div>
                <div className="bg-gray-400">
                    <img src="https://img.freepik.com/free-photo/collage-customer-experience-concept_23-2149367143.jpg?size=626&ext=jpg" alt="" />
                    <p className="h-[50px] mt-4">Review: 5.0</p>
                </div>
            </div>
        </div>
    );
};

export default OverView;