import { type NextRequest, NextResponse } from "next/server"

// Mock data for AR sessions
const sessions = [
  {
    id: "1",
    name: "Living Room Setup",
    description: "Modern living room with sofa and coffee table",
    models: [
      { id: "1", name: "Modern Sofa", position: [0, 0, -2], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { id: "2", name: "Coffee Table", position: [0, -0.5, -1], rotation: [0, 0, 0], scale: [0.8, 0.8, 0.8] },
    ],
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    isPublic: true,
    userId: "1",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    views: 156,
    likes: 24,
  },
  {
    id: "2",
    name: "Office Design",
    description: "Minimalist office setup",
    models: [
      { id: "3", name: "Desk", position: [0, 0, -2], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { id: "4", name: "Office Chair", position: [0, 0, -1], rotation: [0, Math.PI, 0], scale: [1, 1, 1] },
    ],
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    userId: "1",
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
    views: 12,
    likes: 0,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const isPublic = searchParams.get("public")

  let filteredSessions = [...sessions]

  // Filter by user
  if (userId) {
    filteredSessions = filteredSessions.filter((session) => session.userId === userId)
  }

  // Filter by public status
  if (isPublic === "true") {
    filteredSessions = filteredSessions.filter((session) => session.isPublic)
  }

  return NextResponse.json({
    sessions: filteredSessions,
    total: filteredSessions.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, models, isPublic = true } = body

    if (!name || !models || models.length === 0) {
      return NextResponse.json({ success: false, message: "Name and models are required" }, { status: 400 })
    }

    const newSession = {
      id: Date.now().toString(),
      name,
      description: description || "",
      models,
      thumbnailUrl: "/placeholder.svg?height=200&width=300",
      isPublic,
      userId: "1", // Would get from auth
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    }

    return NextResponse.json({
      success: true,
      session: newSession,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save session" }, { status: 500 })
  }
}
