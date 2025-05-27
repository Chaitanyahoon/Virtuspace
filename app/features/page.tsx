"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  CuboidIcon as Cube,
  Eye,
  Share2,
  Crown,
  Sparkles,
  Camera,
  Palette,
  Layers,
  Cpu,
  Wifi,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

const features = [
  {
    icon: Smartphone,
    title: "Real-Time Interaction",
    description: "Drag, rotate, and scale objects in real-time with intuitive touch controls and gesture recognition",
    color: "from-purple-500 to-pink-500",
    details: [
      "Multi-touch gesture support",
      "Precise object manipulation",
      "Smooth 60fps interactions",
      "Haptic feedback integration",
    ],
    isPremium: true,
  },
  {
    icon: Cube,
    title: "Photorealistic Models",
    description: "Ultra-high quality 3D models with realistic materials, lighting, and physics-based rendering",
    color: "from-blue-500 to-cyan-500",
    details: ["4K texture resolution", "PBR material system", "500+ premium models", "Optimized for mobile"],
    isPremium: true,
  },
  {
    icon: Eye,
    title: "Advanced Lighting",
    description: "Dynamic lighting system that adapts to your environment for realistic shadows and reflections",
    color: "from-green-500 to-emerald-500",
    details: ["Real-time shadows", "Environment mapping", "HDR lighting", "Ambient occlusion"],
    isPremium: true,
  },
  {
    icon: Camera,
    title: "AI Surface Detection",
    description: "Intelligent surface detection automatically finds the best placement for your objects",
    color: "from-orange-500 to-red-500",
    details: ["Automatic plane detection", "Surface normal calculation", "Occlusion handling", "Real-time tracking"],
    isPremium: true,
  },
  {
    icon: Palette,
    title: "Material Editor",
    description: "Customize materials, colors, and textures with our advanced material editor",
    color: "from-pink-500 to-rose-500",
    details: ["12+ material types", "Color customization", "Texture mapping", "Metallic/roughness control"],
    isPremium: true,
  },
  {
    icon: Layers,
    title: "Scene Management",
    description: "Create, save, and share complex AR scenes with multiple objects and layouts",
    color: "from-indigo-500 to-purple-500",
    details: ["Multi-object scenes", "Layer organization", "Scene templates", "Cloud synchronization"],
    isPremium: false,
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    description: "Capture and share your AR creations with friends, family, or clients in stunning 4K quality",
    color: "from-yellow-500 to-amber-500",
    details: ["4K screenshot capture", "Video recording", "Social media integration", "QR code sharing"],
    isPremium: false,
  },
  {
    icon: Cpu,
    title: "Performance Optimized",
    description: "Optimized for all devices with intelligent LOD and performance scaling",
    color: "from-teal-500 to-cyan-500",
    details: ["Adaptive quality", "Battery optimization", "Memory management", "60fps guarantee"],
    isPremium: false,
  },
  {
    icon: Wifi,
    title: "Offline Capable",
    description: "Works offline with cached models and scenes for uninterrupted creativity",
    color: "from-violet-500 to-purple-500",
    details: ["Offline model cache", "Local scene storage", "Progressive loading", "Sync when online"],
    isPremium: false,
  },
]

const comparisonFeatures = [
  { name: "Basic AR Placement", free: true, premium: true },
  { name: "Model Library Access", free: "50 models", premium: "500+ models" },
  { name: "4K Textures", free: false, premium: true },
  { name: "Advanced Materials", free: false, premium: true },
  { name: "AI Surface Detection", free: false, premium: true },
  { name: "Scene Sharing", free: "Basic", premium: "Advanced" },
  { name: "Cloud Storage", free: "1GB", premium: "Unlimited" },
  { name: "Priority Support", free: false, premium: true },
  { name: "Commercial License", free: false, premium: true },
]

export default function FeaturesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center">
            <Sparkles className="h-10 w-10 mr-4 text-purple-600" />
            Premium Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional-grade AR technology with intuitive controls and stunning visuals
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/ar">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Play className="h-5 w-5 mr-2" />
                Try Features Now
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline">
                <Eye className="h-5 w-5 mr-2" />
                View Gallery
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden"
              >
                {feature.isPremium && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center p-8">
                  <div
                    className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-4">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed mb-6">{feature.description}</CardDescription>
                  <div className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Feature Comparison */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free vs Premium</h2>
            <p className="text-gray-600">See what's included in our premium experience</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div></div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600">Always free</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center">
                  <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                  Premium
                </h3>
                <p className="text-gray-600">Free forever</p>
              </div>
            </div>

            <div className="space-y-4">
              {comparisonFeatures.map((feature, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 py-4 border-b border-gray-200 last:border-b-0">
                  <div className="font-medium text-gray-900">{feature.name}</div>
                  <div className="text-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 mx-auto bg-gray-300 rounded-full"></div>
                      )
                    ) : (
                      <span className="text-gray-600">{feature.free}</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof feature.premium === "boolean" ? (
                      feature.premium ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 mx-auto bg-gray-300 rounded-full"></div>
                      )
                    ) : (
                      <span className="text-gray-600">{feature.premium}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Premium AR?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start creating stunning AR experiences with our premium features - completely free!
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/ar">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                <Sparkles className="h-5 w-5 mr-2" />
                Launch AR Studio
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Cube className="h-5 w-5 mr-2" />
                Browse Models
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
