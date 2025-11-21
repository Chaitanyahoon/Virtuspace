"use client"

import { Suspense, useState, useEffect, useCallback, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera, Sparkles, Crown, AlertTriangle, Grid3X3 } from "lucide-react"
import Link from "next/link"
import ARScene from "@/components/ar-scene"
import ModelLibrary from "@/components/model-library"
import ARControls from "@/components/ar-controls"
import SurfaceDetector from "@/components/surface-detector"


export default function ARPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(true)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [isARActive, setIsARActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [useGridView, setUseGridView] = useState(false)

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
  const [isSecureContext, setIsSecureContext] = useState(true)

  // Check if we're in a secure context (HTTPS)
  useEffect(() => {
    setIsSecureContext(window.isSecureContext)
  }, [])

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




  const startCamera = useCallback(async () => {
    setCameraError(null)

    // Check if we're in a secure context
    if (!window.isSecureContext) {
      setCameraError("HTTPS is required for camera access. Please use a secure connection.")
      return
    }

    // Check if getUserMedia is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera API is not supported in this browser.")
      return
    }

    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Request camera with fallback options
      let stream: MediaStream | null = null

      try {
        // Try with ideal settings first
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1920, min: 640 },
            height: { ideal: 1080, min: 480 },
          },
        })
      } catch (error) {
        console.warn("High-quality camera failed, trying basic settings:", error)

        // Fallback to basic settings
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "environment",
            },
          })
        } catch (fallbackError) {
          console.warn("Environment camera failed, trying any camera:", fallbackError)

          // Final fallback - any camera
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          })
        }
      }

      if (stream) {
        streamRef.current = stream
        setCameraStream(stream)
        setIsARActive(true)
        setCameraError(null)

        // Set video source directly to prevent flickering
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      }
    } catch (error: any) {
      console.error("Error accessing camera:", error)

      let errorMessage = "Unable to access camera. "

      if (error.name === "NotAllowedError") {
        errorMessage += "Please allow camera permissions and try again."
      } else if (error.name === "NotFoundError") {
        errorMessage += "No camera found on this device."
      } else if (error.name === "NotSupportedError") {
        errorMessage += "Camera is not supported in this browser."
      } else if (error.name === "NotReadableError") {
        errorMessage += "Camera is already in use by another application."
      } else {
        errorMessage += "Please check your camera settings and try again."
      }

      setCameraError(errorMessage)
    }
  }, [])

  // Initialize camera on mount with user interaction
  useEffect(() => {
    // Don't auto-start camera, wait for user interaction
    // This helps with mobile browsers that require user gesture
  }, [])

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
      {/* Camera Background - Fixed to prevent flickering */}
      {/* Grid View Background */}
      {useGridView && !cameraStream && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
      )}

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
              className="text-white hover:bg-white/10 bg-black/20 backdrop-blur-xl border border-blue-500/30 shadow-2xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-xl rounded-full px-4 py-2 border border-blue-500/30 shadow-2xl">
            <div
              className={`w-3 h-3 rounded-full shadow-lg ${isARActive ? "bg-red-500 animate-pulse shadow-red-500/50" : "bg-sky-500 shadow-sky-500/50"}`}
            ></div>
            <span className="text-white text-sm font-medium">
              {isARActive ? (useGridView ? "Grid View Mode" : "AR Studio Active") : "Initializing..."}
            </span>
            <Crown className="h-4 w-4 text-sky-400" />
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
                <div className="bg-black/50 backdrop-blur-xl text-white text-lg p-6 rounded-2xl border border-blue-500/30 shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-6 w-6 animate-spin text-sky-400" />
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
              useGridView={useGridView}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Model Library */}
      {showLibrary && <ModelLibrary onModelSelect={handleModelSelect} onClose={() => setShowLibrary(false)} />}



      {/* Controls */}
      {selectedModel && !showLibrary && (
        <ARControls
          onTransformChange={handleTransformChange}
          currentTransform={modelTransform}
          onShowLibrary={() => setShowLibrary(true)}
          selectedModel={selectedModel}
        />
      )}

      {/* Welcome Screen */}
      {!selectedModel && !showLibrary && isARActive && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto">
          <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/30 shadow-2xl max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <Camera className="h-16 w-16 text-sky-400 mx-auto" />
                <Sparkles className="h-6 w-6 text-blue-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Welcome to VirtuSpace AR</h3>

              <p className="text-white/80 mb-6 leading-relaxed">
                Point your camera at a flat surface and select from our premium collection of photorealistic 3D models.
                Use touch gestures to interact!
              </p>
              <Button
                onClick={() => setShowLibrary(true)}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-3"
                data-tutorial="model-library"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Browse Premium Collection
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Camera Access Screen */}
      {!cameraStream && !isARActive && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-slate-950 to-blue-950 flex items-center justify-center">
          <Card className="max-w-md mx-4 bg-black/20 backdrop-blur-xl border border-blue-500/30 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <Camera className="h-16 w-16 text-sky-400 mx-auto" />
                <Crown className="h-6 w-6 text-blue-400 absolute -top-2 -right-2" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Premium AR Access Required</h3>

              {!isSecureContext && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-300">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">HTTPS required for camera access</span>
                  </div>
                </div>
              )}

              {cameraError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm">{cameraError}</p>
                </div>
              )}

              <p className="text-white/80 mb-6 leading-relaxed">
                VirtuSpace needs camera access to provide our premium AR experience with photorealistic models, advanced
                lighting, and voice commands.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={startCamera}
                  disabled={!isSecureContext}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-3 disabled:opacity-50"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Enable Premium AR
                </Button>
                <Button
                  onClick={() => {
                    setUseGridView(true)
                    setIsARActive(true)
                    setShowLibrary(false)
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Use 3D Grid View Instead
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full border-blue-500/30 text-white hover:bg-white/10">
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Surface Detection Hint - Only show in camera mode */}
      {isARActive && selectedModel && !detectedSurface && !useGridView && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-xl text-white px-6 py-3 rounded-full text-sm border border-blue-500/30 shadow-2xl">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-sky-400 animate-pulse" />
              <span>Move your device to detect surfaces</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
