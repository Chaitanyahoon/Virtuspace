"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Heart, Eye, Download, Share2, Star, TrendingUp, Clock, Users } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

// Add 3D model preview component
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

const featuredModels = [
  {
    id: "modern-sofa",
    name: "Modern Sofa",
    creator: "DesignStudio",
    category: "Furniture",
    thumbnail: "/placeholder.svg?height=200&width=300",
    likes: 234,
    downloads: 1200,
    rating: 4.8,
    price: "Free",
    tags: ["modern", "sofa", "living room"],
  },
  {
    id: "minimalist-desk",
    name: "Minimalist Desk",
    creator: "WorkspaceDesign",
    category: "Furniture",
    thumbnail: "/placeholder.svg?height=200&width=300",
    likes: 189,
    downloads: 890,
    rating: 4.6,
    price: "$12.99",
    tags: ["desk", "office", "minimalist"],
  },
  {
    id: "vintage-lamp",
    name: "Vintage Lamp",
    creator: "RetroLights",
    category: "Lighting",
    thumbnail: "/placeholder.svg?height=200&width=300",
    likes: 156,
    downloads: 567,
    rating: 4.9,
    price: "Free",
    tags: ["vintage", "lamp", "lighting"],
  },
  {
    id: "plant-collection",
    name: "Plant Collection",
    creator: "GreenThumb",
    category: "Plants",
    thumbnail: "/placeholder.svg?height=200&width=300",
    likes: 298,
    downloads: 1450,
    rating: 4.7,
    price: "$8.99",
    tags: ["plants", "nature", "decoration"],
  },
  {
    id: "coffee-table",
    name: "Coffee Table",
    creator: "FurniturePro",
    category: "Furniture",
    thumbnail: "/placeholder.svg?height=200&width=300",
    likes: 167,
    downloads: 723,
    rating: 4.5,
    price: "Free",
    tags: ["table", "coffee", "living room"],
  },
  {
    id: "wall-art-set",
    name: "Wall Art Set",
    creator: "ArtisticVibes",
    category: "Decoration",
    thumbnail: "/placeholder.svg?height=200&width=300",
    likes: 203,
    downloads: 934,
    rating: 4.8,
    price: "$15.99",
    tags: ["art", "wall", "decoration"],
  },
]

const categories = [
  "All",
  "Furniture",
  "Lighting",
  "Decoration",
  "Plants",
  "Electronics",
  "Kitchen",
  "Bedroom",
  "Office",
]

// Add this component before the main component
function ModelPreview({ modelId }: { modelId: string }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
          {/* Simple preview based on model type */}
          {modelId.includes("chair") && (
            <group>
              <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 1, -0.45]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            </group>
          )}
          {modelId.includes("table") && (
            <group>
              <mesh position={[0, 0.75, 0]}>
                <boxGeometry args={[2, 0.1, 1]} />
                <meshStandardMaterial color="#654321" />
              </mesh>
              <mesh position={[-0.8, 0.375, -0.4]}>
                <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                <meshStandardMaterial color="#2C2C2C" />
              </mesh>
              <mesh position={[0.8, 0.375, -0.4]}>
                <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                <meshStandardMaterial color="#2C2C2C" />
              </mesh>
              <mesh position={[-0.8, 0.375, 0.4]}>
                <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                <meshStandardMaterial color="#2C2C2C" />
              </mesh>
              <mesh position={[0.8, 0.375, 0.4]}>
                <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                <meshStandardMaterial color="#2C2C2C" />
              </mesh>
            </group>
          )}
          {modelId.includes("lamp") && (
            <group>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.6]} />
                <meshStandardMaterial color="#2C2C2C" />
              </mesh>
              <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 1.8]} />
                <meshStandardMaterial color="#C0C0C0" />
              </mesh>
              <mesh position={[0, 2.1, 0]}>
                <coneGeometry args={[0.5, 0.6, 8]} />
                <meshStandardMaterial color="#F5F5DC" />
              </mesh>
            </group>
          )}
          {/* Default fallback */}
          {!modelId.includes("chair") && !modelId.includes("table") && !modelId.includes("lamp") && (
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("trending")

  const filteredModels = featuredModels.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || model.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore 3D Models</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of high-quality 3D models created by our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search models, creators, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <Tabs value={sortBy} onValueChange={setSortBy}>
          <TabsList>
            <TabsTrigger value="trending" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Popular
            </TabsTrigger>
          </TabsList>

          <TabsContent value={sortBy} className="mt-8">
            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Update the model card rendering to include 3D previews and fix AR links: */}
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <ModelPreview modelId={model.id} />
                    <div className="absolute top-2 left-2">
                      <Badge variant={model.price === "Free" ? "secondary" : "default"}>{model.price}</Badge>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Link href={`/ar?model=${model.id}`}>
                        <Button>View in AR</Button>
                      </Link>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{model.name}</h3>
                        <p className="text-sm text-gray-600">by {model.creator}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {model.rating}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {model.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {model.likes}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {model.downloads}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {Math.floor(model.downloads * 1.5)}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredModels.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No models found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
