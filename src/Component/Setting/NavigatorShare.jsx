import React from "react";
import { FaShareFromSquare } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function NavigatorShare(){
    const shareData = {
        title: "Śikṣārthī",
        text: "Read life changing novel, Join Śikṣārthī Now! ",
        url: "https://we-learn-read.web.app/",
    }
    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            toast.error('Share not supported in that browser');
        }
    }
    return (
        <div onClick={handleShare} className="borderBottom cursor-pointer">
            <h2 className="flex items-center gap-3">
                <span>Share</span> <FaShareFromSquare />
            </h2>
        </div>
    );
};
