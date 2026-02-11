"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

// กำหนดบริการ 3 อย่างตาม Database
const SERVICE_OPTIONS = [
    { id: "cleaning", label: "ทำความสะอาดบ้าน", icon: "✨" },
    { id: "pet", label: "ดูแลสัตว์เลี้ยง", icon: "🐶" },
    { id: "plant", label: "ดูแลสวนและรดน้ำต้นไม้", icon: "🌿" },
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

    const toggleService = (label: string) => {
        setSelectedServices(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label])
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (selectedServices.length === 0) return alert("โปรดเลือกบริการอย่างน้อย 1 อย่าง")

        setLoading(true)
        const formData = new FormData(e.currentTarget)

        // บันทึกข้อมูลลงตาราง service_requests โดยใช้ชื่อคอลัมน์ตาม Database
        const { error } = await supabase.from("service_requests").insert([
            {
                user_email: userEmail, // บันทึก Email อัตโนมัติ
                service_type: selectedServices.join(", "),
                description: formData.get("description"),
                phone_number: formData.get("phone_number"),
                address: formData.get("address"),
                status: "pending" // ค่าเริ่มต้นตามรูป
            },
        ])

        setLoading(false)
        if (error) alert("Error: " + error.message)
        else setSuccess(true)
    }

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white rounded-3xl shadow-xl border">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-6">จองบริการเรียบร้อย!</h2>
                <Button onClick={() => router.push("/dashboard")} className="w-full">ดูรายการจองของฉัน</Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Card className="shadow-2xl rounded-3xl overflow-hidden border-none">
                <CardHeader className="bg-[#a37c5a] p-8 text-center">
                    <CardTitle className="text-2xl text-white">เลือกบริการที่ต้องการ</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-3">
                            <label className="text-sm font-bold text-slate-700">รายการบริการ (เลือกได้หลายรายการ)</label>
                            {SERVICE_OPTIONS.map((service) => (
                                <div
                                    key={service.id}
                                    onClick={() => toggleService(service.label)}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedServices.includes(service.label) ? "border-[#a37c5a] bg-orange-50" : "border-slate-100"
                                        }`}
                                >
                                    <span className="font-medium text-slate-700">{service.icon} {service.label}</span>
                                    {selectedServices.includes(service.label) && <Check className="w-5 h-5 text-[#a37c5a]" />}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-4">
                            <input name="phone_number" type="tel" required className="w-full p-4 bg-slate-50 rounded-xl border-none" placeholder="เบอร์โทรศัพท์ติดต่อ" />
                            <input name="address" type="text" required className="w-full p-4 bg-slate-50 rounded-xl border-none" placeholder="ที่อยู่ (บ้านเลขที่, ถนน, แขวง/ตำบล)" />
                            <textarea name="description" required className="w-full p-4 bg-slate-50 rounded-xl border-none" rows={3} placeholder="รายละเอียดและคำอธิบายเพิ่มเติม..."></textarea>
                        </div>

                        <Button type="submit" className="w-full h-14 text-lg font-bold bg-[#a37c5a] hover:bg-[#8e6b4e] rounded-2xl" disabled={loading}>
                            {loading ? "กำลังบันทึก..." : "ยืนยันการจองทั้งหมด"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}