"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BookingPage() {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("กรุณาเข้าสู่ระบบก่อนทำการจอง");
                router.push("/login");
            }
        };
        checkUser();
    }, [router]);

    // โค้ดหน้าจองเดิมของคุณ...
    return (
        <div>{/* ฟอร์มการจองของคุณ */}</div>
    );
}