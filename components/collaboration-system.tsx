"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Copy, UserPlus, Crown, Mic, MicOff, Video, VideoOff, MessageCircle } from "lucide-react"

interface Collaborator {
  id: string
  name: string
  avatar: string
  role: "owner" | "editor" | "viewer"
  isOnline: boolean
  cursor?: { x: number; y: number }
  selectedObject?: string
}

interface CollaborationSystemProps {
  sessionId: string
  isHost: boolean
  onInviteUser: (email: string) => void
  onUpdatePermissions: (userId: string, role: string) => void
}

export default function CollaborationSystem({
  sessionId,
  isHost,
  onInviteUser,
  onUpdatePermissions,
}: CollaborationSystemProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "You",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "owner",
      isOnline: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "editor",
      isOnline: true,
      cursor: { x: 150, y: 200 },
      selectedObject: "chair-executive",
    },
    {
      id: "3",
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "viewer",
      isOnline: false,
    },
  ])

  const [inviteEmail, setInviteEmail] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const shareUrl = `${window.location.origin}/ar/collaborate/${sessionId}`

  const handleInvite = () => {
    if (inviteEmail) {
      onInviteUser(inviteEmail)
      setInviteEmail("")
      setShowInviteDialog(false)
    }
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert("Share link copied to clipboard!")
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-500"
      case "editor":
        return "bg-blue-500"
      case "viewer":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-3 w-3" />
      case "editor":
        return <UserPlus className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="fixed top-20 right-6 z-40 w-80">
      <Card className="bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Collaboration ({collaborators.filter((c) => c.isOnline).length} online)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Collaborators List */}
          <div className="space-y-2">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center space-x-3 p-2 rounded-lg bg-white/10">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      collaborator.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm font-medium">{collaborator.name}</span>
                    <Badge className={`${getRoleColor(collaborator.role)} text-white text-xs px-2 py-0`}>
                      {getRoleIcon(collaborator.role)}
                      <span className="ml-1">{collaborator.role}</span>
                    </Badge>
                  </div>
                  {collaborator.selectedObject && (
                    <p className="text-white/70 text-xs">Editing: {collaborator.selectedObject}</p>
                  )}
                </div>
                {isHost && collaborator.id !== "1" && (
                  <select
                    value={collaborator.role}
                    onChange={(e) => onUpdatePermissions(collaborator.id, e.target.value)}
                    className="text-xs bg-white/20 text-white rounded px-2 py-1"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                  </select>
                )}
              </div>
            ))}
          </div>

          {/* Communication Controls */}
          <div className="flex space-x-2">
            <Button
              variant={isVoiceEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className="flex-1 border-white/20 text-white"
            >
              {isVoiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              variant={isVideoEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className="flex-1 border-white/20 text-white"
            >
              {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
            <Button
              variant={showChat ? "default" : "outline"}
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="flex-1 border-white/20 text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Invite Controls */}
          {isHost && (
            <div className="space-y-2">
              {!showInviteDialog ? (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowInviteDialog(true)}
                    className="flex-1 border-white/20 text-white"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyShareLink} className="border-white/20 text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleInvite} className="flex-1">
                      Send Invite
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowInviteDialog(false)}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Session Info */}
          <div className="text-xs text-white/70 space-y-1">
            <p>Session ID: {sessionId}</p>
            <p>Real-time sync enabled</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
