"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Cloud, CloudOff, FolderSyncIcon as Sync, Check, AlertCircle, Upload, Smartphone, Monitor } from "lucide-react"

interface SyncItem {
  id: string
  name: string
  type: "session" | "model" | "settings"
  size: string
  lastModified: Date
  syncStatus: "synced" | "pending" | "error" | "syncing"
  devices: string[]
}

interface CloudSyncProps {
  userId: string
  isOnline: boolean
}

export default function CloudSync({ userId, isOnline }: CloudSyncProps) {
  const [syncItems, setSyncItems] = useState<SyncItem[]>([
    {
      id: "1",
      name: "Living Room Setup",
      type: "session",
      size: "2.4 MB",
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
      syncStatus: "synced",
      devices: ["iPhone", "MacBook"],
    },
    {
      id: "2",
      name: "Custom Bookshelf",
      type: "model",
      size: "5.1 MB",
      lastModified: new Date(Date.now() - 30 * 60 * 1000),
      syncStatus: "pending",
      devices: ["iPhone"],
    },
    {
      id: "3",
      name: "User Preferences",
      type: "settings",
      size: "0.1 MB",
      lastModified: new Date(Date.now() - 5 * 60 * 1000),
      syncStatus: "syncing",
      devices: ["iPhone", "MacBook", "iPad"],
    },
  ])

  const [syncProgress, setSyncProgress] = useState(0)
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(true)
  const [storageUsed, setStorageUsed] = useState(45) // percentage

  useEffect(() => {
    if (isAutoSyncEnabled && isOnline) {
      const interval = setInterval(() => {
        syncPendingItems()
      }, 30000) // Sync every 30 seconds

      return () => clearInterval(interval)
    }
  }, [isAutoSyncEnabled, isOnline])

  const syncPendingItems = async () => {
    const pendingItems = syncItems.filter((item) => item.syncStatus === "pending")

    for (const item of pendingItems) {
      setSyncItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, syncStatus: "syncing" } : i)))

      // Simulate sync progress
      for (let progress = 0; progress <= 100; progress += 20) {
        setSyncProgress(progress)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      setSyncItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, syncStatus: "synced" } : i)))
    }

    setSyncProgress(0)
  }

  const forceSyncItem = async (itemId: string) => {
    setSyncItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, syncStatus: "syncing" } : item)))

    // Simulate sync
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSyncItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, syncStatus: "synced" } : item)))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <Check className="h-4 w-4 text-green-500" />
      case "pending":
        return <Upload className="h-4 w-4 text-yellow-500" />
      case "syncing":
        return <Sync className="h-4 w-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Cloud className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "syncing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("Android")) {
      return <Smartphone className="h-3 w-3" />
    }
    return <Monitor className="h-3 w-3" />
  }

  const formatLastModified = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            {isOnline ? (
              <Cloud className="h-5 w-5 mr-2 text-blue-600" />
            ) : (
              <CloudOff className="h-5 w-5 mr-2 text-gray-400" />
            )}
            Cloud Sync
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={isOnline ? "default" : "secondary"}>{isOnline ? "Online" : "Offline"}</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoSyncEnabled(!isAutoSyncEnabled)}
              disabled={!isOnline}
            >
              Auto-sync: {isAutoSyncEnabled ? "On" : "Off"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Storage Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Storage Used</span>
            <span className="text-sm text-gray-600">{storageUsed}% of 5GB</span>
          </div>
          <Progress value={storageUsed} className="h-2" />
        </div>

        {/* Sync Progress */}
        {syncProgress > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Syncing...</span>
              <span className="text-sm text-gray-600">{syncProgress}%</span>
            </div>
            <Progress value={syncProgress} className="h-2" />
          </div>
        )}

        {/* Sync Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Sync Items</h4>
            <Button variant="outline" size="sm" onClick={syncPendingItems} disabled={!isOnline}>
              <Sync className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>

          {syncItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(item.syncStatus)}
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.type}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(item.syncStatus)}`}>{item.syncStatus}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{item.size}</span>
                <span>{formatLastModified(item.lastModified)}</span>
                <div className="flex items-center space-x-1">
                  {item.devices.map((device, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      {getDeviceIcon(device)}
                      <span className="text-xs">{device}</span>
                    </div>
                  ))}
                </div>
                {item.syncStatus === "pending" && (
                  <Button variant="ghost" size="sm" onClick={() => forceSyncItem(item.id)} disabled={!isOnline}>
                    <Upload className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sync Settings */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Sync Settings</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Sync AR Sessions</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sync 3D Models</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sync User Preferences</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sync on Mobile Data</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
