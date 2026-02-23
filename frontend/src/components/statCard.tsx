import type { PropsWithChildren } from "react"


export default function StatCard({children}: PropsWithChildren) {
    
    return (
        <>
            <div className=" w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                {children}
            </div>

        </>
    )
}