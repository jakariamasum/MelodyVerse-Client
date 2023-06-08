import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Perform login logic here
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md py-2 px-4 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between mb-4">
            <input type="submit" value="Login" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md "/>
          <Link to="/register" className="text-blue-500 hover:underline text-sm">Register</Link>
        </div>
      </form>
        <p className="text-center text-gray-500">Or login with:</p>
        <div className='text-center'>

          <button
            type="button"
            className="bg-red-500  text-white py-2 px-12 mt-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FaGoogle className="mr-2" /> <p>Google</p>
          </button>
         
        </div>
    </div>
  );
};

export default Login;
