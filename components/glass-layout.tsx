"use client"

import { Button } from "@/components/ui/button"
import { 
  CuboidIcon as Cube, 
  Search, 
  Settings, 
  Image as ImageIcon, 
  LogOut,
  LayoutDashboard,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface GlassLayoutProps {
  children: React.ReactNode
}

export default function GlassLayout({ children }: GlassLayoutProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Explore Models", href: "/explore", icon: Search },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white bg-black/20 backdrop-blur-md border border-blue-500/20">
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Glass Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex md:flex-col
        border-r border-blue-500/20 glass-effect
        ${mobileMenuOpen ? "translate-x-0 bg-slate-900/95 backdrop-blur-xl" : "-translate-x-full"}
      `}>
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cube className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">VirtuSpace</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${isActive ? "bg-blue-500/20 text-white border border-blue-500/20" : "text-blue-200 hover:text-white hover:bg-blue-500/10"}`}
                >
                  <item.icon className={`mr-2 h-4 w-4 ${isActive ? "text-sky-400" : "text-blue-400"}`} />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-blue-500/20">
          <Button variant="ghost" className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-500/10">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 animate-fade-in overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  )
}
