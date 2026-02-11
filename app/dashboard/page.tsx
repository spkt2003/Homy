"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone, Calendar } from "lucide-react";

export default function DashboardPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBookings = async () => {
            // ดึงข้อมูล User ปัจจุบัน
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // ดึงข้อมูลการจองที่ตรงกับ email ของผู้ใช้เท่านั้น
                const { data, error } = await supabase
                    .from("bookings")
                    .select("*")
                    .eq("email", user.email)
                    .order("created_at", { ascending: false });

                if (!error && data) {
                    setBookings(data);
                }
            }
            setLoading(false);
        };

        fetchMyBookings();
    }, []);

    if (loading) {
        return <div className="p-10 text-center font-medium">กำลังโหลดข้อมูล...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">การจองของฉัน</h1>
                <p className="text-muted-foreground mt-2">ติดตามสถานะรายละเอียดการจองของคุณได้ที่นี่</p>
            </header>

            <div className="grid gap-6">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <Card key={booking.id} className="overflow-hidden border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-bold text-primary">
                                        {booking.service_type || "บริการดูแลบ้าน"}
                                    </CardTitle>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        จองเมื่อ: {new Date(booking.created_at).toLocaleDateString("th-TH")}
                                    </p>
                                </div>

                                {/* ส่วนที่แก้: ใช้ div ตกแต่งแทน Badge เพื่อไม่ให้ Error */}
                                <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full border border-yellow-200 w-fit">
                                    <Clock className="w-4 h-4 animate-pulse" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">รอเจ้าหน้าที่ตรวจสอบ</span>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 pt-4 border-t bg-slate-50/30">
                                <div className="flex items-start gap-3 text-sm">
                                    <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                    <span className="text-slate-600 leading-relaxed">{booking.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span className="text-slate-600 font-medium">{booking.phone}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
                        <p className="text-muted-foreground font-medium">คุณยังไม่มีรายการจองในขณะนี้</p>
                    </div>
                )}
            </div>
        </div>
    );
}