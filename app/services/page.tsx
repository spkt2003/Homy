import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Dog, Droplets, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
    const serviceDetails = [
        {
            title: "ทำความสะอาดบ้าน",
            icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
            details: [
                "กวาด ถู และทำความสะอาดพื้นทุกประเภท",
                "เช็ดฝุ่นเฟอร์นิเจอร์และอุปกรณ์ตกแต่งบ้าน",
                "ล้างห้องน้ำและสุขภัณฑ์อย่างละเอียด",
                "ทำความสะอาดห้องครัวและเคาน์เตอร์"
            ]
        },
        {
            title: "ดูแลสัตว์เลี้ยง",
            icon: <Dog className="w-6 h-6 text-orange-500" />,
            details: [
                "ให้อาหารและน้ำตามตารางเวลาที่กำหนด",
                "พาเดินเล่นออกกำลังกายและขับถ่าย",
                "ทำความสะอาดพื้นที่ขับถ่ายและอุปกรณ์",
                "เล่นและให้ความเพลิดเพลินระหว่างวัน"
            ]
        },
        {
            title: "ดูแลสวนและรดน้ำต้นไม้",
            icon: <Droplets className="w-6 h-6 text-blue-500" />,
            details: [
                "รดน้ำต้นไม้และสนามหญ้าตามความเหมาะสม",
                "พรวนดินและใส่ปุ๋ยบำรุงต้นไม้",
                "เก็บกวาดใบไม้แห้งและดูแลความเรียบร้อย",
                "ตรวจสอบสุขภาพต้นไม้เบื้องต้น"
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-10">
            <header className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">รายละเอียดบริการของเรา</h1>
                <p className="text-muted-foreground">เราดูแลบ้านของคุณด้วยความใส่ใจในทุกรายละเอียด</p>
            </header>

            <div className="grid gap-6">
                {serviceDetails.map((item) => (
                    <Card key={item.title} className="border-none shadow-sm bg-muted/30">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-white p-2 rounded-lg shadow-sm">{item.icon}</div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid md:grid-cols-2 gap-3">
                                {item.details.map((detail) => (
                                    <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}