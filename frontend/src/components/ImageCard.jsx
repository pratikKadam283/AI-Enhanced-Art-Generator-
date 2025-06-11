import React from "react"

const ImageCard = ({ url, prompt }) => {

  const downloadImage = async (url, prompt = "generated-art") => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${prompt.replace(/\s+/g, "-")}.png`; // dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <div>
      <div className="  flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-[320px]">
        <div className=" text-white text-lg font-semibold text-center mb-3 drop-shadow">{prompt}</div>
        <img src={url} alt="image" className="mx-auto w-[300px] h-[300px] object-cover rounded-xl" />

        <button
          onClick={() => downloadImage(url,prompt)}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:scale-105"
        >
          Download Image
        </button>

      </div>
    </div>
  )
};

export default ImageCard;
