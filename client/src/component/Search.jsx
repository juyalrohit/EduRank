import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Search = () => {
  const [content, setContent] = useState("");
  const [results,setResult] = useState("");
  const [departments, setdepartments] = useState()
  const [teachers, setteachers] = useState();
  const naviGate = useNavigate();
  const [loading, setloading] = useState(true)

  const [suggestions, setsuggestions] = useState([]);

  
 


  useEffect(()=>{
    const getAllData = async()=>{
      try{
        const res = await axios.get('http://localhost:3000/searchdata/teacher-department');
        const {teachers, departments} = res.data;
        setteachers(teachers);
        setdepartments(departments);
     }
     catch(error){
        console.log("To fetch department and teacher data",error);
     }
     finally{
       setloading(false);
     }
   
    }

    getAllData();
  },[]);



const hadleSearchSection = async(e)=>{
  e.preventDefault();
  if(!content.trim()) return alert("Enter teacher and department name");

  const formatString = (str) => str?.replace(/\s+/g, '').toLowerCase();
  const key = formatString(content);
  
  
 const matchedTeacher = teachers.find((teacher)=>{
     return formatString(teacher.name).includes(key);
  })

  if(matchedTeacher){
    return naviGate(`/teacher/${matchedTeacher._id}`);
  }

 const matchedDepartment = departments.find((dept) => {
    return formatString(dept.name).includes(key);
  });

  if(matchedDepartment){
    return naviGate(`/department/${matchedDepartment._id}`)
  }

  alert("No matching teacher or department found!");
  
  
}

const handleChange = (e)=>{
  const value = e.target.value;

  setContent(e.target.value);

  if(value.trim()===''){
    setsuggestions([]);
    return;
  }

  const formatString = (str) => str?.replace(/\s+/g, '').toLowerCase();

  const key = formatString(value);
 
  const filterDepartments = departments?.filter((dept) =>
    formatString(dept.name).includes(key)
  );
  const filterTeachers = teachers?.filter((teach) =>
    formatString(teach.name).includes(key)
  );
  
  const allSuggestions = [
    ...filterDepartments.map((d) => ({ type: "department", name: d.name, id: d._id })),
    ...filterTeachers.map((t) => ({ type: "teacher", name: t.name, id: t._id })),
  ];

  setsuggestions(allSuggestions);

}





 
  return (
    <div className=" w-full sm:p-0 p-5   absolute top-[45%] sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className='flex justify-center items-center '>
      <input type="text" value={content}  onChange={ handleChange} className="px-4 py-3 w-[600px] text-left placeholder:text-left rounded-lg rounded-r-none border-2 border-white bg-white text-black placeholder-gray-400  hover: outline-indigo-400" placeholder="Search for department..."/>
      <button onClick={hadleSearchSection}  className="btn px-4 py-6  bg-blue-400  text-white rounded-l-none rounded-lg cursor-pointer text-2xl"><i  class="ri-search-line"></i></button>
      </div>
       

        {suggestions.length > 0 && (
        <div className="absolute sm:left-[29%]  bg-white sm:w-[600px]  max-h-50 overflow-hidden shadow-lg  rounded-md ">
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer z-50"
                onClick={() => {
                  if (item.type === "department") {
                    naviGate(`/department/${item.id}`);
                  } else {
                    naviGate(`/teacher/${item.id}`);
                  }
                }}
              >
                {item.type === "department" ? "Dept: " : "Teacher: "} {item.name}
              </div>
            ))}
  </div>
)}

     </div>
  )
}

export default Search;