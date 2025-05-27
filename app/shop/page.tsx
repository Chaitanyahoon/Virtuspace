"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Construction, Clock, Star, Sparkles, Crown } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

export default function ShopPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* Coming Soon Header */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Construction className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
              <Crown className="h-6 w-6 text-yellow-800" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Premium Feature
            </Badge>

            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              VirtuSpace Shop
              <span className="block text-3xl text-purple-600 mt-2">Coming Soon</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              We're building an amazing shopping experience where you can purchase furniture that you've already
              visualized in your space using AR technology.
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 text-center border-2 border-purple-100 hover:border-purple-300 transition-colors">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AR-First Shopping</h3>
                <p className="text-gray-600 text-sm">Try before you buy with our AR visualization technology</p>
              </Card>

              <Card className="p-6 text-center border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Premium Brands</h3>
                <p className="text-gray-600 text-sm">Curated collection from top furniture designers</p>
              </Card>

              <Card className="p-6 text-center border-2 border-green-100 hover:border-green-300 transition-colors">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Smart Recommendations</h3>
                <p className="text-gray-600 text-sm">AI-powered suggestions based on your AR sessions</p>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <Clock className="h-5 w-5" />
                <span>Expected Launch: Q2 2024</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ar">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Try AR Experience
                  </Button>
                </Link>

                <Link href="/gallery">
                  <Button size="lg" variant="outline">
                    Browse Gallery
                  </Button>
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <Card className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <h3 className="text-xl font-semibold mb-4">Get Notified When We Launch</h3>
              <p className="text-gray-600 mb-6">
                Be the first to know when VirtuSpace Shop goes live and get exclusive early access.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">Notify Me</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
