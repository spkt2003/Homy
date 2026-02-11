"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // เปลี่ยนมาใช้ signInWithPassword แทน Magic Link ครับ
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        else router.push("/dashboard");
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 bg-white p-8 rounded-xl shadow-lg border">
                <h1 className="text-2xl font-bold text-center">เข้าสู่ระบบ Homy</h1>
                <Input type="email" placeholder="อีเมล" onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="รหัสผ่าน" onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
                </Button>
                <p className="text-center text-sm">
                    ยังไม่มีบัญชี? <a href="/register" className="text-primary font-bold">สมัครสมาชิกที่นี่</a>
                </p>
            </form>
        </div>
    );
}