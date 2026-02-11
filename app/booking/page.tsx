"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function BookingPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const router = useRouter()

    // ดึงอีเมลคนที่ล็อกอินอยู่มาเตรียมไว้
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserEmail(user.email || "")
            } else {
                router.push("/login") // ถ้าไม่ได้ล็อกอินให้ดีดออก
            }
        }
        getUser()
    }, [router])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        // ส่งข้อมูลไปที่ตาราง service_requests
        const { error } = await supabase.from("service_requests").insert([
            {
                user_email: userEmail, // ใช้อีเมลจากระบบล็อกอิน
                phone_number: formData.get("phone"),
                service_type: formData.get("service"),
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
            <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white rounded-xl shadow-lg border">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-primary mb-4">จองบริการสำเร็จ!</h2>
                <p className="text-muted-foreground mb-6">เราได้รับข้อมูลของคุณแล้ว และจะรีบตรวจสอบโดยเร็วที่สุด</p>
                <Button onClick={() => router.push("/dashboard")} className="w-full">ไปที่รายการจองของฉัน</Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <Card className="shadow-xl border-t-4 border-t-primary">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-primary font-bold">ยืนยันการจองบริการ</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">อีเมลผู้ใช้งาน</label>
                            <input value={userEmail} disabled className="w-full p-3 border rounded-md bg-slate-50 text-slate-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">เบอร์โทรศัพท์ติดต่อ</label>
                            <input name="phone" type="tel" required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary" placeholder="08x-xxx-xxxx" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">เลือกบริการที่ต้องการ</label>
                            <select name="service" className="w-full p-3 border rounded-md">
                                <option value="ทำความสะอาดบ้าน">🧹 ทำความสะอาดบ้าน</option>
                                <option value="ดูแลสัตว์เลี้ยง">🐶 ดูแลสัตว์เลี้ยง</option>
                                <option value="รดน้ำต้นไม้">🌿 รดน้ำต้นไม้</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">ระบุที่อยู่และรายละเอียดเพิ่มเติม</label>
                            <textarea name="details" required className="w-full p-3 border rounded-md" rows={4} placeholder="เช่น บ้านเลขที่ 123/4... ต้องการให้เน้นห้องรับแขก"></textarea>
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
                            {loading ? "กำลังส่งข้อมูล..." : "ยืนยันการจอง"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}