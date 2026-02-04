"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Image,
  Building2,
  MessageSquare,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  X,
  User,
  ChevronRight,
} from "lucide-react";

const navigation = [
  { name: "대시보드", href: "/admin", icon: LayoutDashboard },
  { name: "예약 관리", href: "/admin/bookings", icon: Calendar },
  { name: "상품 관리", href: "/admin/products", icon: Package },
  { name: "포트폴리오", href: "/admin/portfolio", icon: Image },
  { name: "스튜디오 정보", href: "/admin/studio", icon: Building2 },
  { name: "리뷰 관리", href: "/admin/reviews", icon: MessageSquare },
];

const mockStudio = {
  name: "루미에르 스튜디오",
  category: "프로필",
  image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=100&q=80",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[var(--color-charcoal)] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-display text-xl text-white">
              Photo<span className="text-[var(--color-gold)]">Pick</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-[var(--color-gold)]/20 text-[var(--color-gold)] uppercase tracking-wider">
              Studio
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Info */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${mockStudio.image})` }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{mockStudio.name}</p>
              <p className="text-white/50 text-sm">{mockStudio.category}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-[var(--color-gold)] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-white/50 group-hover:text-[var(--color-gold)]"
                  }`}
                />
                {item.name}
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white text-sm transition-colors"
          >
            <Settings className="w-5 h-5" />
            설정
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-5 h-5" />
            사이트로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-md border-b border-[var(--color-beige-dark)]">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[var(--color-charcoal)] hover:bg-[var(--color-beige)] rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <Link href="/admin" className="text-[var(--color-text-muted)] hover:text-[var(--color-charcoal)]">
                관리자
              </Link>
              <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span className="text-[var(--color-charcoal)] font-medium">
                {navigation.find((n) => n.href === pathname)?.name || "대시보드"}
              </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-beige)] rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-gold)] rounded-full" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-[var(--color-charcoal)]">관리자</p>
                    <p className="text-xs text-[var(--color-text-muted)]">admin@studio.com</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-[var(--color-beige-dark)] py-2"
                    >
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-beige)] hover:text-[var(--color-charcoal)]"
                      >
                        <Settings className="w-4 h-4" />
                        설정
                      </Link>
                      <hr className="my-2 border-[var(--color-beige-dark)]" />
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/5">
                        <LogOut className="w-4 h-4" />
                        로그아웃
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
