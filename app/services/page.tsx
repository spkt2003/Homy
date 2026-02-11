import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
    const services = [
        { title: "ทำความสะอาดบ้าน", desc: "ดูแลทุกซอกทุกมุมให้สะอาดเอี่ยม" },
        { title: "ดูแลสัตว์เลี้ยง", desc: "เพื่อนรักของคุณจะได้รับการดูแลอย่างดี" },
        { title: "รดน้ำต้นไม้", desc: "เติมความสดชื่นให้สวนสวยของคุณ" }
    ];

    return (
        <div className="max-w-5xl mx-auto p-10 text-center">
            <h1 className="text-4xl font-bold mb-8">บริการของเรา</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {services.map((s) => (
                    <Card key={s.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{s.title}</CardTitle>
                            <CardDescription>{s.desc}</CardDescription>
                        </CardHeader>
                        <div className="p-4">
                            <Link href="/booking">
                                <Button variant="outline" className="w-full">เลือกบริการนี้</Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}