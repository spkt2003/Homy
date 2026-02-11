"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const { data, error } = await supabase
                .from("bookings")
                .select("*")
                .order("created_at", { ascending: false });
            if (data) setBookings(data);
        };
        fetchBookings();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">รายการจองทั้งหมด</h1>
            <div className="grid gap-4">
                {bookings.map((b) => (
                    <Card key={b.id}>
                        <CardHeader>
                            <CardTitle>{b.service_type || "บริการทั่วไป"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><strong>ผู้จอง:</strong> {b.name}</p>
                            <p><strong>เบอร์โทร:</strong> {b.phone}</p>
                            <p><strong>ที่อยู่:</strong> {b.address}</p>
                            <p className="text-sm text-muted-foreground">วันที่จอง: {new Date(b.created_at).toLocaleDateString("th-TH")}</p>
                        </CardContent>
                    </Card>
                ))}
                {bookings.length === 0 && <p>ยังไม่มีข้อมูลการจองในขณะนี้</p>}
            </div>
        </div>
    );
}