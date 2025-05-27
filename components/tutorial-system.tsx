"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, CheckCircle, ArrowRight, ArrowLeft, Lightbulb, Target, Hand } from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  description: string
  instruction: string
  targetElement?: string
  action: "highlight" | "overlay" | "tooltip" | "modal"
  duration?: number
  skippable: boolean
}

interface TutorialSystemProps {
  isFirstTime: boolean
  currentContext: "home" | "ar" | "dashboard" | "shop"
  onComplete: () => void
  onSkip: () => void
}

export default function TutorialSystem({ isFirstTime, currentContext, onComplete, onSkip }: TutorialSystemProps) {
  const [isActive, setIsActive] = useState(isFirstTime)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const tutorials = {
    home: [
      {
        id: "welcome",
        title: "Welcome to VirtuSpace!",
        description: "Let's take a quick tour of our premium AR platform",
        instruction: "Click 'Start Tour' to begin your journey",
        action: "modal",
        skippable: true,
      },
      {
        id: "ar-button",
        title: "Launch AR Studio",
        description: "This button starts your AR experience",
        instruction: "Click here to enter the AR world",
        targetElement: "[data-tutorial='ar-button']",
        action: "highlight",
        skippable: true,
      },
      {
        id: "features",
        title: "Explore Features",
        description: "Discover our premium features and capabilities",
        instruction: "Browse through our advanced AR tools",
        targetElement: "[data-tutorial='features']",
        action: "tooltip",
        skippable: true,
      },
    ],
    ar: [
      {
        id: "camera-permission",
        title: "Camera Access",
        description: "We need camera access for AR functionality",
        instruction: "Grant camera permission when prompted",
        action: "modal",
        skippable: false,
      },
      {
        id: "surface-detection",
        title: "Find a Surface",
        description: "Point your camera at a flat surface like a table or floor",
        instruction: "Move your device slowly to detect surfaces",
        action: "overlay",
        duration: 5000,
        skippable: true,
      },
      {
        id: "model-library",
        title: "Choose a Model",
        description: "Browse our premium collection of 3D models",
        instruction: "Tap the grid icon to open the model library",
        targetElement: "[data-tutorial='model-library']",
        action: "highlight",
        skippable: true,
      },
      {
        id: "place-object",
        title: "Place Your Object",
        description: "Tap on the detected surface to place your model",
        instruction: "Touch the screen where you want to place the object",
        action: "overlay",
        skippable: true,
      },
      {
        id: "interact",
        title: "Interact with Objects",
        description: "Use gestures to move, rotate, and scale objects",
        instruction: "Drag to move, pinch to scale, two fingers to rotate",
        action: "tooltip",
        skippable: true,
      },
    ],
    dashboard: [
      {
        id: "overview",
        title: "Your Dashboard",
        description: "Manage your AR sessions and models here",
        instruction: "This is your creative hub",
        action: "modal",
        skippable: true,
      },
      {
        id: "sessions",
        title: "AR Sessions",
        description: "View and manage your saved AR experiences",
        instruction: "Click on any session to edit or share it",
        targetElement: "[data-tutorial='sessions']",
        action: "highlight",
        skippable: true,
      },
      {
        id: "analytics",
        title: "Performance Analytics",
        description: "Track views, likes, and engagement on your content",
        instruction: "Monitor your content's performance here",
        targetElement: "[data-tutorial='analytics']",
        action: "tooltip",
        skippable: true,
      },
    ],
    shop: [
      {
        id: "shop-intro",
        title: "VirtuSpace Shop",
        description: "Purchase furniture you've visualized in AR",
        instruction: "Browse products that you can try before you buy",
        action: "modal",
        skippable: true,
      },
      {
        id: "ar-preview",
        title: "View in AR",
        description: "See how products look in your space before purchasing",
        instruction: "Click 'View in AR' on any product",
        targetElement: "[data-tutorial='ar-preview']",
        action: "highlight",
        skippable: true,
      },
    ],
  } as const

  const currentTutorial = tutorials[currentContext] || []
  const currentStepData = currentTutorial[currentStep]

  useEffect(() => {
    if (isPlaying && currentStepData?.duration) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStep()
            return 0
          }
          return prev + 100 / (currentStepData.duration! / 100)
        })
      }, 100)

      return () => clearInterval(timer)
    }
  }, [isPlaying, currentStep, currentStepData])

  const nextStep = () => {
    if (currentStep < currentTutorial.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
    } else {
      completeTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
    }
  }

  const skipStep = () => {
    if (currentStepData?.skippable) {
      nextStep()
    }
  }

  const restartTutorial = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(false)
  }

  const completeTutorial = () => {
    setIsActive(false)
    onComplete()
  }

  const skipTutorial = () => {
    setIsActive(false)
    onSkip()
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (!isActive || !currentStepData) return null

  return (
    <>
      {/* Tutorial Overlay */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        {/* Tutorial Card */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-4">
          <Card className="bg-white shadow-2xl border-0">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentStepData.title}</h3>
                    <p className="text-xs text-gray-500">
                      Step {currentStep + 1} of {currentTutorial.length}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {currentContext.toUpperCase()}
                </Badge>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <Progress value={(currentStep / currentTutorial.length) * 100} className="h-2" />
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-700 mb-3">{currentStepData.description}</p>
                <div className="flex items-start space-x-2 p-3 bg-purple-50 rounded-lg">
                  <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-purple-800">{currentStepData.instruction}</p>
                </div>
              </div>

              {/* Step Progress for Timed Steps */}
              {currentStepData.duration && isPlaying && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Auto-advancing...</span>
                    <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>

                  {currentStepData.duration && (
                    <Button variant="outline" size="sm" onClick={togglePlayPause}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  )}

                  <Button variant="outline" size="sm" onClick={restartTutorial}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  {currentStepData.skippable && (
                    <Button variant="ghost" size="sm" onClick={skipStep}>
                      Skip
                    </Button>
                  )}

                  {currentStep === currentTutorial.length - 1 ? (
                    <Button size="sm" onClick={completeTutorial}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete
                    </Button>
                  ) : (
                    <Button size="sm" onClick={nextStep}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Skip Tutorial */}
              <div className="mt-4 pt-4 border-t text-center">
                <Button variant="ghost" size="sm" onClick={skipTutorial} className="text-gray-500">
                  Skip entire tutorial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gesture Hints for AR Context */}
        {currentContext === "ar" && currentStepData.id === "interact" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 text-white max-w-sm">
              <h4 className="font-semibold mb-4 flex items-center">
                <Hand className="h-5 w-5 mr-2" />
                Gesture Guide
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">👆</span>
                  </div>
                  <span>Tap to place objects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">✋</span>
                  </div>
                  <span>Drag to move objects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">🤏</span>
                  </div>
                  <span>Pinch to scale objects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">🔄</span>
                  </div>
                  <span>Two fingers to rotate</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Highlight Overlay for Targeted Elements */}
      {currentStepData.action === "highlight" && currentStepData.targetElement && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 bg-black/30">
            {/* This would highlight the specific element */}
            <div className="absolute top-20 right-6 w-12 h-12 border-4 border-purple-400 rounded-lg animate-pulse bg-purple-400/20"></div>
          </div>
        </div>
      )}
    </>
  )
}
