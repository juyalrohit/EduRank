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
  const [loading,setloading] = useState(true);
  const [userData, setUserData] = useState("")

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{

    const getData = async()=>{

      try{
        const response = await axios.get('http://localhost:3000/searchdata/teacher-department');
        const {teachers, departments} = response.data;
        setdepartments(departments);
        setteachers(teachers);
      }
      catch(error){
         console.log("Something went wrong!",error);
      }
      finally{
        setloading(false);
      }

    }

    getData();


  },[]);
 
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
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,departments,teachers,setdepartments,setteachers ,userData,setUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for Authentication
export const useAuth = () => useContext(AuthContext);
