import { createContext, useContext } from "react";
import { useState } from "react"; 
export const artContext = createContext();
 


export default function ArtProvider({ children }) {
    
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    
  
    const [userDetails, setUserDetails] = useState(undefined); // Current logged in user
    

    const [isAuthenticated,setIsAuthenticated]=useState(false);
   
      

 
    const value = { toastOptions, userDetails,setUserDetails,isAuthenticated,setIsAuthenticated};

    return (<artContext.Provider value={value}>
        {children}
    </artContext.Provider>)
}


