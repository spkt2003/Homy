import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Home, Sparkles, Dog, Droplets } from "lucide-react";

export default function ServicesPage() {
    const services = [
        {
            title: "ทำความสะอาดบ้านครบวงจร",
            desc: "ดูแลทุกซอกทุกมุมให้สะอาดเอี่ยม ตั้งแต่ห้องนอน ห้องนั่งเล่น ไปจนถึงห้องครัว",
            icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
            features: ["กวาดและถูพื้น", "เช็ดฝุ่นเฟอร์นิเจอร์", "ทำความสะอาดห้องน้ำ"]
        },
        {
            title: "บริการดูแลสัตว์เลี้ยง",
            desc: "เพื่อนรักของคุณจะได้รับการดูแลอย่างใกล้ชิด ทั้งการให้อาหารและพาเดินเล่น",
            icon: <Dog className="w-8 h-8 text-orange-500" />,
            features: ["ให้อาหารและน้ำ", "พาเดินเล่น", "ดูแลความสะอาดเบื้องต้น"]
        },
        {
            title: "ดูแลสวนและรดน้ำต้นไม้",
            desc: "เติมความสดชื่นให้สวนสวยของคุณ แม้ในวันที่คุณไม่อยู่บ้าน",
            icon: <Droplets className="w-8 h-8 text-blue-500" />,
            features: ["รดน้ำต้นไม้", "ใส่ปุ๋ย", "ตัดแต่งกิ่งไม้เล็กน้อย"]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">บริการของเรา</h1>
                <p className="text-muted-foreground text-lg">Homy ช่วยจัดการงานบ้านที่วุ่นวาย ให้กลายเป็นเรื่องง่ายสำหรับคุณ</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {services.map((s) => (
                    <Card key={s.title} className="flex flex-col hover:shadow-xl transition-all border-2 hover:border-primary/20">
                        <CardHeader>
                            <div className="mb-4 bg-muted w-fit p-3 rounded-2xl">{s.icon}</div>
                            <CardTitle className="text-2xl">{s.title}</CardTitle>
                            <CardDescription className="text-base">{s.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-2">
                                {s.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/booking">
                                <Button className="w-full bg-primary hover:bg-primary/90">จองบริการนี้</Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-16 bg-muted/50 p-8 rounded-3xl text-center border">
                <h2 className="text-2xl font-bold mb-2">ต้องการบริการอื่นเพิ่มเติม?</h2>
                <p className="text-muted-foreground mb-6">เรายินดีรับฟังความต้องการพิเศษของคุณ เพื่อให้บ้านของคุณน่าอยู่ที่สุด</p>
                <Link href="/contact">
                    <Button variant="outline">ติดต่อสอบถามข้อมูล</Button>
                </Link>
            </div>
        </div>
    );
}