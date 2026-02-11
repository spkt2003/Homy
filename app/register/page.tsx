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
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // 1. สมัครสมาชิกเข้าระบบ Auth ของ Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) return alert(authError.message);

        // 2. เก็บข้อมูลเบอร์โทรศัพท์ลงในตาราง Profiles (ถ้าคุณสร้างตารางไว้แล้ว)
        if (authData.user) {
            await supabase.from("profiles").insert([
                { id: authData.user.id, phone_number: phone, email: email }
            ]);
            alert("สมัครสมาชิกสำเร็จ!");
            router.push("/login");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <form onSubmit={handleRegister} className="w-full max-w-md space-y-4 bg-white p-8 rounded-2xl shadow-xl border">
                <h1 className="text-2xl font-bold text-center">สร้างบัญชี Homy.</h1>
                <Input type="email" placeholder="อีเมล" onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="รหัสผ่าน (6 ตัวขึ้นไป)" onChange={(e) => setPassword(e.target.value)} required />
                <Input type="tel" placeholder="เบอร์โทรศัพท์" onChange={(e) => setPhone(e.target.value)} required />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">สมัครสมาชิก</Button>
                <p className="text-center text-sm text-muted-foreground">มีบัญชีอยู่แล้ว? <a href="/login" className="text-primary font-bold">เข้าสู่ระบบ</a></p>
            </form>
        </div>
    );
}