"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  const handleProtectedAction = async (targetPath: string) => {
    // ดึงข้อมูล User ปัจจุบันจาก Supabase
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // ถ้าไม่มีผู้ใช้ล็อกอินอยู่ ให้เด้ง Alert และพาไปหน้า Login
      alert("กรุณาเข้าสู่ระบบก่อนเข้าใช้งานส่วนนี้ครับ");
      router.push("/login");
    } else {
      // ถ้าล็อกอินแล้ว ให้พาไปหน้าปลายทาง (Dashboard หรือ Booking)
      router.push(targetPath);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            ดูแลบ้านให้คุณ <br />
            <span className="text-primary italic">อย่างใส่ใจ เหมือนคนในครอบครัว</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ไม่ว่าคุณจะเดินทางไกล หรือยุ่งแค่ไหน ให้ Homy ช่วยดูแลบ้าน สัตว์เลี้ยง และต้นไม้ที่คุณรัก
            ด้วยทีมงานมืออาชีพที่ไว้ใจได้
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* ปุ่มจองบริการ: เช็ค Login ก่อนไป /booking */}
            <Button
              size="lg"
              onClick={() => handleProtectedAction("/booking")}
              className="bg-primary text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
            >
              จองบริการเลย
            </Button>

            {/* ปุ่มดูการจอง: เช็ค Login ก่อนไป /dashboard ตามที่ต้องการครับ */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleProtectedAction("/dashboard")}
              className="px-10 py-7 text-lg rounded-full border-2 hover:bg-primary/5 transition-all text-slate-700"
            >
              ดูการจองของฉัน
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}