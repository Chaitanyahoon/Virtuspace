// Statistics tracking system for VirtuSpace
// Stores real user data in localStorage

export interface ARSession {
  id: string
  name: string
  models: string[]
  createdAt: string
  duration: number // in seconds
  screenshotsTaken: number
  isPublic: boolean
}

export interface UserStats {
  totalSessions: number
  totalModelsPlaced: number
  totalScreenshots: number
  totalDuration: number // in seconds
  sessions: ARSession[]
}

const STORAGE_KEY = 'virtuspace_stats'

// Get all statistics
export function getStats(): UserStats {
  if (typeof window === 'undefined') {
    return getDefaultStats()
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return getDefaultStats()
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error loading stats:', error)
    return getDefaultStats()
  }
}

// Save statistics
export function saveStats(stats: UserStats): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch (error) {
    console.error('Error saving stats:', error)
  }
}

// Create new AR session
export function createSession(name: string): ARSession {
  return {
    id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    models: [],
    createdAt: new Date().toISOString(),
    duration: 0,
    screenshotsTaken: 0,
    isPublic: false,
  }
}

// Add model to current session
export function addModelToSession(sessionId: string, modelType: string): void {
  const stats = getStats()
  const session = stats.sessions.find(s => s.id === sessionId)
  
  if (session) {
    session.models.push(modelType)
    stats.totalModelsPlaced++
    saveStats(stats)
  }
}

// Increment screenshot count
export function incrementScreenshots(sessionId: string): void {
  const stats = getStats()
  const session = stats.sessions.find(s => s.id === sessionId)
  
  if (session) {
    session.screenshotsTaken++
    stats.totalScreenshots++
    saveStats(stats)
  }
}

// Update session duration
export function updateSessionDuration(sessionId: string, duration: number): void {
  const stats = getStats()
  const session = stats.sessions.find(s => s.id === sessionId)
  
  if (session) {
    const durationDiff = duration - session.duration
    session.duration = duration
    stats.totalDuration += durationDiff
    saveStats(stats)
  }
}

// Save session
export function saveSession(session: ARSession): void {
  const stats = getStats()
  const existingIndex = stats.sessions.findIndex(s => s.id === session.id)
  
  if (existingIndex >= 0) {
    stats.sessions[existingIndex] = session
  } else {
    stats.sessions.push(session)
    stats.totalSessions++
  }
  
  saveStats(stats)
}

// Delete session
export function deleteSession(sessionId: string): void {
  const stats = getStats()
  stats.sessions = stats.sessions.filter(s => s.id !== sessionId)
  stats.totalSessions = stats.sessions.length
  saveStats(stats)
}

// Toggle session visibility
export function toggleSessionVisibility(sessionId: string): void {
  const stats = getStats()
  const session = stats.sessions.find(s => s.id === sessionId)
  
  if (session) {
    session.isPublic = !session.isPublic
    saveStats(stats)
  }
}

// Get default stats
function getDefaultStats(): UserStats {
  return {
    totalSessions: 0,
    totalModelsPlaced: 0,
    totalScreenshots: 0,
    totalDuration: 0,
    sessions: [],
  }
}

// Format duration for display
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

// Get session summary
export function getSessionSummary(sessionId: string): ARSession | null {
  const stats = getStats()
  return stats.sessions.find(s => s.id === sessionId) || null
}
