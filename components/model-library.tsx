"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Armchair,
  Table,
  Lamp,
  TreePine,
  Sofa,
  Package,
  Search,
  Bed,
  Monitor,
  Flower,
  Sparkles,
  Crown,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface ModelLibraryProps {
  onModelSelect: (modelType: string, variant?: string) => void
  onClose: () => void
}

const modelCategories = {
  seating: {
    name: "Seating",
    icon: Armchair,
    color: "from-blue-500 to-cyan-500",
    models: [
      { id: "chair-lounge", name: "Modern Lounge Chair", description: "Contemporary green lounge chair", quality: "Premium" },
      { id: "chair-bean-bag", name: "Bean Bag Chair", description: "Comfortable bean bag seating", quality: "Standard" },
      { id: "chair-rocking", name: "Rocking Chair", description: "Classic wooden rocking chair", quality: "Standard" },
      { id: "chair-stool", name: "Office Stool", description: "Modern adjustable stool", quality: "Standard" },
      { id: "chair-dining", name: "Dining Chair", description: "Elegant dining room chair", quality: "Standard" },
    ],
  },
  tables: {
    name: "Tables",
    icon: Table,
    color: "from-green-500 to-emerald-500",
    models: [
      { id: "table-round", name: "Round Dining Table", description: "Circular wooden dining table", quality: "Premium" },
      { id: "table-console", name: "Console Table", description: "Elegant entryway console", quality: "Premium" },
      { id: "table-side", name: "Side Table", description: "Modern accent table", quality: "Standard" },
      { id: "table-bar", name: "Bar Table", description: "Industrial bar height table", quality: "Standard" },
    ],
  },
  lighting: {
    name: "Lighting",
    icon: Lamp,
    color: "from-yellow-500 to-amber-500",
    models: [
      { id: "lamp-floor", name: "Arc Floor Lamp", description: "Modern arc floor lamp", quality: "Premium" },
      { id: "lamp-pendant", name: "Pendant Light", description: "Hanging pendant fixture", quality: "Premium" },
      { id: "lamp-wall", name: "Wall Sconce", description: "Elegant wall-mounted light", quality: "Standard" },
      { id: "lamp-desk", name: "Desk Lamp", description: "Minimalist desk lamp", quality: "Standard" },
    ],
  },
  plants: {
    name: "Plants",
    icon: TreePine,
    color: "from-emerald-500 to-green-500",
    models: [
      { id: "plant-cactus", name: "Desert Cactus", description: "Southwestern succulent", quality: "Standard" },
      { id: "plant-fiddle", name: "Fiddle Leaf Fig", description: "Popular indoor tree", quality: "Premium" },
      { id: "plant-snake", name: "Snake Plant", description: "Low maintenance succulent", quality: "Standard" },
      { id: "plant-bamboo", name: "Bamboo Plant", description: "Zen bamboo arrangement", quality: "Standard" },
    ],
  },
  sofas: {
    name: "Sofas",
    icon: Sofa,
    color: "from-purple-500 to-pink-500",
    models: [
      { id: "sofa-loveseat", name: "Loveseat", description: "Compact 2-seater sofa", quality: "Premium" },
      { id: "sofa-chaise", name: "Chaise Lounge", description: "Elegant chaise lounge", quality: "Premium" },
    ],
  },
  bedroom: {
    name: "Bedroom",
    icon: Bed,
    color: "from-indigo-500 to-purple-500",
    models: [
      { id: "bed-king", name: "King Platform Bed", description: "Modern platform bed", quality: "Premium" },
      { id: "bed-canopy", name: "Canopy Bed", description: "Elegant four-poster bed", quality: "Premium" },
      { id: "bed-storage", name: "Storage Bed", description: "Bed with built-in storage", quality: "Premium" },
      { id: "dresser-modern", name: "Modern Dresser", description: "Sleek bedroom dresser", quality: "Premium" },
      {
        id: "nightstand-floating",
        name: "Floating Nightstand",
        description: "Wall-mounted nightstand",
        quality: "Standard",
      },
      { id: "wardrobe-walk", name: "Walk-in Closet", description: "Custom closet system", quality: "Standard" },
      { id: "mirror-full", name: "Full Length Mirror", description: "Standing floor mirror", quality: "Standard" },
      { id: "bench-bedroom", name: "Bedroom Bench", description: "Upholstered bench", quality: "Standard" },
    ],
  },
  decor: {
    name: "Decor",
    icon: Flower,
    color: "from-pink-500 to-rose-500",
    models: [
      { id: "decor-bookshelf", name: "Modern Bookshelf", description: "Contemporary bookshelf", quality: "Premium" },
      { id: "decor-mirror", name: "Wall Mirror", description: "Decorative wall mirror", quality: "Premium" },
      { id: "decor-rug", name: "Persian Rug", description: "Luxury area rug", quality: "Premium" },
      { id: "decor-art", name: "Wall Art", description: "Modern wall art piece", quality: "Standard" },
      { id: "decor-sculpture", name: "Abstract Sculpture", description: "Contemporary sculpture", quality: "Premium" },
    ],
  },
  storage: {
    name: "Storage",
    icon: Package,
    color: "from-orange-500 to-red-500",
    models: [
      { id: "storage-cabinet", name: "Storage Cabinet", description: "Modern storage cabinet", quality: "Premium" },
      { id: "storage-dresser", name: "Dresser", description: "Wooden bedroom dresser", quality: "Premium" },
      { id: "storage-shelf", name: "Shelving Unit", description: "Industrial shelving", quality: "Standard" },
      { id: "storage-wardrobe", name: "Wardrobe", description: "Classic wardrobe closet", quality: "Premium" },
    ],
  },
  tech: {
    name: "Tech",
    icon: Monitor,
    color: "from-cyan-500 to-blue-500",
    models: [
      { id: "tv-oled", name: 'OLED TV 75"', description: "Ultra-thin OLED display", quality: "Premium" },
      { id: "speaker-smart", name: "Smart Speaker", description: "AI-powered speaker", quality: "Premium" },
      { id: "computer-setup", name: "Gaming Setup", description: "Complete gaming station", quality: "Premium" },
      { id: "projector-4k", name: "4K Projector", description: "Home theater projector", quality: "Premium" },
      { id: "tablet-stand", name: "Tablet Stand", description: "Adjustable tablet holder", quality: "Standard" },
      {
        id: "charger-wireless",
        name: "Wireless Charger",
        description: "Qi wireless charging pad",
        quality: "Standard",
      },
      { id: "camera-security", name: "Security Camera", description: "Smart security camera", quality: "Standard" },
      { id: "router-mesh", name: "Mesh Router", description: "High-speed mesh router", quality: "Standard" },
    ],
  },
}

