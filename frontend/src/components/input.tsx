import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export default function Input({ label, error, icon: Icon, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative flex items-center group">
        {Icon && (
          <div className="absolute left-3 text-slate-400 group-focus-within:text-[#2082B1] transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          {...props}
          className={`w-full  py-2.5 rounded-lg border border-slate-200 bg-slate-50 outline-none transition-all
            focus:border-[#2082B1] focus:ring-2 focus:ring-[#2082B1]/10
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-slate-900 placeholder:text-slate-400`}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  )
}