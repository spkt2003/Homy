"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Phone, Calendar } from "lucide-react"

export default function DashboardPage() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMyBookings = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // แก้ชื่อตารางเป็น service_requests ให้ตรงกับหน้า Booking
                const { data, error } = await supabase
                    .from("service_requests")
                    .select("*")
                    .eq("user_email", user.email) // แก้ชื่อคอลัมน์เป็น user_email
                    .order("created_at", { ascending: false })

                if (!error && data) {
                    setBookings(data)
                }
            }
            setLoading(false)
        }
        fetchMyBookings()
    }, [])

    if (loading) return <div className="p-10 text-center">กำลังโหลดข้อมูลการจอง...</div>

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10">
            <h1 className="text-3xl font-bold mb-8">การจองของฉัน</h1>
            <div className="grid gap-6">
                {bookings.length > 0 ? (
                    bookings.map((b) => (
                        <Card key={b.id} className="border-l-4 border-l-yellow-500 shadow-sm overflow-hidden">
                            <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
                                <CardTitle className="text-xl text-primary font-bold">
                                    {b.service_type === 'cleaning' ? '🧹 ทำความสะอาดบ้าน' :
                                        b.service_type === 'pet' ? '🐶 ดูแลสัตว์เลี้ยง' :
                                            b.service_type === 'plant' ? '🌿 รดน้ำต้นไม้' : b.service_type}
                                </CardTitle>
                                <div className="bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-bold border border-yellow-200 flex items-center gap-2 w-fit">
                                    <Clock className="w-4 h-4 animate-pulse" /> รอเจ้าหน้าที่ตรวจสอบ
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-slate-600">
                                <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /> รายละเอียด: {b.description}</p>
                                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> ติดต่อ: {b.phone_number}</p>
                                <p className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-4 h-4" /> เมื่อวันที่: {new Date(b.created_at).toLocaleDateString('th-TH')}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed">
                        คุณยังไม่มีรายการจองในขณะนี้
                    </div>
                )}
            </div>
        </div>
    )
}