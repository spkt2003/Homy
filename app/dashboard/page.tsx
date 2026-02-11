"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchMyBookings = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from("bookings")
                    .select("*")
                    .eq("email", user.email) // ดึงเฉพาะการจองของอีเมลนี้
                    .order("created_at", { ascending: false });
                if (data) setBookings(data);
            }
        };
        fetchMyBookings();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">การจองของฉัน</h1>
            <div className="grid gap-4">
                {bookings.map((b) => (
                    <Card key={b.id} className="border-l-4 border-l-yellow-500">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{b.service_type || "บริการดูแลบ้าน"}</CardTitle>
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                                รอเจ้าหน้าที่ตรวจสอบ
                            </span>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p>📍 ที่อยู่: {b.address}</p>
                            <p>📞 เบอร์โทร: {b.phone}</p>
                            <p>📅 วันที่บันทึก: {new Date(b.created_at).toLocaleDateString("th-TH")}</p>
                        </CardContent>
                    </Card>
                ))}
                {bookings.length === 0 && <p className="text-center py-10">ไม่พบรายการจองของคุณ</p>}
            </div>
        </div>
    );
}