export default function ModelLibrary({ onModelSelect, onClose }: ModelLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("seating")
  const [qualityFilter, setQualityFilter] = useState("all")

  const currentCategory = modelCategories[selectedCategory as keyof typeof modelCategories]

  const filteredModels = currentCategory.models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesQuality = qualityFilter === "all" || model.quality.toLowerCase() === qualityFilter
    return matchesSearch && matchesQuality
  })

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end animate-fade-in">
      <Card className="w-full max-h-[85vh] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-t-3xl overflow-hidden animate-slide-up shadow-2xl shadow-purple-500/20">
        <CardHeader className="border-b border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-2xl font-bold flex items-center">
              <Package className="h-6 w-6 mr-3 text-purple-400 animate-float" />
              <span className="text-gradient">Premium Collection</span>
              <Crown className="h-5 w-5 ml-2 text-yellow-400 animate-pulse" />
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10 smooth-transition">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
              <Input
                placeholder="Search premium models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-purple-400/30 text-white placeholder:text-purple-300 focus:glow-purple smooth-transition"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={qualityFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setQualityFilter("all")}
                className="border-purple-400/30 smooth-transition hover-lift"
              >
                All
              </Button>
              <Button
                variant={qualityFilter === "premium" ? "default" : "outline"}
                size="sm"
                onClick={() => setQualityFilter("premium")}
                className="border-purple-400/30 smooth-transition hover-lift glow-purple"
              >
                <Crown className="h-4 w-4 mr-1 animate-pulse" />
                Premium
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[60vh] p-6">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6 glass-effect border border-purple-500/20">
              {Object.entries(modelCategories).map(([key, category]) => {
                const IconComponent = category.icon
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white smooth-transition data-[state=active]:glow-purple"
                  >
                    <IconComponent className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{category.name}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {Object.entries(modelCategories).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredModels.map((model, index) => (
                    <Card
                      key={model.id}
                      className="group glass-effect border border-purple-500/20 hover:border-purple-400/50 smooth-transition cursor-pointer hover-lift hover:shadow-2xl hover:shadow-purple-500/25 animate-scale-in"
                      style={{animationDelay: `${index * 0.05}s`}}
                      onClick={() => onModelSelect(model.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors">
                              {model.name}
                            </h4>
                            <p className="text-xs text-purple-200 mb-2 line-clamp-2">{model.description}</p>
                          </div>
                          <Badge
                            variant={model.quality === "Premium" ? "default" : "secondary"}
                            className={`text-xs smooth-transition ${
                              model.quality === "Premium"
                                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black animate-shimmer"
                                : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {model.quality === "Premium" && <Crown className="h-3 w-3 mr-1" />}
                            {model.quality}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg animate-float`}>
                            <category.icon className="h-5 w-5 text-white" />
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs px-4 opacity-0 group-hover:opacity-100 smooth-transition glow-pink"
                          >
                            <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                            Place in AR
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">No models found</h3>
              <p className="text-purple-300">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
