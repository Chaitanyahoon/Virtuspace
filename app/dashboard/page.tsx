"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, ArrowRight, Clock, Eye, Heart, Trash2, Play, Sparkles, LayoutGrid, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import GlassLayout from "@/components/glass-layout"
import { storage, type Session, type DashboardStats } from "@/lib/storage"

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [stats, setStats] = useState<DashboardStats>({ totalViews: 0, totalLikes: 0, totalSessions: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setSessions(storage.getSessions())
      setStats(storage.getStats())
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleDeleteSession = (id: number) => {
    storage.deleteSession(id)
    setSessions(storage.getSessions())
    setStats(storage.getStats())
  }

  return (
    <GlassLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="text-gradient-cyan">Creator</span>
            </h1>
            <p className="text-blue-200">Ready to design your next masterpiece?</p>
          </div>
          <Link href="/ar">
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white glow-cyan animate-glow-pulse border-0">
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hero Card - Start Creating */}
          <Card className="md:col-span-2 glass-effect border-blue-500/20 relative overflow-hidden group hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-sky-500/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
            <CardContent className="p-8 relative z-10 flex flex-col justify-center h-full min-h-[240px]">
              <Badge className="w-fit mb-4 bg-blue-500/20 text-blue-200 border-blue-500/30 backdrop-blur-md">
                <Sparkles className="h-3 w-3 mr-1 text-sky-400" />
                AR Studio
              </Badge>
              <h2 className="text-3xl font-bold text-white mb-4">Bring your ideas to life in <span className="text-sky-400">Augmented Reality</span></h2>
              <p className="text-blue-100/80 mb-8 max-w-md">
                Visualize furniture, decor, and art in your real space with our advanced AR engine.
              </p>
              <div className="flex gap-4">
                <Link href="/ar">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                    <Play className="h-5 w-5 mr-2 fill-blue-900" />
                    Launch Studio
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Explore Models
                  </Button>
                </Link>
              </div>
            </CardContent>
            {/* Decorative Circle */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl group-hover:bg-sky-500/30 transition-colors" />
          </Card>

          {/* Stats Column */}
          <div className="space-y-6">
            {/* Total Views */}
            <Card className="glass-effect border-blue-500/20 hover-lift">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300 font-medium mb-1">Total Views</p>
                  <h3 className="text-3xl font-bold text-white">{isLoading ? "..." : stats.totalViews}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-sky-400" />
                </div>
              </CardContent>
            </Card>

            {/* Total Likes */}
            <Card className="glass-effect border-blue-500/20 hover-lift">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300 font-medium mb-1">Total Likes</p>
                  <h3 className="text-3xl font-bold text-white">{isLoading ? "..." : stats.totalLikes}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-pink-400" />
                </div>
              </CardContent>
            </Card>
            
             {/* Browse Gallery Card */}
             <Link href="/gallery">
              <Card className="glass-effect border-blue-500/20 hover-lift cursor-pointer group h-[100px] mt-6">
                <CardContent className="p-6 flex items-center justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">Browse Gallery</h3>
                    <p className="text-xs text-blue-300">Discover community designs</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <ImageIcon className="h-5 w-5 text-sky-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Sessions Section */}
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Clock className="h-6 w-6 mr-2 text-sky-400" />
              Recent Sessions
            </h2>
            <Button variant="ghost" className="text-blue-300 hover:text-white hover:bg-blue-500/10">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse" />
              ))}
             </div>
          ) : sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session, index) => (
                <Card key={session.id} className="glass-effect border-blue-500/20 hover-lift group" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-white group-hover:text-sky-300 transition-colors">
                        {session.name}
                      </CardTitle>
                      <Badge variant="outline" className="border-blue-500/30 text-blue-200 text-xs">
                        {session.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-300/80 mb-4">
                      {new Date(session.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {session.models.slice(0, 3).map((model) => (
                        <span key={model} className="px-2 py-1 rounded-md bg-blue-500/10 text-xs text-blue-200 border border-blue-500/20">
                          {model}
                        </span>
                      ))}
                      {session.models.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-blue-500/10 text-xs text-blue-200 border border-blue-500/20">
                          +{session.models.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={`/ar?session=${session.id}`} className="flex-1">
                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-blue-500/30">
                          Resume
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-blue-400 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-effect rounded-xl border border-blue-500/20">
              <LayoutGrid className="h-12 w-12 text-blue-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-white mb-2">No sessions yet</h3>
              <p className="text-blue-300 mb-6">Start your first AR project today</p>
              <Link href="/ar">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                  Create Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </GlassLayout>
  )
}
