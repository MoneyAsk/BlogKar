import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effects";
import HomeButton from "@/components/ui/HomeButton";
export default function Home() {

    const words = [
        {
            text: "Unleash",
        },
        {
            text: "Your",
        },
        {
            text: "Blogging",
        },
        {
            text: "Potential",
        },
        {
            text: "Here!",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[45rem]  ">
            <TypewriterEffectSmooth words={words} />
            <HomeButton />
        </div>
    );

}