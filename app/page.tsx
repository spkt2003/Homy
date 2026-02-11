import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            ดูแลบ้านให้คุณ <br className="hidden md:block" />
            <span className="text-primary">อย่างใส่ใจ เหมือนคนในครอบครัว</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ไม่ว่าคุณจะเดินทางไกล หรือยุ่งแค่ไหน ให้ Homy ช่วยดูแลบ้าน สัตว์เลี้ยง และต้นไม้ที่คุณรัก
            ด้วยทีมงานมืออาชีพที่ไว้ใจได้
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-lg bg-primary hover:bg-primary/90 text-white">
                จองบริการเลย
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto border-primary text-primary hover:bg-orange-50">
              ดูขั้นตอนการทำงาน
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">บริการที่เราเชี่ยวชาญ</h2>
          <p className="text-muted-foreground">ครบวงจรเรื่องการดูแลบ้าน เพื่อความสบายใจของคุณ</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Service 1 */}
          <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                🧹
              </div>
              <CardTitle className="text-xl">ทำความสะอาดบ้าน</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              บริการทำความสะอาดทั่วไปและบิ๊กคลีนนิ่ง ปัดกวาดเช็ดถูทุกซอกมุม ให้บ้านสะอาดน่าอยู่เสมอ
            </CardContent>
          </Card>

          {/* Service 2 */}
          <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                🐶
              </div>
              <CardTitle className="text-xl">ดูแลสัตว์เลี้ยง</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              ให้อาหาร พาเดินเล่น และอยู่เป็นเพื่อนคลายเหงา ให้ลูกรักของคุณมีความสุขแม้คุณไม่อยู่บ้าน
            </CardContent>
          </Card>

          {/* Service 3 */}
          <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                🌿
              </div>
              <CardTitle className="text-xl">รดน้ำต้นไม้</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              ดูแลสวนและต้นไม้ในบ้าน รดน้ำ ใส่ปุ๋ย ตามความต้องการของพืชแต่ละชนิด
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}