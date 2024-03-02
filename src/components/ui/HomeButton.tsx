"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const HomeButton = () => {
    const router = useRouter();
    const [showButtons, setShowButtons] = useState(false);
    useEffect(() => {
        // Set a timeout to update the state after 5000 milliseconds (5 seconds)
        const timeout = setTimeout(() => {
            setShowButtons(true);
        }, 3100);

        // Clear the timeout to prevent the state update if the component unmounts
        return () => clearTimeout(timeout);
    }, []);
    return (

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            {showButtons &&(<><button
                className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-lg font-bold"
            onClick={()=> router.push("/signup")}>
                Join now
            </button>
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-lg font-bold "
            onClick={()=> router.push("/login")}>
                Login
            </button></>)}

        </div>
    )
};

export default HomeButton;