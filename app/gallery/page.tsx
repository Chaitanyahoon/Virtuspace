"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Heart, Eye, Download, Share2, Star, Crown, Sparkles, Play } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

const galleryItems = [
  {
    id: 1,
    title: "Modern Living Room",
    creator: "DesignStudio Pro",
    description: "Minimalist living space with premium furniture",
    thumbnail: "/images/living-room-1.png",
    models: ["sofa-sectional", "table-glass", "lamp-designer"],
    likes: 1247,
    views: 8934,
    downloads: 456,
    rating: 4.9,
    category: "Living Room",
    isPremium: true,
    tags: ["modern", "minimalist", "luxury"],
  },
  {
    id: 2,
    title: "Executive Office",
    creator: "WorkSpace Design",
    description: "Professional office setup with premium materials",
    thumbnail: "/images/office-1.png",
    models: ["chair-executive", "table-conference", "lamp-smart"],
    likes: 892,
    views: 5621,
    downloads: 234,
    rating: 4.7,
    category: "Office",
    isPremium: true,
    tags: ["office", "professional", "executive"],
  },
  {
    id: 3,
    title: "Zen Garden Room",
    creator: "Nature Spaces",
    description: "Peaceful space with natural elements",
    thumbnail: "/images/zen-garden.png",
    models: ["plant-bonsai", "table-industrial", "chair-wingback"],
    likes: 1456,
    views: 9876,
    downloads: 678,
    rating: 4.8,
    category: "Bedroom",
    isPremium: true,
    tags: ["zen", "nature", "peaceful"],
  },
  {
    id: 4,
    title: "Luxury Bedroom",
    creator: "Elite Interiors",
    description: "Opulent bedroom with premium finishes",
    thumbnail: "/images/bedroom-1.png",
    models: ["bed-king", "dresser-modern", "lamp-crystal"],
    likes: 2134,
    views: 12456,
    downloads: 890,
    rating: 4.9,
    category: "Bedroom",
    isPremium: true,
    tags: ["luxury", "bedroom", "elegant"],
  },
  {
    id: 5,
    title: "Industrial Loft",
    creator: "Urban Designs",
    description: "Raw industrial aesthetic with modern touches",
    thumbnail: "/images/living-room-2.png",
    models: ["sofa-mid-century", "table-industrial", "lamp-vintage"],
    likes: 987,
    views: 6543,
    downloads: 345,
    rating: 4.6,
    category: "Living Room",
    isPremium: false,
    tags: ["industrial", "loft", "urban"],
  },
  {
    id: 6,
    title: "Scandinavian Kitchen",
    creator: "Nordic Home",
    description: "Clean Scandinavian design principles",
    thumbnail: "/images/kitchen-1.png",
    models: ["chair-dining", "table-marble", "plant-monstera"],
    likes: 1678,
    views: 8765,
    downloads: 567,
    rating: 4.8,
    category: "Kitchen",
    isPremium: true,
    tags: ["scandinavian", "kitchen", "clean"],
  },
]

const categories = ["All", "Living Room", "Bedroom", "Office", "Kitchen", "Bathroom"]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesPremium = !showPremiumOnly || item.isPremium
    return matchesSearch && matchesCategory && matchesPremium
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes
      case "recent":
        return b.id - a.id
      case "rating":
        return b.rating - a.rating
      case "downloads":
        return b.downloads - a.downloads
      default:
        return 0
    }
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center">
              <Sparkles className="h-8 w-8 mr-3 text-purple-600" />
              Premium Gallery
            </h1>
            <p className="text-gray-600 mt-2">Discover stunning AR room designs from our community</p>
          </div>
          <Link href="/ar">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Play className="h-4 w-4 mr-2" />
              Create New Scene
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search gallery, creators, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showPremiumOnly ? "default" : "outline"}
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              className="flex items-center"
            >
              <Crown className="h-4 w-4 mr-2" />
              Premium Only
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
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
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="recent">Most Recent</TabsTrigger>
            <TabsTrigger value="rating">Highest Rated</TabsTrigger>
            <TabsTrigger value="downloads">Most Downloaded</TabsTrigger>
          </TabsList>

          <TabsContent value={sortBy} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      {item.isPremium && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black">
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="space-x-2">
                        <Link href={`/ar?scene=${item.id}`}>
                          <Button>
                            <Play className="h-4 w-4 mr-2" />
                            View in AR
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">by {item.creator}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {item.rating}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {item.views}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {item.downloads}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/ar?scene=${item.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          <Play className="h-4 w-4 mr-1" />
                          Experience
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No gallery items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
