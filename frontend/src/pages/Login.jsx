import React, { useContext, useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate  } from "react-router-dom";
import { loginRoute } from "../utils/ApiRoutes";
import { artContext } from "../context/artContext.jsx";
 

const Login = (props) => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
   

    const {toastOptions}=useContext(artContext);
    const navigate=useNavigate();
    const handleChange = (e) => {

        setUserData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }

        })
        // console.log(userData);
    }

    
    const handleValidation = () => {
        const { username,  password  } = userData;

        if (username==="" || password==="") {
            toast.error("username and password is required",toastOptions);
            return false;
        }
         
        return true
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (handleValidation()) {
                const response = await fetch(loginRoute, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",

                    body: JSON.stringify(userData),
                })
                const data = await response.json();
                console.log(data)
                if (data.success) {
                    toast.success("login successfull...",toastOptions);
               
                     navigate("/");

                } else {
                    toast.error(data.message,toastOptions);
                    if(!data.exist){
                      navigate("/signup")
                    }
                    else{
                      navigate("/login");
                    }
                   
                }
            }
        } catch (error) {
            console.log("error in login....", error);
            toast.error(error,toastOptions);
            navigate("/login");
        }

    }




    return (
        <div className="flex flex-col bg-[#131324]   h-screen w-screen   justify-center items-center gap-4 text-white">

            <form action="" onSubmit={handleSubmit} className="flex flex-col gap-8 bg-[#00000076]    rounded-[8px]  py-12 px-20">
                <div className="flex items-center justify-center gap-4">
                    <img src="https://res.cloudinary.com/dti8wm0fk/image/upload/v1739619094/logo_d8c0as.svg" alt="logo" className="w-20" />
                    <h1 className="uppercase text-white text-2xl"> Modern-Arter</h1>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    className="bg-transparent p-4 border-[0.1rem] border-[#4e0eff] rounded-[0.4rem] text-white w-full text-[1rem]"
                />
               
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    className="bg-transparent p-4 border-[0.1rem] border-[#4e0eff] rounded-[0.4rem] text-white w-full text-[1rem]"
                />
                 
                <button type="submit" className="bg-[#4e0eff] w-full py-2 hover border-none rounded-md font-extrabold cursor-pointer text-[16px] uppercase">Sign In</button>
                <span>
                    Don't have an account ? <Link to="/signup">Signup</Link>
                </span>
            </form>



        </div>
    )
};

export default Login;
