import React from "react"
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import githubIcon from "../assets/github icon.png"

import { CgProfile } from "react-icons/cg";
import { logoutRoute } from "../utils/ApiRoutes.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);

    const handleNavBarToggle = () => {
      setIsNavBarOpen(!isNavBarOpen);
    };
  
    const closeNavBar = () => {
      setIsNavBarOpen(false);
    };

    const navigate=useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const handleLogout = async () => {
        try {
            const response = await fetch(logoutRoute, {
                method: "GET",
                credentials: "include",
            })
            const data = await response.json();
            console.log(data);

            if (data.success) {
                toast.success("logged out successfully...",toastOptions);
                
                navigate("/login");

                setTimeout(() => {

                    window.location.reload(); // Ensure fresh auth check
                }, 500);


            }

        } catch (error) {
            console.log("error in logout step....", error);
            toast.error(error,toastOptions);
            navigate("/login");
        }
    }
  
    return (
      <div className="border-b py-3 bg-purple-700 text-sm sm:text-xl 2xl:text-2xl px-20">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-12 h-12">
                <img src={logo} alt="logo" width={48} height={48} />
              </div>
              <span className="text-xl font-semibold text-white hover:text-purple-300">
                Modern-Arter
              </span>
            </div>
          </Link>
  
          {/* For devices larger than md */}
          <nav className="hidden md:flex space-x-20">
            <Link
              to="/gallery"
              className="text-white hover:text-purple-300 transition-colors duration-300"
            >
              Gallery
            </Link>
            <Link
              to="/instructions"
              className="text-white hover:text-purple-300 transition-colors duration-300"
            >
              How to Use?
            </Link>
            <button 
            className="text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer"
            onClick={handleLogout}>
              logout
            </button>
          </nav>
  
          {/* Devices smaller than md */}
          <button
            className="md:hidden bg-purple-600 text-white font-semibold px-6 mr-2 py-2 hover:bg-purple-500 transition-colors duration-300 rounded-3xl"
            onClick={handleNavBarToggle}
          >
            Menu
          </button>
  
          {/* The NavBar popup */}
          {isNavBarOpen && (
            <div className="md:hidden absolute top-16 right-0 left-0 bg-purple-700 py-3 gap-y-1 flex flex-col items-center space-y-3 z-50">
              <Link href="/gallery">
                <p
                  className="text-white text-lg hover:text-purple-300 transition-colors duration-300"
                  onClick={closeNavBar}
                >
                  Gallery
                </p>
              </Link>
              <Link href="/instructions">
                <p
                  className="text-white text-lg hover:text-purple-300 transition-colors duration-300 "
                  onClick={closeNavBar}
                >
                  How to Use?
                </p>
              </Link>
             
            </div>
          )}
  
          <div
            id="toggleModeBtn"
            className="hidden md:block bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 transition-colors duration-300 rounded-3xl"
          >
            

          <CgProfile  className="cursor-pointer"/>

          </div>
        </div>
      </div>
    );
};

export default Navbar;
