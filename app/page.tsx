"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  const handleProtectedAction = async (targetPath: string) => {
    // เช็คว่ามี User ล็อกอินอยู่ไหม
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // ถ้าไม่มี ให้แจ้งเตือนและส่งไปหน้า Login
      alert("กรุณาเข้าสู่ระบบก่อนใช้งานส่วนนี้");
      router.push("/login");
    } else {
      // ถ้ามี ให้พาไปหน้าที่ต้องการ
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
            {/* ปุ่มจองบริการ: บังคับ Login */}
            <Button
              size="lg"
              onClick={() => handleProtectedAction("/booking")}
              className="bg-primary text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
            >
              จองบริการเลย
            </Button>

            {/* ปุ่มดูการจอง: บังคับ Login ตามที่คุณต้องการ */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleProtectedAction("/dashboard")}
              className="px-10 py-7 text-lg rounded-full border-2 hover:bg-primary/5 transition-all"
            >
              ดูการจองของฉัน
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}