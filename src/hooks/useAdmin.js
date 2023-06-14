import { useState } from "react";


const useAdminVerification = (email) => {
  const [isAdmin, setIsAdmin] = useState('student');

  fetch(`https://music-school-server-pearl.vercel.app/students?email=${email}`)
  .then(res=>res.json())
  .then(data=>setIsAdmin(data))

  return isAdmin;
};

export default useAdminVerification;
