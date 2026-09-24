import Header from "@/components/user-dashboard/Header";
import Sidebar from "@/components/user-dashboard/Sidebar";
import type { Metadata } from "next";




export const metadata: Metadata = {
    title: "Kammora – AI Project Management",
    description: "AI-powered project management dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <Sidebar />
            <div className="min-h-screen pb-20 md:pb-0 md:pl-[76px]">
                <Header />
                <main className="px-4 pb-10 md:px-8">{children}</main>
            </div>
        </div>

    );
}