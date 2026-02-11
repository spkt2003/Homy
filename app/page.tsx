"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  const handleProtectedAction = async (targetPath: string) => {
    // เช็ค User ล่าสุดจาก session โดยตรงเพื่อให้แม่นยำ
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนเข้าใช้งานส่วนนี้ครับ");
      router.push("/login");
    } else {
      router.push(targetPath);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
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
            <Button
              size="lg"
              onClick={() => handleProtectedAction("/booking")}
              className="bg-primary text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 font-bold"
            >
              จองบริการเลย
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => handleProtectedAction("/dashboard")}
              className="px-10 py-7 text-lg rounded-full border-2 hover:bg-primary/5 transition-all text-slate-700 font-bold"
            >
              ดูการจองของฉัน
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Services Section (นำรายละเอียดบริการกลับมา) */}
      <section className="bg-slate-50 py-24 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">บริการที่เราเชี่ยวชาญ</h2>
            <p className="text-muted-foreground">ครบวงจรเรื่องการดูแลบ้าน เพื่อความสบายใจของคุณ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md transition-all">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto text-3xl">🧹</div>
              <h3 className="font-bold text-xl mb-3">ทำความสะอาดบ้าน</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">ดูแลทุกซอกทุกมุมให้สะอาดเอี่ยมอ่อง พร้อมใช้งานเสมอ</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md transition-all">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto text-3xl">🐶</div>
              <h3 className="font-bold text-xl mb-3">ดูแลสัตว์เลี้ยง</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">ให้อาหาร และมอบความรักให้เพื่อนสี่ขาของคุณอย่างดีที่สุด</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md transition-all">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto text-3xl">🌿</div>
              <h3 className="font-bold text-xl mb-3">รดน้ำต้นไม้</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">ดูแลสวนสวยของคุณให้เขียวขจี แม้ในวันที่คุณไม่อยู่</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}