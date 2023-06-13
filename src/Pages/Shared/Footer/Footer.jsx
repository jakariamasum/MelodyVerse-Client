import { RiFacebookFill, RiTwitterFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 px-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-6">
            <h3 className="text-white text-lg font-semibold mb-4">MelodyVerse</h3>
            <p className="text-gray-400">MelodyVerse: Unleash your musical potential with our immersive online platform. Expert instructors offer interactive music classes for all ages and skill levels. Discover instruments, music theory, composition, and more. Foster creativity, enhance skills, and appreciate the art of music. Join our vibrant community and embark on a melodic adventure today!</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-6">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Sathmatha, Bogura</p>
            <p className="text-gray-400">Phone: 01878127340</p>
            <p className="text-gray-400">Email: melodyverse@gmail.com</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-6">
            <h3 className="text-white text-lg font-semibold mb-4">Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><Link href="#" className="hover:text-gray-200">Home</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-200">About</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-200">Services</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-gray-200">Contact</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-800 my-8" />
        <div className="flex justify-center items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} MelodyVerse. All Rights Reserved.</p>
          <div className="flex">
            <Link href="#" className="text-gray-400 hover:text-gray-200 mr-4">
              <RiFacebookFill className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-200">
              <RiTwitterFill className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
