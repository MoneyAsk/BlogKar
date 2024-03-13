import { Progress } from "@/components/ui/progress"

const Loading = () => {
    return (
        // <Progress value={33} className="mt-[300px]"/>
        <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>

    );
}
export default Loading;