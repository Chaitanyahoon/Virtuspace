"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Eye, Heart, Download, Users, Clock, Globe, Smartphone, Monitor, Tablet } from "lucide-react"

const viewsData = [
  { name: "Mon", views: 120, likes: 45, downloads: 12 },
  { name: "Tue", views: 180, likes: 67, downloads: 18 },
  { name: "Wed", views: 240, likes: 89, downloads: 24 },
  { name: "Thu", views: 200, likes: 78, downloads: 20 },
  { name: "Fri", views: 320, likes: 112, downloads: 35 },
  { name: "Sat", views: 280, likes: 98, downloads: 28 },
  { name: "Sun", views: 220, likes: 82, downloads: 22 },
]

const deviceData = [
  { name: "Mobile", value: 65, color: "#8B5CF6" },
  { name: "Desktop", value: 25, color: "#06B6D4" },
  { name: "Tablet", value: 10, color: "#10B981" },
]

const geographyData = [
  { country: "United States", views: 1240, percentage: 35 },
  { country: "United Kingdom", views: 890, percentage: 25 },
  { country: "Germany", views: 567, percentage: 16 },
  { country: "France", views: 445, percentage: 12 },
  { country: "Japan", views: 334, percentage: 9 },
  { country: "Others", views: 124, percentage: 3 },
]

const topModels = [
  { name: "Executive Chair", views: 2340, likes: 456, downloads: 123, category: "Furniture" },
  { name: "Modern Sofa", views: 1890, likes: 378, downloads: 98, category: "Furniture" },
  { name: "Designer Lamp", views: 1567, likes: 289, downloads: 76, category: "Lighting" },
  { name: "Coffee Table", views: 1234, likes: 234, downloads: 65, category: "Furniture" },
  { name: "Plant Collection", views: 987, likes: 198, downloads: 54, category: "Plants" },
]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "Mobile":
        return <Smartphone className="h-4 w-4" />
      case "Desktop":
        return <Monitor className="h-4 w-4" />
      case "Tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold">12.4K</p>
                <p className="text-purple-200 text-xs flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23% from last week
                </p>
              </div>
              <Eye className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Likes</p>
                <p className="text-3xl font-bold">3.2K</p>
                <p className="text-blue-200 text-xs flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% from last week
                </p>
              </div>
              <Heart className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Downloads</p>
                <p className="text-3xl font-bold">1.8K</p>
                <p className="text-green-200 text-xs flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +31% from last week
                </p>
              </div>
              <Download className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold">892</p>
                <p className="text-orange-200 text-xs flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last week
                </p>
              </div>
              <Users className="h-10 w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="likes" stroke="#06B6D4" strokeWidth={2} />
                  <Line type="monotone" dataKey="downloads" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Like Rate</span>
                    <span className="text-sm text-gray-600">25.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25.8%" }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Download Rate</span>
                    <span className="text-sm text-gray-600">14.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "14.5%" }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Share Rate</span>
                    <span className="text-sm text-gray-600">8.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "8.2%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">4m 32s</div>
                    <p className="text-sm text-gray-600">Average session duration</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>0-1 min</span>
                      <span>15%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>1-3 min</span>
                      <span>35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>3-5 min</span>
                      <span>30%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>5+ min</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {deviceData.map((device) => (
                    <div key={device.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getDeviceIcon(device.name)}
                        <span className="text-sm">{device.name}</span>
                      </div>
                      <span className="text-sm font-medium">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographyData.map((country) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{country.views}</span>
                        <Badge variant="outline">{country.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topModels.map((model, index) => (
                  <div key={model.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                      <div>
                        <h4 className="font-semibold">{model.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {model.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{model.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{model.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{model.downloads}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">1.2s</div>
                <p className="text-sm text-gray-600">Avg Load Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-sm text-gray-600">Uptime</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">156</div>
                <p className="text-sm text-gray-600">Concurrent Users</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
