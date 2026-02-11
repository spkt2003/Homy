import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
                <Link href="/" className="font-bold text-2xl text-primary flex items-center gap-1">
                    🏡 Homy.
                </Link>

                {/* เมนูหลัก - ต้องตรงกับชื่อโฟลเดอร์ใน app */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/services" className="hover:text-primary transition-colors">บริการของเรา</Link>
                    <Link href="/booking" className="hover:text-primary transition-colors">จองบริการ</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">เกี่ยวกับเรา</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost">เข้าสู่ระบบ</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button className="bg-primary text-white">เริ่มต้นใช้งาน</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}