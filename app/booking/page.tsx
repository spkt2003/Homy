"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

const SERVICE_OPTIONS = [
    { id: "cleaning", label: "ทำความสะอาดบ้าน", icon: "🧹" },
    { id: "pet", label: "ดูแลสัตว์เลี้ยง", icon: "🐶" },
    { id: "plant", label: "รดน้ำต้นไม้", icon: "🌿" },
    { id: "laundry", label: "ซักรีด/รีดผ้า", icon: "🧺" },
    { id: "security", label: "ตรวจเช็คความปลอดภัย", icon: "🛡️" },
]

export default function BookingPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) setUserEmail(user.email || "")
            else router.push("/login")
        }
        getUser()
    }, [router])

    const toggleService = (serviceLabel: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceLabel)
                ? prev.filter(s => s !== serviceLabel)
                : [...prev, serviceLabel]
        )
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (selectedServices.length === 0) return alert("โปรดเลือกอย่างน้อย 1 บริการครับ")

        setLoading(true)
        const formData = new FormData(e.currentTarget)

        // รวมรายการบริการที่เลือกเป็นข้อความเดียว (หรือส่งเป็น Array ถ้าตารางรองรับ)
        const { error } = await supabase.from("service_requests").insert([
            {
                user_email: userEmail,
                phone_number: formData.get("phone"),
                service_type: selectedServices.join(", "), // รวมบริการ
                description: formData.get("details"),
            },
        ])

        setLoading(false)
        if (error) alert("เกิดข้อผิดพลาด: " + error.message)
        else setSuccess(true)
    }

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white rounded-3xl shadow-2xl border">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-2xl font-bold text-primary mb-2">บันทึกข้อมูลสำเร็จ!</h2>
                <p className="text-muted-foreground mb-6">เราได้รับรายการบริการที่คุณเลือกแล้ว</p>
                <Button onClick={() => router.push("/dashboard")} className="w-full rounded-full py-6">ดูสถานะการจอง</Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Card className="shadow-2xl border-none rounded-3xl overflow-hidden">
                <CardHeader className="bg-primary p-8">
                    <CardTitle className="text-2xl text-center text-white font-bold">เลือกบริการที่ต้องการ</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* ส่วนเลือกบริการแบบหลายรายการ */}
                        <div>
                            <label className="block text-sm font-bold mb-4 text-slate-700">รายการบริการ (เลือกได้หลายรายการ)</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {SERVICE_OPTIONS.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => toggleService(service.label)}
                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedServices.includes(service.label)
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-slate-100 hover:border-slate-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{service.icon}</span>
                                            <span className="font-medium text-slate-700">{service.label}</span>
                                        </div>
                                        {selectedServices.includes(service.label) && <Check className="w-5 h-5 text-primary" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <div>
                                <label className="block text-sm font-bold mb-2">เบอร์โทรศัพท์ติดต่อ</label>
                                <input name="phone" type="tel" required className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary" placeholder="08x-xxx-xxxx" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">รายละเอียดและคำอธิบายเพิ่มเติม</label>
                                <textarea name="details" required className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary" rows={4} placeholder="ระบุวัน เวลาที่สะดวก หรือสิ่งที่ต้องการให้เน้นเป็นพิเศษ..."></textarea>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg" disabled={loading}>
                            {loading ? "กำลังส่งข้อมูล..." : "ยืนยันการจองทั้งหมด"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}