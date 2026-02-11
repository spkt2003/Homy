"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // เช็คสถานะ Login ตอนโหลดหน้า
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();

        // ฟังการเปลี่ยนแปลงสถานะ (เช่น ตอน Login หรือ Logout)
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
                <Link href="/" className="font-bold text-2xl text-primary">🏡 Homy.</Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/services" className="hover:text-primary">บริการของเรา</Link>
                    <Link href="/booking" className="hover:text-primary">จองบริการ</Link>
                    <Link href="/about" className="hover:text-primary">เกี่ยวกับเรา</Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="outline" className="text-primary border-primary">การจองของฉัน</Button>
                            </Link>
                            <Button onClick={handleLogout} variant="ghost" className="text-red-500">ออกจากระบบ</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">เข้าสู่ระบบ</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-primary text-white">สมัครสมาชิก</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}