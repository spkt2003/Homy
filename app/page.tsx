import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar"; // มั่นใจว่า path ถูกต้องตามโครงสร้างของคุณ

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

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
            {/* ปุ่มจองบริการ: จะไปหน้า /booking ซึ่งมีระบบเช็ค Login ที่เราทำไว้ */}
            <Link href="/booking">
              <Button size="lg" className="bg-primary text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105">
                จองบริการเลย
              </Button>
            </Link>

            {/* ปุ่มดูการจอง: เปลี่ยนจาก ดูขั้นตอนการทำงาน เป็น ดูการจองของฉัน */}
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-10 py-7 text-lg rounded-full border-2 hover:bg-primary/5 transition-all">
                ดูการจองของฉัน
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Summary Section */}
      <section className="bg-slate-50 py-24 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">บริการที่เราเชี่ยวชาญ</h2>
            <p className="text-muted-foreground">ครบวงจรเรื่องการดูแลบ้าน เพื่อความสบายใจของคุณ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* คุณสามารถเพิ่ม Card บริการตรงนี้ได้เหมือนในรูป image_aa5579 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 mx-auto">🧹</div>
              <h3 className="font-bold text-xl mb-2">ทำความสะอาดบ้าน</h3>
              <p className="text-sm text-muted-foreground">ดูแลทุกซอกทุกมุมให้สะอาดเอี่ยม</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 mx-auto">🐶</div>
              <h3 className="font-bold text-xl mb-2">ดูแลสัตว์เลี้ยง</h3>
              <p className="text-sm text-muted-foreground">เพื่อนรักของคุณจะได้รับการดูแลอย่างดี</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 mx-auto">🌿</div>
              <h3 className="font-bold text-xl mb-2">รดน้ำต้นไม้</h3>
              <p className="text-sm text-muted-foreground">เติมความสดชื่นให้สวนสวยของคุณ</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}