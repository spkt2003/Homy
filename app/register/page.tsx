"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // สมัครสมาชิกเข้า Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { phone: phone } } // เก็บเบอร์โทรไว้ใน metadata
        });

        if (error) alert(error.message);
        else {
            alert("สมัครสมาชิกสำเร็จ!");
            router.push("/login");
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <form onSubmit={handleRegister} className="w-full max-w-md space-y-4 bg-white p-8 rounded-xl shadow-lg border">
                <h1 className="text-2xl font-bold text-center">สมัครสมาชิกใหม่</h1>
                <Input type="email" placeholder="อีเมล" onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="รหัสผ่าน (6 ตัวขึ้นไป)" onChange={(e) => setPassword(e.target.value)} required />
                <Input type="tel" placeholder="เบอร์โทรศัพท์" onChange={(e) => setPhone(e.target.value)} required />
                <Button type="submit" className="w-full bg-primary text-white" disabled={loading}>
                    {loading ? "กำลังบันทึก..." : "สมัครสมาชิก"}
                </Button>
                <p className="text-center text-sm">
                    มีบัญชีอยู่แล้ว? <a href="/login" className="text-primary font-bold">เข้าสู่ระบบ</a>
                </p>
            </form>
        </div>
    );
}