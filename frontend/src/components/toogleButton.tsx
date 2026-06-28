type ToogleButtonProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function ToogleButton({
  checked = false,
  onChange,
}: ToogleButtonProps) {
  return (
    <label className="relative inline-flex shrink-0 cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />

      <div
        className="
          group shadow peer
          rounded-full bg-slate-200 transition-all duration-300 peer-checked:bg-[#2082B1]
          h-6 w-12 sm:h-8 sm:w-16
          after:absolute after:left-1 after:top-1 after:flex after:h-4 after:w-4 after:items-center after:justify-center after:rounded-full after:bg-white after:transition-all after:duration-300
          sm:after:h-6 sm:after:w-6
          peer-checked:after:translate-x-6 sm:peer-checked:after:translate-x-8
          peer-hover:after:scale-95
        "
      />
    </label>
  );
}
