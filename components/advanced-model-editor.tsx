"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Sparkles, RotateCcw, Save, Download, Eye, Sun, Zap } from "lucide-react"

interface AdvancedModelEditorProps {
  modelId: string
  onClose: () => void
}

export default function AdvancedModelEditor({ modelId, onClose }: AdvancedModelEditorProps) {
  const [activeTab, setActiveTab] = useState("materials")
  const [materialSettings, setMaterialSettings] = useState({
    baseColor: "#8B4513",
    metallic: 0.5,
    roughness: 0.5,
    emission: 0,
    normalStrength: 1,
    opacity: 1,
  })

  const [lightingSettings, setLightingSettings] = useState({
    intensity: 1,
    temperature: 6500,
    shadows: true,
    ambientOcclusion: true,
    environmentIntensity: 0.5,
  })

  const [animationSettings, setAnimationSettings] = useState({
    rotation: false,
    floating: false,
    pulsing: false,
    speed: 1,
  })

  const presetMaterials = [
    { name: "Oak Wood", color: "#DEB887", metallic: 0, roughness: 0.8 },
    { name: "Polished Metal", color: "#C0C0C0", metallic: 1, roughness: 0.1 },
    { name: "Matte Black", color: "#2C2C2C", metallic: 0, roughness: 0.9 },
    { name: "Gold", color: "#FFD700", metallic: 1, roughness: 0.2 },
    { name: "Leather", color: "#8B4513", metallic: 0, roughness: 0.7 },
    { name: "Glass", color: "#F0F8FF", metallic: 0, roughness: 0.05 },
  ]

  const handleMaterialChange = (property: string, value: number | string) => {
    setMaterialSettings((prev) => ({ ...prev, [property]: value }))
  }

  const handleLightingChange = (property: string, value: number | boolean) => {
    setLightingSettings((prev) => ({ ...prev, [property]: value }))
  }

  const handleAnimationChange = (property: string, value: number | boolean) => {
    setAnimationSettings((prev) => ({ ...prev, [property]: value }))
  }

  const applyPreset = (preset: any) => {
    setMaterialSettings((prev) => ({
      ...prev,
      baseColor: preset.color,
      metallic: preset.metallic,
      roughness: preset.roughness,
    }))
  }

  const resetToDefaults = () => {
    setMaterialSettings({
      baseColor: "#8B4513",
      metallic: 0.5,
      roughness: 0.5,
      emission: 0,
      normalStrength: 1,
      opacity: 1,
    })
    setLightingSettings({
      intensity: 1,
      temperature: 6500,
      shadows: true,
      ambientOcclusion: true,
      environmentIntensity: 0.5,
    })
    setAnimationSettings({
      rotation: false,
      floating: false,
      pulsing: false,
      speed: 1,
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl">
        <Card className="h-full flex flex-col border-0 rounded-none">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                Advanced Editor
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={resetToDefaults}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  ×
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 m-4">
                <TabsTrigger value="materials" className="flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Materials
                </TabsTrigger>
                <TabsTrigger value="lighting" className="flex items-center">
                  <Sun className="h-4 w-4 mr-2" />
                  Lighting
                </TabsTrigger>
                <TabsTrigger value="animation" className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Animation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="materials" className="p-4 space-y-6">
                {/* Material Presets */}
                <div>
                  <h3 className="font-semibold mb-3">Material Presets</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {presetMaterials.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(preset)}
                        className="flex items-center justify-start p-3 h-auto"
                      >
                        <div className="w-4 h-4 rounded-full mr-2 border" style={{ backgroundColor: preset.color }} />
                        <span className="text-xs">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Base Color */}
                <div>
                  <label className="block text-sm font-medium mb-2">Base Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={materialSettings.baseColor}
                      onChange={(e) => handleMaterialChange("baseColor", e.target.value)}
                      className="w-12 h-8 rounded border"
                    />
                    <span className="text-sm text-gray-600">{materialSettings.baseColor}</span>
                  </div>
                </div>

                {/* Metallic */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Metallic: {materialSettings.metallic.toFixed(2)}
                  </label>
                  <Slider
                    value={[materialSettings.metallic]}
                    onValueChange={([value]) => handleMaterialChange("metallic", value)}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                {/* Roughness */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Roughness: {materialSettings.roughness.toFixed(2)}
                  </label>
                  <Slider
                    value={[materialSettings.roughness]}
                    onValueChange={([value]) => handleMaterialChange("roughness", value)}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                {/* Emission */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Emission: {materialSettings.emission.toFixed(2)}
                  </label>
                  <Slider
                    value={[materialSettings.emission]}
                    onValueChange={([value]) => handleMaterialChange("emission", value)}
                    max={2}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                {/* Opacity */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Opacity: {materialSettings.opacity.toFixed(2)}
                  </label>
                  <Slider
                    value={[materialSettings.opacity]}
                    onValueChange={([value]) => handleMaterialChange("opacity", value)}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="lighting" className="p-4 space-y-6">
                {/* Light Intensity */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Intensity: {lightingSettings.intensity.toFixed(2)}
                  </label>
                  <Slider
                    value={[lightingSettings.intensity]}
                    onValueChange={([value]) => handleLightingChange("intensity", value)}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Color Temperature */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Color Temperature: {lightingSettings.temperature}K
                  </label>
                  <Slider
                    value={[lightingSettings.temperature]}
                    onValueChange={([value]) => handleLightingChange("temperature", value)}
                    min={2000}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Environment Intensity */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Environment: {lightingSettings.environmentIntensity.toFixed(2)}
                  </label>
                  <Slider
                    value={[lightingSettings.environmentIntensity]}
                    onValueChange={([value]) => handleLightingChange("environmentIntensity", value)}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Lighting Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cast Shadows</span>
                    <Button
                      variant={lightingSettings.shadows ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLightingChange("shadows", !lightingSettings.shadows)}
                    >
                      {lightingSettings.shadows ? "On" : "Off"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ambient Occlusion</span>
                    <Button
                      variant={lightingSettings.ambientOcclusion ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLightingChange("ambientOcclusion", !lightingSettings.ambientOcclusion)}
                    >
                      {lightingSettings.ambientOcclusion ? "On" : "Off"}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="animation" className="p-4 space-y-6">
                {/* Animation Speed */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Animation Speed: {animationSettings.speed.toFixed(1)}x
                  </label>
                  <Slider
                    value={[animationSettings.speed]}
                    onValueChange={([value]) => handleAnimationChange("speed", value)}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Animation Types */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto Rotation</span>
                    <Button
                      variant={animationSettings.rotation ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnimationChange("rotation", !animationSettings.rotation)}
                    >
                      {animationSettings.rotation ? "On" : "Off"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Floating Effect</span>
                    <Button
                      variant={animationSettings.floating ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnimationChange("floating", !animationSettings.floating)}
                    >
                      {animationSettings.floating ? "On" : "Off"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pulsing Glow</span>
                    <Button
                      variant={animationSettings.pulsing ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnimationChange("pulsing", !animationSettings.pulsing)}
                    >
                      {animationSettings.pulsing ? "On" : "Off"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          {/* Action Buttons */}
          <div className="border-t p-4 space-y-3">
            <div className="flex space-x-2">
              <Button className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Preset
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Preview in AR
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
