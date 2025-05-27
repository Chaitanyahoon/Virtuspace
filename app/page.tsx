"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Smartphone,
  CuboidIcon as Cube,
  Share2,
  ShoppingCart,
  Eye,
  Zap,
  Sparkles,
  Crown,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Cube className="h-10 w-10 text-purple-400" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VirtuSpace
              </span>
              <div className="flex items-center space-x-1">
                <Crown className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-purple-300 font-medium">PREMIUM</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
              Features
            </a>
            <a href="#gallery" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
              Gallery
            </a>
            <Link href="/explore">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
              >
                Explore
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Next-Generation AR Experience
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="text-white">Visualize Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Dream Space
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of interior design with our premium AR platform. Place, customize, and interact with
            photorealistic 3D models in your real environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/ar">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-xl font-semibold shadow-2xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                Launch AR Studio
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-6 text-xl border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white transition-all duration-300"
              >
                Browse Collection
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-purple-300">Premium Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4K</div>
              <div className="text-purple-300">Ultra HD Textures</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-purple-300">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Premium Features</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Professional-grade AR technology with intuitive controls and stunning visuals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-4">Real-Time Interaction</CardTitle>
                <CardDescription className="text-purple-200 text-base leading-relaxed">
                  Drag, rotate, and scale objects in real-time with intuitive touch controls and gesture recognition
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Cube className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-4">Photorealistic Models</CardTitle>
                <CardDescription className="text-purple-200 text-base leading-relaxed">
                  Ultra-high quality 3D models with realistic materials, lighting, and physics-based rendering
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-4">Advanced Lighting</CardTitle>
                <CardDescription className="text-purple-200 text-base leading-relaxed">
                  Dynamic lighting system that adapts to your environment for realistic shadows and reflections
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-4">Instant Sharing</CardTitle>
                <CardDescription className="text-purple-200 text-base leading-relaxed">
                  Capture and share your AR creations with friends, family, or clients in stunning 4K quality
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-4">Vast Collection</CardTitle>
                <CardDescription className="text-purple-200 text-base leading-relaxed">
                  Access hundreds of premium furniture pieces, decor items, and architectural elements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="bg-gradient-to-br from-yellow-500 to-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-4">Zero Setup</CardTitle>
                <CardDescription className="text-purple-200 text-base leading-relaxed">
                  No downloads, no accounts, no limits. Start creating your dream space instantly in your browser
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Transform Reality?</h2>
            <p className="text-xl text-purple-200 mb-12 leading-relaxed">
              Join thousands of designers, architects, and dreamers who are already creating magic with VirtuSpace
            </p>
            <Link href="/ar">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-semibold shadow-2xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                Start Creating Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-purple-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Cube className="h-8 w-8 text-purple-400" />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  VirtuSpace
                </span>
                <div className="flex items-center space-x-1">
                  <Crown className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs text-purple-300">PREMIUM</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-8">
              <Link href="/explore" className="text-purple-200 hover:text-purple-100 transition-colors">
                Explore
              </Link>
              <Link href="/help" className="text-purple-200 hover:text-purple-100 transition-colors">
                Help
              </Link>
              <a href="#" className="text-purple-200 hover:text-purple-100 transition-colors">
                Privacy
              </a>
            </div>
          </div>
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-purple-300">&copy; 2024 VirtuSpace. Crafted with ❤️ for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
