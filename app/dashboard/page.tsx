"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CuboidIcon as Cube, Plus, Eye, Share2, Download, Trash2, Calendar, Heart, Upload, Search } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import AIRecommendations from "@/components/ai-recommendations"
import CloudSync from "@/components/cloud-sync"
import TutorialSystem from "@/components/tutorial-system"

const recentSessions = [
  {
    id: 1,
    name: "Living Room Setup",
    models: ["Sofa", "Coffee Table", "Lamp"],
    createdAt: "2024-01-15",
    thumbnail: "/placeholder.svg?height=200&width=300",
    isPublic: true,
    likes: 24,
    views: 156,
  },
  {
    id: 2,
    name: "Office Design",
    models: ["Desk", "Chair", "Plant"],
    createdAt: "2024-01-14",
    thumbnail: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    likes: 0,
    views: 12,
  },
  {
    id: 3,
    name: "Bedroom Makeover",
    models: ["Bed", "Nightstand", "Dresser"],
    createdAt: "2024-01-12",
    thumbnail: "/placeholder.svg?height=200&width=300",
    isPublic: true,
    likes: 18,
    views: 89,
  },
]

const myModels = [
  {
    id: 1,
    name: "Custom Bookshelf",
    type: "Furniture",
    uploadedAt: "2024-01-10",
    size: "2.4 MB",
    downloads: 45,
    thumbnail: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 2,
    name: "Modern Vase",
    type: "Decoration",
    uploadedAt: "2024-01-08",
    size: "1.8 MB",
    downloads: 23,
    thumbnail: "/placeholder.svg?height=150&width=150",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showTutorial, setShowTutorial] = useState(false)
  const [isFirstTime] = useState(false)

  const handleRecommendationClick = (recommendation: any) => {
    console.log("Recommendation clicked:", recommendation)
    if (recommendation.type === "model") {
      window.location.href = `/ar?model=${recommendation.id}`
    } else if (recommendation.type === "scene") {
      window.location.href = `/ar?scene=${recommendation.id}`
    }
  }

  const handleModelUpload = () => {
    // Simulate model upload functionality
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".glb,.gltf,.obj,.fbx"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        alert(`Model "${file.name}" uploaded successfully! Processing...`)
        // Here you would typically upload to your backend
      }
    }
    input.click()
  }

  const handleSessionDelete = (sessionId: number) => {
    alert(`Session ${sessionId} deleted successfully!`)
    // Here you would typically delete from your backend
  }

  const handleModelDelete = (modelId: number) => {
    alert(`Model ${modelId} deleted successfully!`)
    // Here you would typically delete from your backend
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Tutorial System */}
        <TutorialSystem
          isFirstTime={isFirstTime}
          currentContext="dashboard"
          onComplete={() => setShowTutorial(false)}
          onSkip={() => setShowTutorial(false)}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your AR sessions and 3D models</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link href="/ar" data-tutorial="ar-button">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New AR Session
              </Button>
            </Link>
            <Button variant="outline" onClick={handleModelUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Model
            </Button>
            <Button variant="outline" onClick={() => setShowTutorial(true)}>
              Help
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions" data-tutorial="sessions">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="analytics" data-tutorial="analytics">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="sync">Cloud Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Sessions</p>
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-purple-200 text-xs">+3 this week</p>
                    </div>
                    <Cube className="h-10 w-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Views</p>
                      <p className="text-3xl font-bold">1,247</p>
                      <p className="text-blue-200 text-xs">+156 today</p>
                    </div>
                    <Eye className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Likes</p>
                      <p className="text-3xl font-bold">342</p>
                      <p className="text-green-200 text-xs">+24 today</p>
                    </div>
                    <Heart className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Models Used</p>
                      <p className="text-3xl font-bold">8</p>
                      <p className="text-orange-200 text-xs">Premium quality</p>
                    </div>
                    <Upload className="h-10 w-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cube className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Start AR Session</h3>
                  <p className="text-gray-600 mb-4">Create a new AR experience</p>
                  <Link href="/ar">
                    <Button className="w-full">Launch AR Studio</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Browse Gallery</h3>
                  <p className="text-gray-600 mb-4">Explore community creations</p>
                  <Link href="/gallery">
                    <Button variant="outline" className="w-full">
                      View Gallery
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Explore Models</h3>
                  <p className="text-gray-600 mb-4">Discover premium 3D models</p>
                  <Link href="/explore">
                    <Button variant="outline" className="w-full">
                      Browse Models
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <AIRecommendations
              userId="current-user"
              currentContext="dashboard"
              onRecommendationClick={handleRecommendationClick}
            />
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentSessions.map((session) => (
                <Card key={session.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={session.thumbnail || "/placeholder.svg"}
                      alt={session.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={session.isPublic ? "default" : "secondary"}>
                        {session.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{session.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">Models: {session.models.join(", ")}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {session.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {session.likes}
                        </span>
                      </div>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {session.createdAt}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/ar?session=${session.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSessionDelete(session.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My 3D Models</h2>
              <Button onClick={handleModelUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Model
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {myModels.map((model) => (
                <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={model.thumbnail || "/placeholder.svg"}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{model.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{model.type}</p>
                    <div className="text-xs text-gray-500 space-y-1 mb-3">
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{model.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Downloads:</span>
                        <span>{model.downloads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uploaded:</span>
                        <span>{model.uploadedAt}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/ar?model=${model.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleModelDelete(model.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <CloudSync userId="current-user" isOnline={true} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
