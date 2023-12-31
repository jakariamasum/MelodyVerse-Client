import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { getAuth, updateProfile } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  const navigate=useNavigate()
  const auth=getAuth()
  // const {createUser,logOut}=useContext(AuthContext)
  const {createUser, logOut,googleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    data.role='student'; 
    console.log(data);

    createUser(data.email, data.password)
            .then(res => {
              fetch('https://music-school-server-pearl.vercel.app/students',{
                method: 'POST', 
                headers: {
                  'content-type':'application/json'
                }, 
                body: JSON.stringify(data)
              })
              .then(res=>res.json())
              .then(data=>{
                if(data.insertedId)
                {
                  logOut();
                  navigate('/login')
                  Swal.fire({
                    position: 'text-center',
                    icon: 'success',
                    title: 'Registration Successful! Please login',
                    showConfirmButton: false,
                    timer: 1500
                });
                }
              })
                console.log(res.user)
                 updateProfile(auth.currentUser, {
                     displayName: data.name, photoURL: data.photoURL
                 }).then(() => {
                     logOut()
                         .then(res => {
                         })
                         .catch(error => console.log(error.message))
                 }).catch((error) => {
                     console.log(error.message)
                 });

            })
            .catch(error => console.log(error.message))
    
    // Perform registration logic here
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const password = useRef({});
  password.current = watch('password', '');

  const handleGoogleLogin=()=>{
    googleLogin()
    .then(res=>{
      const info={
        name: res.user.displayName, 
        email: res.user.email, 
        photoURL: res.user.photoURL,
        role: 'admin'
      }
      localStorage.setItem('token','student');
      res.user.role='student';
      fetch('https://music-school-server-pearl.vercel.app/students',{
                method: 'POST', 
                headers: {
                  'content-type':'application/json'
                }, 
                body: JSON.stringify(info)
              })
              .then(res=>res.json())
              .then(data=>{
                console.log(data)
                if(data.insertedId)
                {
                  navigate('/')
                  Swal.fire({
                    position: 'text-center',
                    icon: 'success',
                    title: 'Login Successful!',
                    showConfirmButton: false,
                    timer: 1500
                });
                }
                fetch(`https://music-school-server-pearl.vercel.app/students?email=${res.user.email}`)
                .then(res=>res.json())
                .then(data=>localStorage.setItem('token',data.role))
              })
              


      console.log(res.user)
    })
    .catch(error=>console.log(error.message))
  }


  return (
    <div className="max-w-md mx-auto mt-8 ">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className={`border border-black focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email',
              },
            })}
            className={`border border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{6,}$/,
                  message:
                    'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
                },
              })}
              className={`border border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {passwordVisible ? (
                <RiEyeOffLine
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <RiEyeLine
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password.current || 'Passwords do not match',
            })}
            className={`border border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-gray-700 text-sm font-medium mb-1">
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            {...register('photoURL')}
            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-1">
            Gender
          </label>
          <select
            id="gender"
            {...register('gender')}
            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber')}
            className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">
            Address
          </label>
          <textarea
            id="address"
            {...register('address')}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm"
          ></textarea>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
          <Link to="/login" className="text-blue-500 hover:underline text-sm">
            Login
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500">Or register with:</p>
        <div className='text-center mb-12'>

          <button onClick={handleGoogleLogin}
            type="button"
            className="bg-red-500  text-white py-2 px-12 mt-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FaGoogle className="mr-2" /> <p>Google</p>
          </button>
         
        </div>
    </div>
  );
};

export default Register;