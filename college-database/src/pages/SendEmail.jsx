import React, { useEffect, useState } from 'react';
import Foter from '../component/Foter'
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const SendEmail = () => {
    const [name, setname] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [message, setmessage] = useState("");
    const [type,setType] = useState('department');
    const {departments,isAuthenticated} = useAuth();
    const [senderEmail, setSenderEmail] = useState("");
    const [subject,setSubject] = useState("");
    const [loading, setloading] = useState(false);
    
    // List of departments and their emails
    const [departmentEmail, setdepartmentEmail] = useState([]);

     const handleSelectChange = (e) => {
        setSelectedEmail(e.target.value);
     
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setloading(true)
    if(!isAuthenticated){
        return toast.info("Login first!")
    }
    
    if(!name || !selectedEmail || !message || !senderEmail || !subject){
        return toast.error("Please fill all the fields!");
    }
    axios.defaults.withCredentials = true;
    try {

        const {data} = await axios.post('http://localhost:3000/searchdata/send-email',{name,selectedEmail,message,senderEmail,subject});

        if(data.success){
            toast.success(data.message)
            setSelectedEmail('');
            setSenderEmail('');
            setSubject('');
            setmessage('');
            setname('');
            setType('department');
        }
        else{
            toast.error(data.message)
        }
        
    } catch (error) {

        toast.error(error.message)
        
    }
    finally{
        setloading(false);
    }
  }

  
    useEffect(()=>{
        const deptEmail = departments.map(dept => ({
        name: dept.name,
        email: dept.deptEmail
      }));

    //   setdepartmentEmail(deptEmail)
},[departments])



   
    


    return (
        <div className='w-full flex flex-col gap-8 mt-22'>

        
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">
                Contact Faculty / Department
            </h2>
            <p className="text-gray-600 text-center mb-4">
                Have questions? Send an email to a faculty member or department.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                  
                    placeholder="Your Name"
                    
                    className="w-full px-4 py-2 border rounded-md focus:outline-none "
                    required
                    value={name}
                    onChange={(e)=>setname(e.target.value)}
                    
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none "
                    required
                    value={senderEmail}
                    onChange={(e)=>setSenderEmail(e.target.value)}
                />

                {/* Radio Button to Select Recipient Type */}
                <div className="flex gap-4">
                    <label>
                        <input
                            type="radio"
                            name="recipientType"
                            value="teacher"
                            checked={type === "teacher"}
                            onChange={(e)=>setType("teacher")}
                        />
                        Send to Teacher
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="recipientType"
                            value="department"
                            checked={type === "department"}
                            onChange={(e)=>setType("department")}
                        />
                        Send to Department
                    </label>
                </div>

                {/* If Teacher is Selected: Show Input for Email */}
                {type === "teacher" && (
                    <input
                        type="email"
                        name="teacherEmail"
                        placeholder="Enter Teacher's Email"
                        className="w-full px-4 py-2 border rounded-md focus:ring-0"
                        required
                        value={selectedEmail}
                        onChange={(e)=>setSelectedEmail(e.target.value)}
                        
                    />
                )}

                {/* If Department is Selected: Show Dropdown */}
                {type === "department" && (
                    <select 
                        onChange={handleSelectChange}
                        name="departmentEmail"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        value={selectedEmail}
                    >
                        {departmentEmail.map(({name,email}) => (
                            <option key={email} value={email}>
                                {name}
                            </option>
                        ))}
                    </select>
                )}


                <input
                    type="text"
                    name="subject"
                    placeholder="Subject of Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none "
                    required
                    value={subject}
                    onChange={(e)=>setSubject(e.target.value)}
                />

                <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
                    rows="4"
                    required
                    value={message}
                    onChange={(e)=>setmessage(e.target.value)}
                ></textarea>

                <button
                    type="submit"
                    className="btn w-full bg-gradient-to-r from-red-400 to-red-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                   {loading ? "Sending..." : "Send Email" }
                </button>
            </form>
        </div>
        <Foter/>
        </div>

    );
};

export default SendEmail;
