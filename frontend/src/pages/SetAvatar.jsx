import React, { useEffect, useState,useContext } from "react"
import toast from "react-hot-toast";
import { setAvatar } from "../utils/ApiRoutes";
import { artContext } from "../context/artContext";
import { useNavigate } from "react-router-dom";

const SetAvatar = (props) => {
    const api = "https://robohash.org";
    const [loading, setLoading] = useState(true);
    const [avatars, setAvatars] = useState();
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const navigate=useNavigate();
    const {  toastOptions}=useContext(artContext);

    const generateAvatars = () => {
        const newAvatars = Array.from({ length: 4 }, () =>
            `https://api.dicebear.com/8.x/avataaars/svg?seed=${Math.random()
                .toString(36)
                .substring(7)}`
        );
        setAvatars(newAvatars);
        setLoading(false);
    };
    useEffect(() => {
        generateAvatars();
    }, [])

    const handleSelect = (index) => {
        setSelectedAvatar(index);
    }

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        }
        else {
            try {
                const response = await fetch(setAvatar, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        avatarImage: avatars[selectedAvatar]
                    }),

                });
                const data = await response.json();
                // console.log(data);
                if (data.success) {
                    toast.success("profile picture set Successfully", toastOptions)
                    navigate("/");
                } else {
                    toast.error(data.message, toastOptions);
                    navigate("/setAvatar");
                }

            } catch (error) {
                console.log(error);
                navigate("/")
            }
        }

    }


    return (
        <div className="bg-[#131324]">
            {loading ? <div className="flex flex-col justify-center items-center w-screen h-screen gap-12 ">
                <img src="https://res.cloudinary.com/dti8wm0fk/image/upload/v1739859851/loader_xpd0bi.gif" alt="loader" loading="lazy" />
            </div> :
                <div className="flex flex-col justify-center items-center w-screen h-screen gap-12  text-white">
                    <h1 className="font-bold text-3xl">Pick an Avatar as your profile picture</h1>

                    <div className=" flex gap-12 ">
                        {avatars.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt="avatar"
                                onClick={() => {
                                    handleSelect(index);
                                }}
                                className={`h-32 flex justify-center items-center transition-all duration-400 rounded-full p-2 ${selectedAvatar === index ? "border-[#4e0eff] border-8" : "border-none"}`}
                            />
                        ))}
                    </div>

                    <button className="bg-[#4e0eff] text-white px-8 py-4 font-bold border-none cursor-pointer rounded-md text-xl uppercase hover:bg-[#9e7ff3] transition-all duration-300 " onClick={setProfilePicture}>Set as profile picture</button>
                </div>}

        </div>
    )
};

export default SetAvatar;
