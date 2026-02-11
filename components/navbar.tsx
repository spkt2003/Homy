"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [user, setUser] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsMenuOpen(false);
        router.push("/");
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
                <Link href="/" className="font-bold text-2xl text-primary flex items-center gap-1">🏡 Homy.</Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/services" className="hover:text-primary transition-colors">บริการ</Link>
                    <Link href="/booking" className="hover:text-primary transition-colors font-bold text-slate-900">จองบริการ</Link>
                    {user && <Link href="/dashboard" className="hover:text-primary transition-colors">การจองของฉัน</Link>}
                </div>

                {/* Right Side Buttons (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                            <Button onClick={handleLogout} variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">ออกจากระบบ</Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login"><Button variant="ghost">เข้าสู่ระบบ</Button></Link>
                            <Link href="/register"><Button className="bg-primary text-white">สมัครสมาชิก</Button></Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b p-4 space-y-4 flex flex-col shadow-lg">
                    <Link href="/services" onClick={() => setIsMenuOpen(false)}>บริการของเรา</Link>
                    <Link href="/booking" onClick={() => setIsMenuOpen(false)}>จองบริการ</Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>การจองของฉัน</Link>
                            <Button onClick={handleLogout} className="w-full text-red-500" variant="outline">ออกจากระบบ</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" className="w-full">เข้าสู่ระบบ</Button></Link>
                            <Link href="/register" onClick={() => setIsMenuOpen(false)}><Button className="w-full bg-primary text-white">สมัครสมาชิก</Button></Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}