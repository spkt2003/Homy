"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // ระบบจะส่ง Magic Link ไปที่อีเมล เพื่อให้กด Login ได้ง่ายๆ ครับ
        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) alert(error.message);
        else alert("ตรวจสอบอีเมลของคุณเพื่อเข้าสู่ระบบ!");
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">เข้าสู่ระบบ Homy</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="ใส่อีเมลของคุณ"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "กำลังส่งข้อมูล..." : "รับลิงก์เข้าสู่ระบบทางอีเมล"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}