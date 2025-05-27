"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Users, Eye, ArrowRight, Zap, Target } from "lucide-react"

interface Recommendation {
  id: string
  type: "model" | "scene" | "user" | "trend"
  title: string
  description: string
  confidence: number
  reason: string
  thumbnail?: string
  metadata?: any
}

interface AIRecommendationsProps {
  userId: string
  currentContext?: string
  onRecommendationClick: (recommendation: Recommendation) => void
}

export default function AIRecommendations({ userId, currentContext, onRecommendationClick }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("personalized")

  useEffect(() => {
    generateRecommendations()
  }, [userId, currentContext])

  const generateRecommendations = async () => {
    setIsLoading(true)

    // Simulate AI recommendation generation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockRecommendations: Recommendation[] = [
      {
        id: "1",
        type: "model",
        title: "Scandinavian Dining Set",
        description: "Based on your interest in modern furniture and Nordic design",
        confidence: 0.92,
        reason: "Similar to your recently liked items",
        thumbnail: "/placeholder.svg?height=150&width=200",
        metadata: { category: "Furniture", style: "Scandinavian", price: "Premium" },
      },
      {
        id: "2",
        type: "scene",
        title: "Minimalist Office Setup",
        description: "Perfect for your workspace design preferences",
        confidence: 0.88,
        reason: "Matches your viewing history",
        thumbnail: "/placeholder.svg?height=150&width=200",
        metadata: { category: "Office", complexity: "Medium", models: 5 },
      },
      {
        id: "3",
        type: "user",
        title: "Follow @DesignMaster",
        description: "Creates content similar to your interests",
        confidence: 0.85,
        reason: "High engagement overlap",
        thumbnail: "/placeholder.svg?height=150&width=200",
        metadata: { followers: 12500, posts: 89, engagement: "High" },
      },
      {
        id: "4",
        type: "trend",
        title: "Biophilic Design Trend",
        description: "Nature-inspired designs are trending in your area",
        confidence: 0.79,
        reason: "Popular in your region",
        thumbnail: "/placeholder.svg?height=150&width=200",
        metadata: { growth: "+45%", timeframe: "This month", relevance: "High" },
      },
      {
        id: "5",
        type: "model",
        title: "Smart Home Devices",
        description: "Tech-forward furniture for modern living",
        confidence: 0.76,
        reason: "Trending in your network",
        thumbnail: "/placeholder.svg?height=150&width=200",
        metadata: { category: "Technology", innovation: "High", adoption: "Growing" },
      },
    ]

    setRecommendations(mockRecommendations)
    setIsLoading(false)
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "model":
        return <Sparkles className="h-4 w-4" />
      case "scene":
        return <Eye className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      case "trend":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600 bg-green-100"
    if (confidence >= 0.8) return "text-blue-600 bg-blue-100"
    if (confidence >= 0.7) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  const filteredRecommendations = recommendations.filter((rec) => {
    if (activeTab === "personalized") return rec.confidence >= 0.8
    if (activeTab === "trending") return rec.type === "trend" || rec.reason.includes("trending")
    if (activeTab === "social") return rec.type === "user" || rec.reason.includes("network")
    return true
  })

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6 text-center">
          <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">AI is analyzing your preferences...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-purple-600" />
          AI Recommendations
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === "personalized" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("personalized")}
          >
            For You
          </Button>
          <Button
            variant={activeTab === "trending" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </Button>
          <Button
            variant={activeTab === "social" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("social")}
          >
            Social
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredRecommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onRecommendationClick(recommendation)}
          >
            <div className="flex-shrink-0">
              <img
                src={recommendation.thumbnail || "/placeholder.svg"}
                alt={recommendation.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex items-center space-x-1 text-purple-600">
                  {getRecommendationIcon(recommendation.type)}
                  <span className="text-xs font-medium capitalize">{recommendation.type}</span>
                </div>
                <Badge className={`text-xs ${getConfidenceColor(recommendation.confidence)}`}>
                  {Math.round(recommendation.confidence * 100)}% match
                </Badge>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{recommendation.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{recommendation.reason}</p>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              {recommendation.metadata && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(recommendation.metadata).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-xs">
                      {key}: {value}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No recommendations available for this category</p>
          </div>
        )}

        <Button variant="outline" className="w-full" onClick={generateRecommendations}>
          <Sparkles className="h-4 w-4 mr-2" />
          Refresh Recommendations
        </Button>
      </CardContent>
    </Card>
  )
}
