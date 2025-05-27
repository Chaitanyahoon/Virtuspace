import { type NextRequest, NextResponse } from "next/server"

// Mock data for 3D models
const models = [
  {
    id: "1",
    name: "Modern Sofa",
    description: "A comfortable modern sofa perfect for living rooms",
    category: "Furniture",
    price: 0,
    creator: "DesignStudio",
    fileUrl: "/assets/3d/duck.glb", // Using the built-in duck model as placeholder
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    tags: ["modern", "sofa", "living room"],
    downloads: 1200,
    likes: 234,
    rating: 4.8,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    category: "Furniture",
    price: 15.99,
    creator: "WorkspaceDesign",
    fileUrl: "/assets/3d/duck.glb",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    tags: ["office", "chair", "ergonomic"],
    downloads: 890,
    likes: 189,
    rating: 4.6,
    createdAt: "2024-01-14T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  let filteredModels = [...models]

  // Filter by category
  if (category && category !== "All") {
    filteredModels = filteredModels.filter((model) => model.category === category)
  }

  // Filter by search query
  if (search) {
    filteredModels = filteredModels.filter(
      (model) =>
        model.name.toLowerCase().includes(search.toLowerCase()) ||
        model.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
    )
  }

  // Pagination
  const paginatedModels = filteredModels.slice(offset, offset + limit)

  return NextResponse.json({
    models: paginatedModels,
    total: filteredModels.length,
    hasMore: offset + limit < filteredModels.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const file = formData.get("file") as File

    if (!name || !file) {
      return NextResponse.json({ success: false, message: "Name and file are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Validate the file type and size
    // 2. Upload the file to cloud storage
    // 3. Save model metadata to database
    // 4. Generate thumbnails

    const newModel = {
      id: Date.now().toString(),
      name,
      description: description || "",
      category: category || "Other",
      price: 0,
      creator: "Current User", // Would get from auth
      fileUrl: "/assets/3d/duck.glb", // Placeholder
      thumbnailUrl: "/placeholder.svg?height=200&width=300",
      tags: [],
      downloads: 0,
      likes: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      model: newModel,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 })
  }
}
