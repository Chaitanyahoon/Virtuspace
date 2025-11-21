"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, Download, Maximize2, Filter, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import GlassLayout from "@/components/glass-layout"

// Mock Data for Gallery
const galleryItems = [
  {
    id: 1,
    title: "Cyberpunk Living Room",
    creator: "NeonDreamer",
    image: "/gallery/cyberpunk-room.jpg", // Placeholder
    likes: 1240,
    views: 5300,
    tags: ["Cyberpunk", "Neon", "Living Room"],
    color: "from-pink-500 to-purple-600", // Keep for variety or change? Let's keep item specific colors but update UI
  },
  {
    id: 2,
    title: "Zen Garden Office",
    creator: "MinimalistPro",
    image: "/gallery/zen-office.jpg",
    likes: 890,
    views: 3200,
    tags: ["Minimalist", "Office", "Nature"],
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 3,
    title: "Futuristic Kitchen",
    creator: "TechHome",
    image: "/gallery/future-kitchen.jpg",
    likes: 2100,
    views: 8900,
    tags: ["Futuristic", "Kitchen", "Clean"],
    color: "from-blue-400 to-cyan-600",
  },
  {
    id: 4,
    title: "Industrial Loft",
    creator: "UrbanStyle",
    image: "/gallery/loft.jpg",
    likes: 750,
    views: 2800,
    tags: ["Industrial", "Loft", "Raw"],
    color: "from-orange-400 to-red-600",
  },
  {
    id: 5,
    title: "Cozy Reading Nook",
    creator: "BookWorm",
    image: "/gallery/nook.jpg",
    likes: 1500,
    views: 6000,
    tags: ["Cozy", "Reading", "Warm"],
    color: "from-amber-400 to-orange-600",
  },
  {
    id: 6,
    title: "Space Station Bedroom",
    creator: "AstroDesign",
    image: "/gallery/space-bedroom.jpg",
    likes: 3200,
    views: 12000,
    tags: ["Space", "Bedroom", "Sci-Fi"],
    color: "from-indigo-400 to-purple-600",
  },
]

const categories = ["All", "Living Room", "Office", "Kitchen", "Bedroom", "Outdoor"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.tags.includes(activeCategory)
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.creator.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <GlassLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Inspiration <span className="text-gradient-cyan">Gallery</span>
            </h1>
            <p className="text-blue-200">Explore stunning AR spaces created by the community.</p>
          </div>
          <div className="flex gap-3">
             <Link href="/ar">
              <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white glow-cyan animate-glow-pulse border-0">
                Create Your Own
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 glass-effect p-4 rounded-xl border border-blue-500/20 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
            <input 
              type="text" 
              placeholder="Search designs, creators..." 
              className="w-full bg-blue-950/30 border border-blue-500/30 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-blue-400/50 focus:outline-none focus:border-blue-400 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category 
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-0" 
                  : "border-blue-500/30 text-blue-200 hover:bg-blue-500/20 hover:text-white bg-transparent whitespace-nowrap"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className="glass-effect border-blue-500/20 overflow-hidden hover-lift group" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Image Placeholder Area */}
              <div className={`h-48 w-full bg-gradient-to-br ${item.color} relative p-6 flex flex-col justify-between`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                <div className="flex justify-between items-start relative z-10">
                  <Badge className="bg-black/30 backdrop-blur-md border-0 text-white hover:bg-black/40">
                    {item.tags[0]}
                  </Badge>
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                   <Link href={`/ar?template=${item.id}`}>
                    <Button className="w-full bg-white/90 hover:bg-white text-blue-900 font-semibold">
                      Use Template
                    </Button>
                   </Link>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">{item.title}</h3>
                    <p className="text-sm text-blue-300">by {item.creator}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-500/20">
                  <div className="flex gap-4 text-sm text-blue-200">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-pink-400" /> {item.likes}</span>
                    <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3 text-sky-400" /> {item.views}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-blue-500/10 h-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 glass-effect rounded-xl border border-blue-500/20">
            <Filter className="h-12 w-12 text-blue-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">No designs found</h3>
            <p className="text-blue-200">Try adjusting your filters or search query.</p>
            <Button 
              variant="link" 
              className="text-sky-400 mt-2"
              onClick={() => {setActiveCategory("All"); setSearchQuery("")}}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </GlassLayout>
  )
}
