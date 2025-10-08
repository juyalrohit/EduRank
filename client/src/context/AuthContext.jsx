import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// Context Create
const AuthContext = createContext();

// Provider

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [departments, setdepartments] = useState([]);
  const [teachers, setteachers] = useState([]);
  const [userData, setUserData] = useState("")

  const backendURL = import.meta.env.VITE_BACKEND_URL;



 //Get User Details
  const getUserData = async()=>{
      try {
        const {data} = await axios.get(backendURL+'/user/get-user',{withCredentials:true});
        setUserData(data);
        
      } catch (error) {
        toast.error(error.message);
      }
  }

  // Check User Auth Status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(backendURL + '/user/check-user', {
          withCredentials: true,
        });
        
        if (data.success) {
          setIsAuthenticated(true);
          getUserData(); // You might want to await this too if it’s async
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('Auth check failed:', error.message);
        setIsAuthenticated(false);
      }
    };
  
    checkAuth(); // Call the async function
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,departments,teachers,setdepartments,setteachers ,
    userData,setUserData, backendURL}}>

      {children}
      
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
