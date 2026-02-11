"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const selectedServices = formData.getAll("service").join(", ")

        if (!selectedServices) {
            alert("กรุณาเลือกบริการอย่างน้อย 1 รายการ")
            setLoading(false)
            return
        }

        const { error } = await supabase.from("service_requests").insert([
            {
                user_email: formData.get("email"),
                phone_number: formData.get("phone"),
                service_type: selectedServices,
                address: formData.get("address"),
                map_url: formData.get("map_url"),
                description: formData.get("details"),
            },
        ])

        setLoading(false)
        if (error) {
            alert("เกิดข้อผิดพลาด: " + error.message)
        } else {
            setSuccess(true)
        }
    }

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white rounded-xl shadow-lg border border-orange-100">
                <h2 className="text-2xl font-bold text-primary mb-4">ส่งข้อมูลสำเร็จ!</h2>
                <p className="text-muted-foreground mb-6">เราได้รับข้อมูลการจองของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด</p>
                <Button onClick={() => window.location.href = "/"}>กลับหน้าหลัก</Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-primary font-bold">แบบฟอร์มจองบริการ Homy</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">อีเมลของคุณ</label>
                                <input name="email" type="email" required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="example@mail.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">เบอร์โทรศัพท์</label>
                                <input name="phone" type="tel" required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="08x-xxx-xxxx" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">บริการที่ต้องการ (เลือกได้หลายรายการ)</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-orange-50 hover:border-primary/50 transition-all group">
                                    <input type="checkbox" name="service" value="ทำความสะอาดบ้าน" className="w-5 h-5 accent-primary" />
                                    <span className="group-hover:text-primary transition-colors text-sm">🧹 ทำความสะอาด</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-orange-50 hover:border-primary/50 transition-all group">
                                    <input type="checkbox" name="service" value="ดูแลสัตว์เลี้ยง" className="w-5 h-5 accent-primary" />
                                    <span className="group-hover:text-primary transition-colors text-sm">🐶 ดูแลสัตว์เลี้ยง</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-orange-50 hover:border-primary/50 transition-all group">
                                    <input type="checkbox" name="service" value="รดน้ำต้นไม้" className="w-5 h-5 accent-primary" />
                                    <span className="group-hover:text-primary transition-colors text-sm">🌿 รดน้ำต้นไม้</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">สถานที่รับบริการ (ที่อยู่/หมู่บ้าน/คอนโด)</label>
                                <textarea name="address" required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none transition-all" rows={2} placeholder="ระบุเลขที่บ้าน ชื่อหมู่บ้าน หรือจุดสังเกต..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 text-orange-700">📍 ลิงก์ Google Maps (ถ้ามี)</label>
                                <input name="map_url" type="url" className="w-full p-3 border border-orange-200 rounded-md focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="วางลิงก์พิกัดจาก Google Maps" />
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    * วิธีเอาลิงก์: เข้าแอป Google Maps ปักหมุดบ้าน กดแชร์ แล้วคัดลอกลิงก์
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">รายละเอียดเพิ่มเติม</label>
                            <textarea name="details" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none transition-all" rows={3} placeholder="เช่น มีสุนัขดุ, ประตูรั้วสีแดง, หรือวันเวลาที่สะดวก..."></textarea>
                        </div>

                        <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg bg-primary hover:bg-primary/90" disabled={loading}>
                            {loading ? "กำลังบันทึกข้อมูล..." : "ยืนยันการจองบริการ"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}