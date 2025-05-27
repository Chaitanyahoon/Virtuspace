"use client"

import { Suspense, useState, useEffect, useCallback, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera, Sparkles, Crown, Settings } from "lucide-react"
import Link from "next/link"
import ARScene from "@/components/ar-scene"
import ModelLibrary from "@/components/model-library"
import ARControls from "@/components/ar-controls"
import SurfaceDetector from "@/components/surface-detector"
import AdvancedModelEditor from "@/components/advanced-model-editor"
import CollaborationSystem from "@/components/collaboration-system"
import VoiceCommands from "@/components/voice-commands"
import TutorialSystem from "@/components/tutorial-system"

export default function ARPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(true)
  const [showAdvancedEditor, setShowAdvancedEditor] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [isARActive, setIsARActive] = useState(false)
  const [isFirstTime] = useState(false)
  const [modelTransform, setModelTransform] = useState({
    position: [0, 0, -2] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
  })
  const [detectedSurface, setDetectedSurface] = useState<{
    position: [number, number, number]
    normal: [number, number, number]
  } | null>(null)

  // Use ref to prevent camera flickering
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Memoized handlers to prevent infinite re-renders
  const handleModelSelect = useCallback((modelType: string, variant?: string) => {
    setSelectedModel(modelType)
    setShowLibrary(false)
  }, [])

  const handleTransformChange = useCallback((transform: typeof modelTransform) => {
    setModelTransform(transform)
  }, [])

  const handleSurfaceDetected = useCallback((position: [number, number, number], normal: [number, number, number]) => {
    setDetectedSurface({ position, normal })
  }, [])

  const handleVoiceCommand = useCallback((command: any) => {
    switch (command.action) {
      case "place_model":
        setSelectedModel(command.parameters.model)
        setShowLibrary(false)
        break
      case "rotate":
        const rotationAmount = (command.parameters.amount * Math.PI) / 180
        const direction = command.parameters.direction === "left" ? -1 : 1
        setModelTransform((prev) => ({
          ...prev,
          rotation: [prev.rotation[0], prev.rotation[1] + rotationAmount * direction, prev.rotation[2]],
        }))
        break
      case "scale":
        setModelTransform((prev) => ({
          ...prev,
          scale: prev.scale.map((s) => s * command.parameters.factor) as [number, number, number],
        }))
        break
      case "move":
        const moveAmount = command.parameters.amount
        const moveDirection = command.parameters.direction
        setModelTransform((prev) => {
          const newPosition = [...prev.position] as [number, number, number]
          if (moveDirection === "up") newPosition[1] += moveAmount
          if (moveDirection === "down") newPosition[1] -= moveAmount
          return { ...prev, position: newPosition }
        })
        break
      case "delete":
        setSelectedModel(null)
        break
      case "reset":
        setModelTransform({
          position: [0, 0, -2],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        })
        break
      case "screenshot":
        const canvas = document.querySelector("canvas")
        if (canvas) {
          const link = document.createElement("a")
          link.download = "virtuspace-ar-session.png"
          link.href = canvas.toDataURL()
          link.click()
        }
        break
      case "open_library":
        setShowLibrary(true)
        break
      case "close_library":
        setShowLibrary(false)
        break
      default:
        console.log("Unknown voice command:", command)
    }
  }, [])

  const handleInviteUser = useCallback((email: string) => {
    console.log("Inviting user:", email)
  }, [])

  const handleUpdatePermissions = useCallback((userId: string, role: string) => {
    console.log("Updating permissions:", userId, role)
  }, [])

  const startCamera = useCallback(async () => {
    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })

      streamRef.current = stream
      setCameraStream(stream)
      setIsARActive(true)

      // Set video source directly to prevent flickering
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Camera access is required for AR functionality. Please allow camera permissions and try again.")
    }
  }, [])

  // Initialize camera on mount
  useEffect(() => {
    startCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [startCamera])

  // Handle URL parameters separately
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const modelParam = urlParams.get("model")
    const productParam = urlParams.get("product")
    const sceneParam = urlParams.get("scene")
    const collaborateParam = urlParams.get("collaborate")

    if (modelParam) {
      setSelectedModel(modelParam)
      setShowLibrary(false)
    } else if (productParam) {
      const productToModelMap: { [key: string]: string } = {
        "1": "chair-executive",
        "2": "lamp-designer",
        "3": "table-glass",
        "4": "plant-monstera",
      }
      const mappedModel = productToModelMap[productParam] || "chair-executive"
      setSelectedModel(mappedModel)
      setShowLibrary(false)
    } else if (sceneParam) {
      setSelectedModel("sofa-sectional")
      setShowLibrary(false)
    }

    if (collaborateParam) {
      setShowCollaboration(true)
    }
  }, [])

  // Auto-place model on detected surface
  useEffect(() => {
    if (
      detectedSurface &&
      selectedModel &&
      modelTransform.position.every((p, i) => Math.abs(p - [0, 0, -2][i]) < 0.1)
    ) {
      setModelTransform((prev) => ({
        ...prev,
        position: [detectedSurface.position[0], detectedSurface.position[1] + 0.1, detectedSurface.position[2]],
      }))
    }
  }, [detectedSurface, selectedModel])

  return (
    <div className="h-screen relative overflow-hidden bg-black">
      {/* Tutorial System */}
      <TutorialSystem isFirstTime={isFirstTime} currentContext="ar" onComplete={() => {}} onSkip={() => {}} />

      {/* Camera Background - Fixed to prevent flickering */}
      {cameraStream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "contrast(1.1) brightness(1.05)",
            transform: "scaleX(-1)", // Mirror for better UX
          }}
        />
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 shadow-2xl">
            <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
            <span className="text-white text-sm font-medium">AR Studio Active</span>
            <Crown className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="flex items-center space-x-2">
            {selectedModel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedEditor(true)}
                className="text-white hover:bg-white/10 bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCollaboration(!showCollaboration)}
              className="text-white hover:bg-white/10 bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              Collaborate
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 0], fov: 75 }}
          style={{ background: "transparent" }}
          className="pointer-events-auto"
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
        >
          <Suspense
            fallback={
              <Html center>
                <div className="bg-black/50 backdrop-blur-xl text-white text-lg p-6 rounded-2xl border border-white/20 shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-6 w-6 animate-spin text-purple-400" />
                    <span>Loading Premium 3D Scene...</span>
                  </div>
                </div>
              </Html>
            }
          >
            <Environment preset="studio" />
            <fog attach="fog" args={["#000000", 10, 50]} />

            <SurfaceDetector onSurfaceDetected={handleSurfaceDetected} />

            <ARScene
              selectedModel={selectedModel}
              transform={modelTransform}
              onTransformChange={handleTransformChange}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Model Library */}
      {showLibrary && <ModelLibrary onModelSelect={handleModelSelect} onClose={() => setShowLibrary(false)} />}

      {/* Advanced Model Editor */}
      {showAdvancedEditor && selectedModel && (
        <AdvancedModelEditor modelId={selectedModel} onClose={() => setShowAdvancedEditor(false)} />
      )}

      {/* Collaboration System */}
      {showCollaboration && (
        <CollaborationSystem
          sessionId="session-123"
          isHost={true}
          onInviteUser={handleInviteUser}
          onUpdatePermissions={handleUpdatePermissions}
        />
      )}

      {/* Voice Commands */}
      <VoiceCommands onCommand={handleVoiceCommand} isARActive={isARActive} />

      {/* Controls */}
      {selectedModel && !showLibrary && !showAdvancedEditor && (
        <ARControls
          onTransformChange={handleTransformChange}
          currentTransform={modelTransform}
          onShowLibrary={() => setShowLibrary(true)}
          selectedModel={selectedModel}
        />
      )}

      {/* Welcome Screen */}
      {!selectedModel && !showLibrary && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto">
          <Card className="bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <Camera className="h-16 w-16 text-purple-400 mx-auto" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Welcome to VirtuSpace AR</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-purple-300 font-medium">PREMIUM EXPERIENCE</span>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Point your camera at a flat surface and select from our premium collection of photorealistic 3D models.
                Use voice commands or gestures to interact!
              </p>
              <Button
                onClick={() => setShowLibrary(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                data-tutorial="model-library"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Browse Premium Collection
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Camera Access Screen */}
      {!cameraStream && !isARActive && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
          <Card className="max-w-md mx-4 bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <Camera className="h-16 w-16 text-purple-400 mx-auto" />
                <Crown className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Premium AR Access Required</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                VirtuSpace needs camera access to provide our premium AR experience with photorealistic models, advanced
                lighting, and voice commands.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={startCamera}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Enable Premium AR
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Surface Detection Hint */}
      {isARActive && selectedModel && !detectedSurface && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-xl text-white px-6 py-3 rounded-full text-sm border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
              <span>Move your device to detect surfaces or say "place [object]"</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
