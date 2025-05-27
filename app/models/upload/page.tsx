"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, CheckCircle, AlertCircle, Info } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

interface UploadedFile {
  file: File
  preview?: string
  status: "uploading" | "success" | "error"
  progress: number
}

export default function ModelUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [modelData, setModelData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    isPublic: true,
    price: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const acceptedFiles = Array.from(files).filter((file) => {
      const validTypes = [".glb", ".gltf", ".obj", ".fbx", ".png", ".jpg", ".jpeg"]
      const extension = "." + file.name.split(".").pop()?.toLowerCase()
      return validTypes.includes(extension) && file.size <= 50 * 1024 * 1024
    })

    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      status: "uploading" as const,
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((fileObj) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.file === fileObj.file ? { ...f, progress: Math.min(f.progress + 10, 100) } : f)),
        )
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.file === fileObj.file ? { ...f, status: "success", progress: 100 } : f)),
        )
      }, 2000)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleFileSelect(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles((prev) => prev.filter((f) => f.file !== fileToRemove))
  }

  const handleInputChange = (field: string, value: string) => {
    setModelData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitting model:", modelData, uploadedFiles)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload 3D Model</h1>
          <p className="text-gray-600 mt-2">Share your 3D models with the VirtuSpace community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>
                  Upload your 3D model files and preview images. Supported formats: GLB, GLTF, OBJ, FBX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-gray-300 hover:border-purple-400"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".glb,.gltf,.obj,.fbx,.png,.jpg,.jpeg"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div>
                    <p className="text-gray-600 mb-2">Drag & drop files here, or click to select files</p>
                    <p className="text-sm text-gray-500">Maximum file size: 50MB</p>
                  </div>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium">Uploaded Files</h4>
                    {uploadedFiles.map((fileObj, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0">
                          {fileObj.preview ? (
                            <img
                              src={fileObj.preview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <File className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{fileObj.file.name}</p>
                          <p className="text-xs text-gray-500">{(fileObj.file.size / 1024 / 1024).toFixed(2)} MB</p>
                          {fileObj.status === "uploading" && <Progress value={fileObj.progress} className="mt-1" />}
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-2">
                          {fileObj.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {fileObj.status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                          <button onClick={() => removeFile(fileObj.file)} className="text-gray-400 hover:text-red-500">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Model Information */}
            <Card>
              <CardHeader>
                <CardTitle>Model Information</CardTitle>
                <CardDescription>Provide details about your 3D model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Model Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter model name"
                    value={modelData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your model..."
                    value={modelData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={modelData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="decoration">Decoration</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="lighting">Lighting</SelectItem>
                        <SelectItem value="plants">Plants</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (Optional)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={modelData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="modern, chair, furniture (comma separated)"
                    value={modelData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Supported Formats</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary">.glb</Badge>
                    <Badge variant="secondary">.gltf</Badge>
                    <Badge variant="secondary">.obj</Badge>
                    <Badge variant="secondary">.fbx</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">File Size</h4>
                  <p className="text-gray-600">Maximum 50MB per file</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Quality Tips</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Optimize textures for web</li>
                    <li>• Keep polygon count reasonable</li>
                    <li>• Include preview images</li>
                    <li>• Test in AR before uploading</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public">Make Public</Label>
                    <p className="text-sm text-gray-600">Allow others to discover and use your model</p>
                  </div>
                  <input
                    type="checkbox"
                    id="public"
                    checked={modelData.isPublic}
                    onChange={(e) => handleInputChange("isPublic", e.target.checked.toString())}
                    className="rounded"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
              disabled={uploadedFiles.length === 0 || !modelData.name}
            >
              Upload Model
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
