import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center h-[80vh] mt-16">
            <div className="text-center">
                <img src="https://i.ibb.co/3phbVnW/oops-message-comic-bubble-speech-cartoon-expression-illustration-gray-background-23-2147910157.jpg" className="h-[350px]" />
                <p className="text-xl text-center text-red-300 font-bold">Page Not Found</p>
                <Link to='/'><button className=" mt-4 btn btn-outline ">Back to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;