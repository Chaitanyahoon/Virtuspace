"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX, Settings, Zap } from "lucide-react"

interface VoiceCommand {
  command: string
  action: string
  parameters?: any
}

interface VoiceCommandsProps {
  onCommand: (command: VoiceCommand) => void
  isARActive: boolean
}

export default function VoiceCommands({ onCommand, isARActive }: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [lastCommand, setLastCommand] = useState<string | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const recognitionRef = useRef<any>(null)

  const voiceCommands = [
    { phrase: "place chair", action: "place_model", parameters: { model: "chair-executive" } },
    { phrase: "place table", action: "place_model", parameters: { model: "table-conference" } },
    { phrase: "place lamp", action: "place_model", parameters: { model: "lamp-designer" } },
    { phrase: "place sofa", action: "place_model", parameters: { model: "sofa-sectional" } },
    { phrase: "place plant", action: "place_model", parameters: { model: "plant-monstera" } },
    { phrase: "rotate left", action: "rotate", parameters: { direction: "left", amount: 45 } },
    { phrase: "rotate right", action: "rotate", parameters: { direction: "right", amount: 45 } },
    { phrase: "make bigger", action: "scale", parameters: { factor: 1.2 } },
    { phrase: "make smaller", action: "scale", parameters: { factor: 0.8 } },
    { phrase: "move up", action: "move", parameters: { direction: "up", amount: 0.1 } },
    { phrase: "move down", action: "move", parameters: { direction: "down", amount: 0.1 } },
    { phrase: "delete object", action: "delete", parameters: {} },
    { phrase: "reset position", action: "reset", parameters: {} },
    { phrase: "take screenshot", action: "screenshot", parameters: {} },
    { phrase: "open library", action: "open_library", parameters: {} },
    { phrase: "close library", action: "close_library", parameters: {} },
    { phrase: "change material", action: "change_material", parameters: {} },
    { phrase: "toggle lighting", action: "toggle_lighting", parameters: {} },
  ]

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()

      const recognition = recognitionRef.current
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onresult = (event: any) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          const confidence = event.results[i][0].confidence

          if (event.results[i].isFinal) {
            finalTranscript += transcript
            setConfidence(confidence)
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)

        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim())
        }
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const processVoiceCommand = (spokenText: string) => {
    const matchedCommand = voiceCommands.find((cmd) => spokenText.includes(cmd.phrase.toLowerCase()))

    if (matchedCommand) {
      setLastCommand(matchedCommand.phrase)
      onCommand({
        command: matchedCommand.phrase,
        action: matchedCommand.action,
        parameters: matchedCommand.parameters,
      })

      // Provide voice feedback
      if (voiceEnabled) {
        const utterance = new SpeechSynthesisUtterance(`Executing ${matchedCommand.phrase}`)
        utterance.volume = 0.5
        utterance.rate = 1.2
        speechSynthesis.speak(utterance)
      }

      // Clear the command after a delay
      setTimeout(() => {
        setLastCommand(null)
        setTranscript("")
      }, 3000)
    }
  }

  const toggleListening = () => {
    if (!isSupported) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  const toggleVoiceFeedback = () => {
    setVoiceEnabled(!voiceEnabled)
  }

  if (!isARActive) return null

  return (
    <div className="fixed bottom-24 right-6 z-40 w-80">
      <Card className="bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">Voice Commands</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleVoiceFeedback} className="text-white hover:bg-white/20">
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Voice Control Button */}
          <div className="text-center mb-4">
            <Button
              onClick={toggleListening}
              disabled={!isSupported}
              className={`w-16 h-16 rounded-full ${
                isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <p className="text-white text-sm mt-2">{isListening ? "Listening..." : "Tap to speak"}</p>
          </div>

          {/* Current Transcript */}
          {transcript && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <p className="text-white text-sm">{transcript}</p>
              {confidence > 0 && (
                <Badge className="mt-2 bg-white/20 text-white">Confidence: {Math.round(confidence * 100)}%</Badge>
              )}
            </div>
          )}

          {/* Last Command */}
          {lastCommand && (
            <div className="mb-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-sm font-medium">✓ {lastCommand}</p>
            </div>
          )}

          {/* Available Commands */}
          <div className="space-y-2">
            <h4 className="text-white text-sm font-medium">Available Commands:</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {voiceCommands.slice(0, 8).map((cmd, index) => (
                <div key={index} className="text-white/70 text-xs p-2 bg-white/5 rounded">
                  "{cmd.phrase}"
                </div>
              ))}
            </div>
            <p className="text-white/50 text-xs">{voiceCommands.length - 8} more commands available...</p>
          </div>

          {/* Status */}
          <div className="mt-4 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Status:</span>
              <Badge variant={isSupported ? "default" : "secondary"}>{isSupported ? "Ready" : "Not Supported"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
