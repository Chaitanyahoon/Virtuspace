
export interface Session {
  id: number
  name: string
  models: string[]
  createdAt: string
  isPublic: boolean
  likes: number
  views: number
}

export interface DashboardStats {
  totalSessions: number
  totalViews: number
  totalLikes: number
  modelsUsed: number
}

const DEFAULT_SESSIONS: Session[] = [
  {
    id: 1,
    name: "Living Room Setup",
    models: ["Sofa", "Coffee Table", "Lamp"],
    createdAt: "2024-01-15",
    isPublic: true,
    likes: 24,
    views: 156,
  },
  {
    id: 2,
    name: "Office Design",
    models: ["Desk", "Chair", "Plant"],
    createdAt: "2024-01-14",
    isPublic: false,
    likes: 0,
    views: 12,
  },
  {
    id: 3,
    name: "Bedroom Makeover",
    models: ["Bed", "Nightstand", "Dresser"],
    createdAt: "2024-01-12",
    isPublic: true,
    likes: 18,
    views: 89,
  },
]

const DEFAULT_STATS: DashboardStats = {
  totalSessions: 12,
  totalViews: 1247,
  totalLikes: 342,
  modelsUsed: 26,
}

export const storage = {
  getSessions: (): Session[] => {
    if (typeof window === "undefined") return DEFAULT_SESSIONS
    const stored = localStorage.getItem("virtuspace_sessions")
    if (!stored) {
      localStorage.setItem("virtuspace_sessions", JSON.stringify(DEFAULT_SESSIONS))
      return DEFAULT_SESSIONS
    }
    return JSON.parse(stored)
  },

  addSession: (session: Omit<Session, "id" | "createdAt" | "likes" | "views">) => {
    const sessions = storage.getSessions()
    const newSession: Session = {
      ...session,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0,
      views: 0,
    }
    const updated = [newSession, ...sessions]
    localStorage.setItem("virtuspace_sessions", JSON.stringify(updated))
    return newSession
  },

  deleteSession: (id: number) => {
    const sessions = storage.getSessions()
    const updated = sessions.filter((s) => s.id !== id)
    localStorage.setItem("virtuspace_sessions", JSON.stringify(updated))
    return updated
  },

  getStats: (): DashboardStats => {
    if (typeof window === "undefined") return DEFAULT_STATS
    const stored = localStorage.getItem("virtuspace_stats")
    if (!stored) {
      localStorage.setItem("virtuspace_stats", JSON.stringify(DEFAULT_STATS))
      return DEFAULT_STATS
    }
    return JSON.parse(stored)
  },

  updateStats: (stats: Partial<DashboardStats>) => {
    const current = storage.getStats()
    const updated = { ...current, ...stats }
    localStorage.setItem("virtuspace_stats", JSON.stringify(updated))
    return updated
  },
}
