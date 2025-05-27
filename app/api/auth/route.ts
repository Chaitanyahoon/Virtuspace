import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, name } = body

    // Simulate authentication logic
    if (action === "signin") {
      // Validate credentials
      if (email && password) {
        // In a real app, verify against database
        const user = {
          id: "1",
          email,
          name: "John Doe",
          avatar: "/placeholder.svg?height=32&width=32",
        }

        return NextResponse.json({
          success: true,
          user,
          token: "mock-jwt-token",
        })
      }
    }

    if (action === "signup") {
      // Create new user
      if (email && password && name) {
        const user = {
          id: Date.now().toString(),
          email,
          name,
          avatar: "/placeholder.svg?height=32&width=32",
        }

        return NextResponse.json({
          success: true,
          user,
          token: "mock-jwt-token",
        })
      }
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
