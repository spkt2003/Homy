import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-2xl text-primary flex items-center gap-1">
                    🏡 Homy.
                </Link>

                {/* Desktop Menu (Thai) */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/services" className="hover:text-primary transition-colors">บริการของเรา</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">เกี่ยวกับเรา</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">ติดต่อเรา</Link>
                </div>

                {/* Action Buttons (Thai) */}
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-muted-foreground hover:text-primary">เข้าสู่ระบบ</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
                            เริ่มต้นใช้งาน
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}