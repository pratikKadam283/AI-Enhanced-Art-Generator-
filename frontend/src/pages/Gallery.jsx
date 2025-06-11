import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar.jsx";
import { getImages } from "../utils/ApiRoutes.jsx";
import { useLocation } from "react-router-dom";
import ImageCard from "../components/ImageCard.jsx";
const Gallery = (props) => {

  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const getImagesData = async () => {
    const response = await fetch(getImages, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    setImagesData(result.data);
    setLoading(false);
  }
  useEffect(() => {
    getImagesData();
    
  }, [location.pathname]);


   //   try {
  //     const response = await fetch(url, { mode: "cors" });
  //     const blob = await response.blob();
  //     const blobUrl = window.URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = blobUrl;
  //     link.download = `${prompt.replace(/\s+/g, "-")}.png`; // dynamic filename
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //   }
  // };
  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-gradient-to-b from-purple-600 to-blue-900 pt-10 md:min-h-[90%] ">
        {loading ? <div className="w-full h-80 flex justify-center items-center ">
          <div class="spinner"></div>
        </div> : <div >
          {imagesData.length>0 ? <div className=" w-[70%] mx-auto flex flex-wrap justify-center gap-8  ">
          {imagesData.map((item) => {
            return  <ImageCard key={item._id} url={item.imageUrl} prompt={item.prompt}/>
          })}
        </div>:<div className=" w-[70%] md:min-h-50 justify-center flex items-center mx-auto text-2xl text-center  text-white ">
             No artwork found...
          </div>}
        </div>
        }
      </div>
    </div>
  )
};

export default Gallery;
