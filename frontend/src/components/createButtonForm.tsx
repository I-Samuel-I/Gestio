import { Plus } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

export default function CreateButtonForm({ text, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="flex w-full mt-5 justify-center sm:mt-0 sm:w-fit items-center gap-2 bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer text-white text-xs font-bold px-3 py-2.5 rounded-lg transition-colors">

            <Plus className="w-5 h-5" />
            {text}
        </button>
    )
}