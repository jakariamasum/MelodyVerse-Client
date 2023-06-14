import { useState } from "react";


const useAdminVerification = (email) => {
  const [isAdmin, setIsAdmin] = useState('student');

  fetch(`http://localhost:5000/students?email=${email}`)
  .then(res=>res.json())
  .then(data=>setIsAdmin(data))

  return isAdmin;
};

export default useAdminVerification;
