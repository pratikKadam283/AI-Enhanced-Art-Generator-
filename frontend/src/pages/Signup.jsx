import React, { useContext, useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { signupRoute } from "../utils/ApiRoutes";
import { artContext } from "../context/artContext.jsx";

const Signup = (props) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const {  toastOptions}=useContext(artContext);
    const navigate=useNavigate();
    const handleChange = (e) => {

        setUserData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }

        })
        // console.log(userData);
    }

   
    const handleValidation = () => {
        const { username, email, password, confirmPassword } = userData;

        if (password !== confirmPassword) {
            toast.error("password and confirmPassword should be same",toastOptions);
            return false;
        }
        else if (username.length <= 3) {
            toast.error("username should be greater than 3 characters", toastOptions);

            return false;
        }
        else if (password.length < 8) {
            toast.error("password should be equal or greater than 8 characters",toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("email is required",toastOptions)
            return false;
        }



        return true
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (handleValidation()) {
                const response = await fetch(signupRoute, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(userData),
                })
                const data = await response.json();
                console.log(data)
                if (data.success) {
                    toast.success("Registered Successfully...",toastOptions);
                    toast.success("Do login...",toastOptions);
                    navigate("/login");

                } else {
                    toast.error(data.message,toastOptions);
                    navigate("/signup")
                }
            }
        } catch (error) {
            console.log("error in registraion....", error);
            toast.error(error,toastOptions);
            navigate("/signup");
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
                    type="email"
                    placeholder="Email"
                    name="email"
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    className="bg-transparent p-4 border-[0.1rem] border-[#4e0eff] rounded-[0.4rem] text-white w-full text-[1rem]"
                />
                <button type="submit" className="bg-[#4e0eff] w-full py-2 hover border-none rounded-md font-extrabold cursor-pointer text-[16px] uppercase">Create User</button>
                <span>
                    Already have an account ? <Link to="/login">Login.</Link>
                </span>
            </form>



        </div>
    )
};

export default Signup;
