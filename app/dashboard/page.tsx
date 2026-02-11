"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Phone } from "lucide-react"

export default function DashboardPage() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from("service_requests")
                    .select("*")
                    .eq("user_email", user.email) // ยึด user_email เป็นหลัก
                    .order("created_at", { ascending: false })
                if (data) setBookings(data)
            }
            setLoading(false)
        }
        fetchBookings()
    }, [])

    if (loading) return <div className="p-10 text-center font-bold text-slate-500">กำลังโหลดรายการจอง...</div>

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 font-primary">การจองของฉัน</h1>
            <div className="grid gap-6">
                {bookings.map((b) => (
                    <Card key={b.id} className="border-l-4 border-l-[#a37c5a] shadow-md rounded-2xl overflow-hidden">
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle className="text-xl font-bold text-[#a37c5a]">{b.service_type}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">วันที่จอง: {new Date(b.created_at).toLocaleDateString('th-TH')}</p>
                            </div>
                            {/* แสดงสถานะตามคอลัมน์ status */}
                            <div className="bg-orange-50 text-[#a37c5a] px-4 py-1.5 rounded-full text-xs font-bold border border-orange-100 flex items-center gap-2">
                                <Clock className="w-4 h-4 animate-pulse" /> {b.status === 'pending' ? 'รอตรวจสอบ' : b.status}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-slate-600">
                            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-slate-400" /> <b>ที่อยู่:</b> {b.address}</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> <b>ติดต่อ:</b> {b.phone_number}</div>
                            <div className="p-3 bg-slate-50 rounded-lg text-slate-500 italic">" {b.description} "</div>
                        </CardContent>
                    </Card>
                ))}
                {bookings.length === 0 && <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">ยังไม่มีรายการจองของคุณ</div>}
            </div>
        </div>
    )
}