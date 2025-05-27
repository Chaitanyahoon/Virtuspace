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
      {
        id: "chair-executive",
        name: "Executive Chair",
        description: "Luxury leather office chair",
        quality: "Premium",
      },
      { id: "chair-barcelona", name: "Barcelona Chair", description: "Iconic mid-century design", quality: "Premium" },
      { id: "chair-eames", name: "Eames Lounge", description: "Classic designer chair", quality: "Premium" },
      { id: "chair-wingback", name: "Wingback Chair", description: "Traditional high-back chair", quality: "Premium" },
      { id: "chair-accent", name: "Accent Chair", description: "Stylish statement piece", quality: "Standard" },
      { id: "chair-dining", name: "Dining Chair", description: "Elegant dining room chair", quality: "Standard" },
      { id: "chair-bar", name: "Bar Stool", description: "Modern bar height stool", quality: "Standard" },
      { id: "chair-rocking", name: "Rocking Chair", description: "Comfortable rocking chair", quality: "Standard" },
    ],
  },
  tables: {
    name: "Tables",
    icon: Table,
    color: "from-green-500 to-emerald-500",
    models: [
      { id: "table-conference", name: "Conference Table", description: "Large meeting table", quality: "Premium" },
      { id: "table-marble", name: "Marble Dining", description: "Luxury marble top table", quality: "Premium" },
      { id: "table-glass", name: "Glass Coffee", description: "Modern glass coffee table", quality: "Premium" },
      { id: "table-industrial", name: "Industrial Desk", description: "Metal and wood desk", quality: "Premium" },
      { id: "table-console", name: "Console Table", description: "Entryway console", quality: "Standard" },
      { id: "table-side", name: "Side Table", description: "Compact accent table", quality: "Standard" },
      { id: "table-outdoor", name: "Outdoor Table", description: "Weather-resistant table", quality: "Standard" },
      { id: "table-nesting", name: "Nesting Tables", description: "Set of stackable tables", quality: "Standard" },
    ],
  },
  lighting: {
    name: "Lighting",
    icon: Lamp,
    color: "from-yellow-500 to-amber-500",
    models: [
      { id: "lamp-crystal", name: "Crystal Chandelier", description: "Luxury crystal fixture", quality: "Premium" },
      { id: "lamp-designer", name: "Designer Floor", description: "Iconic floor lamp", quality: "Premium" },
      { id: "lamp-smart", name: "Smart Pendant", description: "IoT-enabled pendant light", quality: "Premium" },
      { id: "lamp-vintage", name: "Vintage Edison", description: "Retro Edison bulb fixture", quality: "Premium" },
      { id: "lamp-table", name: "Table Lamp", description: "Classic bedside lamp", quality: "Standard" },
      { id: "lamp-wall", name: "Wall Sconce", description: "Mounted wall light", quality: "Standard" },
      { id: "lamp-track", name: "Track Lighting", description: "Adjustable track system", quality: "Standard" },
      { id: "lamp-string", name: "String Lights", description: "Decorative string lights", quality: "Standard" },
    ],
  },
  plants: {
    name: "Plants",
    icon: TreePine,
    color: "from-emerald-500 to-green-500",
    models: [
      { id: "plant-bonsai", name: "Bonsai Tree", description: "Miniature Japanese tree", quality: "Premium" },
      { id: "plant-olive", name: "Olive Tree", description: "Mediterranean olive tree", quality: "Premium" },
      { id: "plant-bird", name: "Bird of Paradise", description: "Tropical statement plant", quality: "Premium" },
      { id: "plant-monstera", name: "Monstera Deliciosa", description: "Large tropical plant", quality: "Premium" },
      { id: "plant-fiddle", name: "Fiddle Leaf Fig", description: "Popular indoor tree", quality: "Standard" },
      { id: "plant-snake", name: "Snake Plant", description: "Low maintenance succulent", quality: "Standard" },
      { id: "plant-pothos", name: "Golden Pothos", description: "Trailing vine plant", quality: "Standard" },
      { id: "plant-cactus", name: "Desert Cactus", description: "Southwestern succulent", quality: "Standard" },
    ],
  },
  sofas: {
    name: "Sofas",
    icon: Sofa,
    color: "from-purple-500 to-pink-500",
    models: [
      { id: "sofa-chesterfield", name: "Chesterfield", description: "Classic tufted leather sofa", quality: "Premium" },
      { id: "sofa-sectional", name: "Sectional Sofa", description: "Large L-shaped sofa", quality: "Premium" },
      { id: "sofa-mid-century", name: "Mid-Century", description: "Retro modern design", quality: "Premium" },
      { id: "sofa-modular", name: "Modular System", description: "Configurable seating", quality: "Premium" },
      { id: "sofa-loveseat", name: "Loveseat", description: "Compact 2-seater", quality: "Standard" },
      { id: "sofa-sleeper", name: "Sleeper Sofa", description: "Convertible sofa bed", quality: "Standard" },
      { id: "sofa-recliner", name: "Reclining Sofa", description: "Comfortable recliner", quality: "Standard" },
      { id: "sofa-outdoor", name: "Outdoor Sofa", description: "Weather-resistant seating", quality: "Standard" },
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
      { id: "art-sculpture", name: "Modern Sculpture", description: "Contemporary art piece", quality: "Premium" },
      { id: "vase-ceramic", name: "Ceramic Vase", description: "Handcrafted ceramic vase", quality: "Premium" },
      { id: "mirror-decorative", name: "Decorative Mirror", description: "Ornate wall mirror", quality: "Premium" },
      { id: "clock-wall", name: "Designer Clock", description: "Modern wall clock", quality: "Premium" },
      { id: "candles-set", name: "Candle Set", description: "Luxury scented candles", quality: "Standard" },
      { id: "books-stack", name: "Book Collection", description: "Decorative book stack", quality: "Standard" },
      { id: "frame-photo", name: "Photo Frames", description: "Elegant picture frames", quality: "Standard" },
      { id: "rug-area", name: "Area Rug", description: "Designer area rug", quality: "Standard" },
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end">
      <Card className="w-full max-h-[85vh] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-t-3xl overflow-hidden">
        <CardHeader className="border-b border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-2xl font-bold flex items-center">
              <Package className="h-6 w-6 mr-3 text-purple-400" />
              Premium Collection
              <Crown className="h-5 w-5 ml-2 text-yellow-400" />
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
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
                className="pl-10 bg-white/10 border-purple-400/30 text-white placeholder:text-purple-300"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={qualityFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setQualityFilter("all")}
                className="border-purple-400/30"
              >
                All
              </Button>
              <Button
                variant={qualityFilter === "premium" ? "default" : "outline"}
                size="sm"
                onClick={() => setQualityFilter("premium")}
                className="border-purple-400/30"
              >
                <Crown className="h-4 w-4 mr-1" />
                Premium
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[60vh] p-6">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6 bg-white/5 border border-purple-500/20">
              {Object.entries(modelCategories).map(([key, category]) => {
                const IconComponent = category.icon
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white"
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
                  {filteredModels.map((model) => (
                    <Card
                      key={model.id}
                      className="group bg-white/5 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
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
                            className={`text-xs ${
                              model.quality === "Premium"
                                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black"
                                : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {model.quality === "Premium" && <Crown className="h-3 w-3 mr-1" />}
                            {model.quality}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                            <category.icon className="h-5 w-5 text-white" />
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs px-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
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
