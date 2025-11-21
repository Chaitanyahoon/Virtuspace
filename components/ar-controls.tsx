"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, Trash2, Camera, Palette, Home, Sparkles, Crown, X } from "lucide-react"
import { useState } from "react"

interface ARControlsProps {
  onTransformChange: (transform: any) => void
  currentTransform: {
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
  }
  onShowLibrary: () => void
  selectedModel?: string
}

export default function ARControls({
  onTransformChange,
  currentTransform,
  onShowLibrary,
  selectedModel,
}: ARControlsProps) {
  const [showMaterialPanel, setShowMaterialPanel] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState("default")

  const materials = [
    { id: "default", name: "Default", color: "#8B4513", finish: "Matte" },
    { id: "oak", name: "Oak Wood", color: "#DEB887", finish: "Natural" },
    { id: "walnut", name: "Walnut", color: "#654321", finish: "Satin" },
    { id: "ebony", name: "Ebony", color: "#2C2C2C", finish: "Gloss" },
    { id: "metal-chrome", name: "Chrome", color: "#C0C0C0", finish: "Mirror" },
    { id: "metal-brass", name: "Brass", color: "#B5A642", finish: "Brushed" },
    { id: "fabric-navy", name: "Navy Fabric", color: "#1E3A8A", finish: "Textile" },
    { id: "fabric-cream", name: "Cream Fabric", color: "#F5F5DC", finish: "Textile" },
    { id: "leather-black", name: "Black Leather", color: "#1C1C1C", finish: "Leather" },
    { id: "leather-brown", name: "Brown Leather", color: "#8B4513", finish: "Leather" },
    { id: "marble-white", name: "White Marble", color: "#F8F8FF", finish: "Stone" },
    { id: "marble-black", name: "Black Marble", color: "#2F2F2F", finish: "Stone" },
  ]

  const resetTransform = () => {
    onTransformChange({
      position: [0, 0, -2],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    })
  }

  const takeScreenshot = () => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const link = document.createElement("a")
      link.download = "virtuspace-ar-session.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const getModelName = (modelId: string) => {
    return modelId.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getModelQuality = (modelId: string) => {
    const premiumModels = [
      "chair-executive",
      "chair-barcelona",
      "chair-eames",
      "chair-wingback",
      "table-conference",
      "table-marble",
      "table-glass",
      "table-industrial",
      "lamp-crystal",
      "lamp-designer",
      "lamp-smart",
      "lamp-vintage",
      "plant-bonsai",
      "plant-olive",
      "plant-bird",
      "plant-monstera",
      "sofa-chesterfield",
      "sofa-sectional",
      "sofa-mid-century",
      "sofa-modular",
      "bed-king",
      "bed-canopy",
      "bed-storage",
      "dresser-modern",
      "art-sculpture",
      "vase-ceramic",
      "mirror-decorative",
      "clock-wall",
      "tv-oled",
      "speaker-smart",
      "computer-setup",
      "projector-4k",
    ]
    return premiumModels.includes(modelId) ? "Premium" : "Standard"
  }

  return (
    <>
      {/* Floating Controls - Compact and Elegant */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <Card className="bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardContent className="p-2 sm:p-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowLibrary}
                className="text-white hover:bg-white/20 h-12 w-12 sm:h-10 sm:w-10 p-0"
              >
                <Grid3X3 className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMaterialPanel(!showMaterialPanel)}
                className="text-white hover:bg-white/20 h-12 w-12 sm:h-10 sm:w-10 p-0"
              >
                <Palette className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={takeScreenshot}
                className="text-white hover:bg-white/20 h-12 w-12 sm:h-10 sm:w-10 p-0"
              >
                <Camera className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={resetTransform}
                className="text-white hover:bg-white/20 h-12 w-12 sm:h-10 sm:w-10 p-0"
              >
                <Home className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-white hover:bg-red-500/20 h-12 w-12 sm:h-10 sm:w-10 p-0"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Info Panel - Top Right */}
      {selectedModel && (
        <div className="fixed top-14 sm:top-20 right-2 sm:right-6 z-40">
          <Card className="bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl max-w-[280px] sm:max-w-xs">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{getModelName(selectedModel)}</h3>
                  <p className="text-white/70 text-xs mb-2">
                    <span className="hidden sm:inline">
                      • Drag to move
                      <br />• Pinch/scroll to scale
                      <br />• Two fingers to rotate
                      <br />• Double tap for 90° turn
                      <br />• Hold Shift + drag to rotate (desktop)
                    </span>
                    <span className="sm:hidden">
                      • Drag to move
                      <br />• Pinch to scale
                      <br />• Two fingers to rotate
                    </span>
                  </p>
                </div>
                <Badge
                  variant={getModelQuality(selectedModel) === "Premium" ? "default" : "secondary"}
                  className={`text-xs ${
                    getModelQuality(selectedModel) === "Premium"
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {getModelQuality(selectedModel) === "Premium" && <Crown className="h-3 w-3 mr-1" />}
                  {getModelQuality(selectedModel)}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                <div className="text-center">
                  <div className="text-white font-medium">{Math.round(currentTransform.scale[0] * 100)}%</div>
                  <div>Size</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">
                    {Math.round((currentTransform.rotation[1] * 180) / Math.PI)}°
                  </div>
                  <div>Rotation</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">{currentTransform.position[1].toFixed(1)}m</div>
                  <div>Height</div>
                </div>
              </div>

              {/* Surface Detection Status */}
              <div className="mt-3 p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-xs font-medium">Surface Detected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Material Panel */}
      {showMaterialPanel && (
        <div className="fixed bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl max-w-sm sm:max-w-md mx-3">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center text-sm sm:text-base">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Premium Materials
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMaterialPanel(false)}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 sm:max-h-48 overflow-y-auto">
                {materials.map((material) => (
                  <Button
                    key={material.id}
                    variant={selectedMaterial === material.id ? "default" : "ghost"}
                    onClick={() => setSelectedMaterial(material.id)}
                    className="flex flex-col items-center p-2 h-auto text-white hover:bg-white/20"
                  >
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-white/30 mb-1 shadow-lg"
                      style={{ backgroundColor: material.color }}
                    />
                    <span className="text-xs font-medium">{material.name}</span>
                    <span className="text-xs text-white/60">{material.finish}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}


    </>
  )
}
