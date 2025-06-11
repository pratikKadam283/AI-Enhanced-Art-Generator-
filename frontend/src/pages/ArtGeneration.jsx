import React, { useContext, useState, useRef, useEffect } from "react"
import Navbar from "../components/Navbar.jsx";
import { artContext } from "../context/artContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { imageUpload, storeImage } from "../utils/ApiRoutes.jsx";

const ArtGeneration = (props) => {
  const { toastOptions } = useContext(artContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scribbleImage, setScribbleImage] = useState(null);
  const canvasRef = useRef(null);
  const API_KEY = import.meta.env.VITE_DALLE_API;
  const generateImage = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        { prompt, n: 1, size: "1024x1024" },
        { headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } }
      );
      const openaiImageUrl = response.data.data[0].url;
      setImageUrl(openaiImageUrl);
      console.log(openaiImageUrl);
      await uploadImageToCloudinary(openaiImageUrl);
      toast.success("Art generated successfully!", toastOptions);
      setLoading(false); // Stop loading in all cases
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      console.log("Full error:", error);
      toast.error("Sorry for incovenience.Please try again.");
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (openaiImageUrl) => {
    console.log("uploading to cloudinary..");
    const response = await fetch(imageUpload, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({ imageUrl: openaiImageUrl }),
    })
    const data = await response.json();
    console.log("uploaded to cloudinary...");
    console.log(data);

    setImageUrl(data.url);
    saveImageToDatabase(data.url);
    setPrompt("");

  }

  const saveImageToDatabase = async (url) => {
    console.log("saving to db");
    const response = await fetch(storeImage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({ imageUrl:url, prompt }),
    })
    const result = await response.json();
    console.log("saved to db");
    console.log(result);
  }

  const handleClear = () => {
    // canvasRef.current.clearCanvas();
    setPrompt("");
    // setScribbleImage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("clicked");
    if (!prompt) {
      toast.error("Enter a prompt.");
      return;
    }

    generateImage();
   
  };
  return (
    <div>
      <Navbar />
      <div className="h-screen bg-gradient-to-b from-purple-600 to-blue-900 p-6 flex justify-center gap-10 " >
        <form onSubmit={handleSubmit} className="w-[40%]  flex flex-col gap-4">
          <label className="text-white">Prompt</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="p-2 rounded bg-transparent border border-white text-white"
          />

          <label className="text-white">Canvas (Scribble Below)</label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ height: 300, border: "1px solid white" }}
            strokeWidth={4}
            strokeColor="black"
          />

          <button type="submit"
            disabled={loading}
            className={`py-2 px-4   text-white rounded    ${loading ? 'bg-gray-400 cursor-not-allowed' :  '  bg-purple-700 hover:scale-105'
              }`}>
            Generate Art
          </button>
          <button type="button"
           disabled={loading}
            onClick={handleClear} className={`py-2 px-4  text-white rounded   ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:scale-105'
              }`}>
            Clear
          </button>
        </form>

     
          {loading ? <div className="text-white text-center mt-4 animate-pulse w-[50%]">
            ⏳ Generating your AI art, please wait...
          </div> : <div className="">
            {imageUrl && (
              <div className="  text-center h">
                <h3 className="text-white">Generated Art:</h3>
                <img src={imageUrl} alt="Generated Art" className="mx-auto mt-4 w-[400px] h-[400px] object-cover rounded-xl"  />
              </div>
            )}
          </div>}
       


      </div>

    </div>
  )
};

export default ArtGeneration;
