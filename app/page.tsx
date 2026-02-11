import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ❌ ลบการ import Navbar และการเรียกใช้ <Navbar /> ออกจากไฟล์นี้ */}

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
            <Link href="/booking">
              <Button size="lg" className="bg-primary text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105">
                จองบริการเลย
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-10 py-7 text-lg rounded-full border-2 hover:bg-primary/5 transition-all">
                ดูการจองของฉัน
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}