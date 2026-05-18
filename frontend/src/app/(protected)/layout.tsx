// frontend/src/app/(protected)/layout.tsx
"use client";

import { authUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.replace("/login");
                return;
            }

            const user = await authUser(token);

            if (!user) {
                localStorage.removeItem("token");
                router.replace("/login");
                return;
            }

            setAuthorized(true);
            setLoading(false);
        };

        validateUser();
    }, [router]);

    if (loading) return <Loading />;
    if (!authorized) return null;

    return <>{children}</>;
}