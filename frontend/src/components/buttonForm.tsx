interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

export default function ButtonForm({ text, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="w-full bg-[#2082B1]hover:bg-[#1a6a8f] text-white font-bold py-3 rounded-lg transition-colors 
            shadow-lg shadow-blue-900/10 active:scale-[0.98] hover:cursor-pointer"
        >
            {text}
        </button>
    )
}