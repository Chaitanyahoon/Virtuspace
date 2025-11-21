"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Heart, Eye, Download, Share2, Star, TrendingUp, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"

const featuredModels = [
  {
    id: "modern-sofa",
    name: "Modern Sofa",
    creator: "DesignStudio",
    category: "Furniture",
    likes: 234,
    downloads: 1200,
    rating: 4.8,
    price: "Free",
    tags: ["modern", "sofa", "living room"],
    color: "#3B82F6", // Blue
  },
  {
    id: "minimalist-desk",
    name: "Minimalist Desk",
    creator: "WorkspaceDesign",
    category: "Furniture",
    likes: 189,
    downloads: 890,
    rating: 4.6,
    price: "$12.99",
    tags: ["desk", "office", "minimalist"],
    color: "#10B981", // Emerald
  },
  {
    id: "vintage-lamp",
    name: "Vintage Lamp",
    creator: "RetroLights",
    category: "Lighting",
    likes: 156,
    downloads: 567,
    rating: 4.9,
    price: "Free",
    tags: ["vintage", "lamp", "lighting"],
    color: "#F59E0B", // Amber
  },
  {
    id: "plant-collection",
    name: "Plant Collection",
    creator: "GreenThumb",
    category: "Plants",
    likes: 298,
    downloads: 1450,
    rating: 4.7,
    price: "$8.99",
    tags: ["plants", "nature", "decoration"],
    color: "#22C55E", // Green
  },
  {
    id: "coffee-table",
    name: "Coffee Table",
    creator: "FurniturePro",
    category: "Furniture",
    likes: 167,
    downloads: 723,
    rating: 4.5,
    price: "Free",
    tags: ["table", "coffee", "living room"],
    color: "#8B5CF6", // Violet
  },
  {
    id: "wall-art-set",
    name: "Wall Art Set",
    creator: "ArtisticVibes",
    category: "Decoration",
    likes: 203,
    downloads: 934,
    rating: 4.8,
    price: "$15.99",
    tags: ["art", "wall", "decoration"],
    color: "#EC4899", // Pink
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

function ModelPreview({ modelId, color }: { modelId: string; color: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/50 to-blue-900/20">
      <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            
            {/* SOFA GEOMETRY */}
            {modelId.includes("sofa") && (
              <group position={[0, -0.5, 0]}>
                {/* Base */}
                <mesh position={[0, 0.25, 0]}>
                  <boxGeometry args={[2.2, 0.5, 0.8]} />
                  <meshStandardMaterial color={color} roughness={0.8} />
                </mesh>
                {/* Backrest */}
                <mesh position={[0, 0.75, -0.3]}>
                  <boxGeometry args={[2.2, 0.6, 0.2]} />
                  <meshStandardMaterial color={color} roughness={0.8} />
                </mesh>
                {/* Armrests */}
                <mesh position={[-1, 0.6, 0]}>
                  <boxGeometry args={[0.2, 0.4, 0.8]} />
                  <meshStandardMaterial color={color} roughness={0.8} />
                </mesh>
                <mesh position={[1, 0.6, 0]}>
                  <boxGeometry args={[0.2, 0.4, 0.8]} />
                  <meshStandardMaterial color={color} roughness={0.8} />
                </mesh>
                {/* Cushions */}
                <mesh position={[-0.5, 0.55, 0.1]}>
                  <boxGeometry args={[0.9, 0.1, 0.6]} />
                  <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
                </mesh>
                <mesh position={[0.5, 0.55, 0.1]}>
                  <boxGeometry args={[0.9, 0.1, 0.6]} />
                  <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
                </mesh>
              </group>
            )}

            {/* DESK GEOMETRY */}
            {modelId.includes("desk") && (
              <group position={[0, -0.5, 0]}>
                {/* Tabletop */}
                <mesh position={[0, 0.75, 0]}>
                  <boxGeometry args={[2, 0.1, 1]} />
                  <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
                </mesh>
                {/* Legs */}
                <mesh position={[-0.9, 0.375, -0.4]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                  <meshStandardMaterial color="#333" metalness={0.8} />
                </mesh>
                <mesh position={[0.9, 0.375, -0.4]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                  <meshStandardMaterial color="#333" metalness={0.8} />
                </mesh>
                <mesh position={[-0.9, 0.375, 0.4]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                  <meshStandardMaterial color="#333" metalness={0.8} />
                </mesh>
                <mesh position={[0.9, 0.375, 0.4]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.75]} />
                  <meshStandardMaterial color="#333" metalness={0.8} />
                </mesh>
                {/* Drawer */}
                <mesh position={[0.5, 0.65, 0]}>
                  <boxGeometry args={[0.6, 0.15, 0.8]} />
                  <meshStandardMaterial color="#444" />
                </mesh>
              </group>
            )}

            {/* LAMP GEOMETRY */}
            {modelId.includes("lamp") && (
              <group position={[0, -1, 0]}>
                {/* Base */}
                <mesh position={[0, 0.1, 0]}>
                  <cylinderGeometry args={[0.4, 0.5, 0.2]} />
                  <meshStandardMaterial color="#333" metalness={0.5} />
                </mesh>
                {/* Stem */}
                <mesh position={[0, 1, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 1.8]} />
                  <meshStandardMaterial color="#666" metalness={0.8} />
                </mesh>
                {/* Shade */}
                <mesh position={[0, 2, 0]}>
                  <coneGeometry args={[0.6, 0.8, 32, 1, true]} />
                  <meshStandardMaterial color={color} transparent opacity={0.9} side={2} />
                </mesh>
                {/* Bulb */}
                <mesh position={[0, 1.8, 0]}>
                  <sphereGeometry args={[0.15]} />
                  <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
                </mesh>
              </group>
            )}

            {/* PLANT GEOMETRY */}
            {modelId.includes("plant") && (
              <group position={[0, -0.8, 0]}>
                {/* Pot */}
                <mesh position={[0, 0.4, 0]}>
                  <cylinderGeometry args={[0.4, 0.3, 0.8]} />
                  <meshStandardMaterial color="#d97706" roughness={1} />
                </mesh>
                {/* Soil */}
                <mesh position={[0, 0.75, 0]}>
                  <cylinderGeometry args={[0.35, 0.35, 0.1]} />
                  <meshStandardMaterial color="#3f2e18" roughness={1} />
                </mesh>
                {/* Stem */}
                <mesh position={[0, 1.2, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 1]} />
                  <meshStandardMaterial color="#166534" />
                </mesh>
                {/* Leaves */}
                <mesh position={[0.3, 1.5, 0]} rotation={[0, 0, -0.5]}>
                  <sphereGeometry args={[0.3, 32, 16]} />
                  <meshStandardMaterial color={color} />
                </mesh>
                <mesh position={[-0.3, 1.3, 0.2]} rotation={[0, 0, 0.5]}>
                  <sphereGeometry args={[0.25, 32, 16]} />
                  <meshStandardMaterial color={color} />
                </mesh>
                <mesh position={[0, 1.7, -0.2]} rotation={[0.5, 0, 0]}>
                  <sphereGeometry args={[0.25, 32, 16]} />
                  <meshStandardMaterial color={color} />
                </mesh>
              </group>
            )}

            {/* TABLE GEOMETRY */}
            {modelId.includes("table") && !modelId.includes("desk") && (
              <group position={[0, -0.5, 0]}>
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[1, 1, 0.1]} />
                  <meshStandardMaterial color={color} roughness={0.5} />
                </mesh>
                <mesh position={[0, 0.25, 0]}>
                  <cylinderGeometry args={[0.1, 0.1, 0.5]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[0, 0.025, 0]}>
                  <cylinderGeometry args={[0.5, 0.5, 0.05]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
              </group>
            )}

            {/* ART GEOMETRY */}
            {modelId.includes("art") && (
              <group position={[0, 0, 0]}>
                {/* Frame */}
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[1.5, 2, 0.1]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
                {/* Canvas */}
                <mesh position={[0, 0, 0.06]}>
                  <boxGeometry args={[1.3, 1.8, 0.02]} />
                  <meshStandardMaterial color={color} />
                </mesh>
                {/* Abstract shapes on canvas */}
                <mesh position={[0.2, 0.3, 0.08]}>
                  <sphereGeometry args={[0.3]} />
                  <meshStandardMaterial color="#fff" />
                </mesh>
                <mesh position={[-0.3, -0.4, 0.08]}>
                  <boxGeometry args={[0.4, 0.4, 0.02]} />
                  <meshStandardMaterial color="#fbbf24" />
                </mesh>
              </group>
            )}

            {/* FALLBACK GEOMETRY */}
            {!modelId.includes("sofa") && 
             !modelId.includes("desk") && 
             !modelId.includes("lamp") && 
             !modelId.includes("plant") && 
             !modelId.includes("table") && 
             !modelId.includes("art") && (
              <mesh>
                <dodecahedronGeometry args={[1]} />
                <meshStandardMaterial color={color} wireframe />
              </mesh>
            )}

          </Float>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="glass-effect border-b border-blue-500/20 animate-slide-down">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gradient-cyan">Explore</h1>
                <p className="text-blue-200 mt-1">Discover premium 3D models</p>
              </div>
            </div>
            <Link href="/ar">
              <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white glow-cyan animate-glow-pulse">
                Launch AR Studio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
            <Input
              placeholder="Search models, creators, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-blue-500/30 text-white placeholder:text-blue-300 focus:border-blue-400 focus:ring-blue-400/50"
            />
          </div>
          <Button variant="outline" className="border-blue-500/30 text-blue-200 hover:bg-blue-500/20 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-0" 
                : "border-blue-500/30 text-blue-200 hover:bg-blue-500/20 hover:text-white bg-transparent"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <Tabs value={sortBy} onValueChange={setSortBy} className="animate-fade-in" style={{animationDelay: '0.2s'}}>
          <TabsList className="glass-effect border border-blue-500/20 mb-8">
            <TabsTrigger value="trending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-600 text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-600 text-white">
              <Clock className="h-4 w-4 mr-2" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-600 text-white">
              <Users className="h-4 w-4 mr-2" />
              Popular
            </TabsTrigger>
          </TabsList>

          <TabsContent value={sortBy}>
            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model, index) => (
                <Card key={model.id} className="glass-effect border border-blue-500/20 overflow-hidden hover-lift smooth-transition animate-scale-in group" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="aspect-video relative overflow-hidden">
                    <ModelPreview modelId={model.id} color={model.color} />

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur-sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Link href={`/ar?model=${model.id}`}>
                        <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white glow-cyan">
                          View in AR
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-white">{model.name}</h3>
                        <p className="text-sm text-blue-200">by {model.creator}</p>
                      </div>
                      <div className="flex items-center text-sm text-yellow-400">
                        <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                        {model.rating}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {model.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-blue-500/30 text-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-blue-300 mb-4">
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
                      <Button size="sm" className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-blue-500/30">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-200 hover:bg-blue-500/20 hover:text-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredModels.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-float" />
                <h3 className="text-lg font-semibold text-white mb-2">No models found</h3>
                <p className="text-blue-200">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

