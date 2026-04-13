import { Building2 } from "lucide-react";

export default function Loading() {
    return (

        <section className=" w-full min-h-screen flex flex-col items-center justify-center border gap-5">
            <div className="p-6 bg-[#2082B1]  rounded-3xl w-fit">
                <Building2 color="#ffffff" size={50} />
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-bold text-slate-800">GestIO</h1>
                <p className="w-fit  text-sm text-center mt-2 text-slate-500 ">Preparando tudo para você...</p>
            </div>
            <div className="loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
            </div>
        </section>

    )
}