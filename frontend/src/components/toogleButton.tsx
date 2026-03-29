export default function ToogleButton() {
  return (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input type="checkbox" className="sr-only peer" />

      <div
        className="
          group shadow peer
          bg-slate-200 peer-checked:bg-[#2082B1]
          rounded-full transition-all duration-300

          w-12 h-6 sm:w-16 sm:h-8

          after:absolute after:rounded-full after:bg-white
          after:flex after:items-center after:justify-center
          after:transition-all after:duration-300

          after:w-4 after:h-4
          sm:after:w-6 sm:after:h-6

          after:left-1 after:top-1
          sm:after:top-1

          peer-checked:after:translate-x-6
          sm:peer-checked:after:translate-x-8

          peer-hover:after:scale-95
        "
      />
    </label>
  );
}
