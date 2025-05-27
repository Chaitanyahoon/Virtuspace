"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Heart, Download, Share2, User, Crown, CheckCircle } from "lucide-react"

interface Notification {
  id: string
  type: "like" | "download" | "share" | "follow" | "system" | "achievement"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  avatar?: string
}

interface NotificationSystemProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationSystem({ isOpen, onClose }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      title: "New Like",
      message: "Sarah liked your 'Modern Living Room' AR session",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionUrl: "/dashboard",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      type: "download",
      title: "Model Downloaded",
      message: "Your 'Executive Chair' model was downloaded 50 times today",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've reached 1000 total views across all your AR sessions",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "4",
      type: "follow",
      title: "New Follower",
      message: "Alex started following you",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "5",
      type: "system",
      title: "New Premium Features",
      message: "Check out our new AI surface detection and advanced materials",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "download":
        return <Download className="h-4 w-4 text-blue-500" />
      case "share":
        return <Share2 className="h-4 w-4 text-green-500" />
      case "follow":
        return <User className="h-4 w-4 text-purple-500" />
      case "achievement":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "system":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-4 top-16 w-full max-w-sm">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span className="font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${
                        notification.read ? "border-transparent" : "border-purple-500 bg-purple-50/50"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.avatar ? (
                            <img
                              src={notification.avatar || "/placeholder.svg"}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm font-medium ${notification.read ? "text-gray-900" : "text-gray-900"}`}
                            >
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className={`text-sm ${notification.read ? "text-gray-600" : "text-gray-700"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
