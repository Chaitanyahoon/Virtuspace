"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Box, Sphere, Cone, Text, Cylinder } from "@react-three/drei"
import * as THREE from "three"

interface ARSceneProps {
  selectedModel: string | null
  transform: {
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
  }
  onTransformChange: (transform: any) => void
  useGridView?: boolean
}

// Diverse model configurations with unique furniture pieces
const modelConfigs = {
  // Seating Variety
  "chair-lounge": {
    name: "Modern Lounge Chair",
    colors: { seat: "#2C5F2D", back: "#2C5F2D", legs: "#D4AF37", accent: "#1C1C1C" },
    materials: { metallic: 0.2, roughness: 0.7, fabric: true },
  },
  "chair-bean-bag": {
    name: "Bean Bag Chair",
    colors: { seat: "#FF6B6B", back: "#FF6B6B", legs: "#FF6B6B", accent: "#C92A2A" },
    materials: { metallic: 0.0, roughness: 0.9, fabric: true },
  },
  "chair-rocking": {
    name: "Rocking Chair",
    colors: { seat: "#8B4513", back: "#A0522D", legs: "#654321", accent: "#DEB887" },
    materials: { metallic: 0.1, roughness: 0.5, wood: true },
  },
  "chair-stool": {
    name: "Office Stool",
    colors: { seat: "#1C1C1C", back: "#1C1C1C", legs: "#C0C0C0", accent: "#4A90E2" },
    materials: { metallic: 0.8, roughness: 0.2, modern: true },
  },

  // Table Variety
  "table-round": {
    name: "Round Dining Table",
    colors: { top: "#654321", legs: "#2C2C2C", accent: "#8B4513" },
    materials: { metallic: 0.3, roughness: 0.4, wood: true },
  },
  "table-console": {
    name: "Console Table",
    colors: { top: "#F5F5DC", legs: "#D4AF37", accent: "#8B7355" },
    materials: { metallic: 0.5, roughness: 0.3, elegant: true },
  },
  "table-side": {
    name: "Side Table",
    colors: { top: "#2C2C2C", legs: "#FFD700", accent: "#1C1C1C" },
    materials: { metallic: 0.7, roughness: 0.2, modern: true },
  },
  "table-bar": {
    name: "Bar Table",
    colors: { top: "#1C1C1C", legs: "#C0C0C0", accent: "#4A4A4A" },
    materials: { metallic: 0.6, roughness: 0.1, industrial: true },
  },

  // Lighting Variety
  "lamp-floor": {
    name: "Arc Floor Lamp",
    colors: { base: "#8B4513", pole: "#C0C0C0", shade: "#FFFFFF" },
    materials: { metallic: 0.7, roughness: 0.2, modern: true },
  },
  "lamp-pendant": {
    name: "Pendant Light",
    colors: { shade: "#4A90E2", cord: "#2C2C2C", accent: "#1E3A8A" },
    materials: { metallic: 0.4, roughness: 0.3, glass: true },
  },
  "lamp-wall": {
    name: "Wall Sconce",
    colors: { base: "#D4AF37", pole: "#8B7355", shade: "#F5F5DC" },
    materials: { metallic: 0.8, roughness: 0.1, brass: true },
  },
  "lamp-desk": {
    name: "Desk Lamp",
    colors: { base: "#2C2C2C", pole: "#4A4A4A", shade: "#FFFFFF" },
    materials: { metallic: 0.6, roughness: 0.2, minimalist: true },
  },

  // Decor Items
  "decor-bookshelf": {
    name: "Modern Bookshelf",
    colors: { frame: "#654321", shelves: "#8B4513", accent: "#2C2C2C" },
    materials: { metallic: 0.1, roughness: 0.6, wood: true },
  },
  "decor-mirror": {
    name: "Wall Mirror",
    colors: { frame: "#D4AF37", glass: "#E8F4F8", accent: "#8B7355" },
    materials: { metallic: 0.9, roughness: 0.0, reflective: true },
  },
  "decor-rug": {
    name: "Persian Rug",
    colors: { base: "#8B0000", pattern: "#D4AF37", accent: "#2C2C2C" },
    materials: { metallic: 0.0, roughness: 0.9, fabric: true },
  },
  "decor-art": {
    name: "Wall Art",
    colors: { frame: "#1C1C1C", canvas: "#4A90E2", accent: "#FFD700" },
    materials: { metallic: 0.2, roughness: 0.7, modern: true },
  },
  "decor-sculpture": {
    name: "Abstract Sculpture",
    colors: { base: "#C0C0C0", accent: "#FFD700", detail: "#2C2C2C" },
    materials: { metallic: 0.9, roughness: 0.1, metal: true },
  },

  // Plant Variety
  "plant-cactus": {
    name: "Desert Cactus",
    colors: { pot: "#D2691E", plant: "#2E8B57", accent: "#8B4513" },
    materials: { metallic: 0.0, roughness: 0.7, desert: true },
  },
  "plant-fiddle": {
    name: "Fiddle Leaf Fig",
    colors: { pot: "#F5F5DC", plant: "#228B22", accent: "#8B7355" },
    materials: { metallic: 0.1, roughness: 0.8, tropical: true },
  },
  "plant-snake": {
    name: "Snake Plant",
    colors: { pot: "#2C2C2C", plant: "#3CB371", accent: "#1C1C1C" },
    materials: { metallic: 0.2, roughness: 0.6, modern: true },
  },
  "plant-bamboo": {
    name: "Bamboo Plant",
    colors: { pot: "#654321", plant: "#6B8E23", accent: "#8B4513" },
    materials: { metallic: 0.0, roughness: 0.8, zen: true },
  },

  // Storage Furniture
  "storage-cabinet": {
    name: "Storage Cabinet",
    colors: { body: "#2C2C2C", doors: "#1C1C1C", accent: "#D4AF37" },
    materials: { metallic: 0.4, roughness: 0.3, modern: true },
  },
  "storage-dresser": {
    name: "Dresser",
    colors: { body: "#8B4513", drawers: "#654321", accent: "#D4AF37" },
    materials: { metallic: 0.2, roughness: 0.5, wood: true },
  },
  "storage-shelf": {
    name: "Shelving Unit",
    colors: { frame: "#C0C0C0", shelves: "#654321", accent: "#2C2C2C" },
    materials: { metallic: 0.7, roughness: 0.2, industrial: true },
  },
  "storage-wardrobe": {
    name: "Wardrobe",
    colors: { body: "#F5F5DC", doors: "#DEB887", accent: "#8B7355" },
    materials: { metallic: 0.1, roughness: 0.6, classic: true },
  },

  // Sofa Variety
  "sofa-loveseat": {
    name: "Loveseat",
    colors: { fabric: "#8B008B", legs: "#2C2C2C", accent: "#D4AF37" },
    materials: { metallic: 0.1, roughness: 0.7, velvet: true },
  },
  "sofa-chaise": {
    name: "Chaise Lounge",
    colors: { fabric: "#4682B4", legs: "#C0C0C0", accent: "#1C1C1C" },
    materials: { metallic: 0.3, roughness: 0.5, modern: true },
  },

  // Fallback model
  "chair-dining": {
    name: "Dining Chair",
    colors: { seat: "#DEB887", back: "#DEB887", legs: "#8B4513", accent: "#654321" },
    materials: { metallic: 0.0, roughness: 0.6, wood: true },
  },
}

export default function ARScene({ selectedModel, transform, onTransformChange, useGridView = false }: ARSceneProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [initialTransform, setInitialTransform] = useState(transform)
  const { camera, gl, size } = useThree()

  // Real-time drag controls
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!meshRef.current) return
      setIsDragging(true)
      setDragStart({ x: event.clientX, y: event.clientY })
      setInitialTransform({ ...transform })
      gl.domElement.style.cursor = "grabbing"
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || !meshRef.current) return

      const deltaX = (event.clientX - dragStart.x) / size.width
      const deltaY = (event.clientY - dragStart.y) / size.height

      if (event.shiftKey) {
        // Rotation mode
        const newRotation = [
          initialTransform.rotation[0],
          initialTransform.rotation[1] + deltaX * Math.PI * 2,
          initialTransform.rotation[2],
        ] as [number, number, number]

        onTransformChange({
          ...transform,
          rotation: newRotation,
        })
      } else {
        // Position mode with boundary constraints
        const newX = Math.max(-5, Math.min(5, initialTransform.position[0] + deltaX * 5))
        const newY = Math.max(-2, Math.min(3, initialTransform.position[1] - deltaY * 3))
        
        const newPosition = [
          newX,
          newY,
          initialTransform.position[2],
        ] as [number, number, number]

        onTransformChange({
          ...transform,
          position: newPosition,
        })
      }
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      gl.domElement.style.cursor = "grab"
    }

    const handleWheel = (event: WheelEvent) => {
      if (!meshRef.current) return
      event.preventDefault()

      const scaleChange = event.deltaY > 0 ? -0.1 : 0.1
      const newScale = Math.max(0.1, Math.min(3, transform.scale[0] + scaleChange))

      onTransformChange({
        ...transform,
        scale: [newScale, newScale, newScale],
      })
    }

    const canvas = gl.domElement
    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerup", handlePointerUp)
    canvas.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown)
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerup", handlePointerUp)
      canvas.removeEventListener("wheel", handleWheel)
    }
  }, [
    isDragging,
    dragStart.x,
    dragStart.y,
    initialTransform,
    gl.domElement,
    size.width,
    size.height,
    onTransformChange,
    transform,
  ])

  useFrame(() => {
    if (meshRef.current && selectedModel) {
      // Apply transform directly without lerp to fix positioning bugs
      meshRef.current.position.set(...transform.position)
      meshRef.current.rotation.set(...transform.rotation)
      meshRef.current.scale.set(...transform.scale)
    }
  })

  const getModelConfig = (modelId: string) => {
    return modelConfigs[modelId as keyof typeof modelConfigs] || modelConfigs["chair-dining"]
  }

  const createMaterial = (color: string, config: any) => {
    const baseProps = {
      color,
      metalness: config.materials.metallic || 0,
      roughness: config.materials.roughness || 0.5,
    }

    // Enhanced material properties based on type
    if (config.materials.glass) {
      return { ...baseProps, transparent: true, opacity: 0.8, transmission: 0.9 }
    }
    if (config.materials.crystal) {
      return { ...baseProps, transparent: true, opacity: 0.95, transmission: 0.95, ior: 2.4 }
    }
    if (config.materials.marble) {
      return { ...baseProps, roughness: 0.05, clearcoat: 1.0, clearcoatRoughness: 0.1 }
    }
    if (config.materials.leather) {
      return { ...baseProps, roughness: 0.6, normalScale: [0.5, 0.5] }
    }
    if (config.materials.fabric) {
      return { ...baseProps, roughness: 0.8, normalScale: [0.3, 0.3] }
    }

    return baseProps
  }

  const renderPremiumChair = (config: any) => (
    <group ref={meshRef}>
      {/* Enhanced chair with premium details */}
      <Box args={[1.1, 0.12, 1.1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.seat, config)} />
      </Box>
      <Box args={[1.1, 1.2, 0.12]} position={[0, 1.1, -0.49]}>
        <meshStandardMaterial {...createMaterial(config.colors.back, config)} />
      </Box>
      {/* Premium legs with details */}
      {[
        [-0.45, 0, -0.45],
        [0.45, 0, -0.45],
        [-0.45, 0, 0.45],
        [0.45, 0, 0.45],
      ].map((pos, i) => (
        <Cylinder key={i} args={[0.06, 0.06, 1]} position={pos}>
          <meshStandardMaterial {...createMaterial(config.colors.legs, config)} />
        </Cylinder>
      ))}
      {/* Accent details */}
      <Box args={[1.2, 0.05, 1.2]} position={[0, 0.45, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
      </Box>
      <Text position={[0, 2, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
        {config.name}
      </Text>
    </group>
  )

  const renderPremiumTable = (config: any) => (
    <group ref={meshRef}>
      <Box args={[2.2, 0.15, 1.2]} position={[0, 0.75, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.top, config)} />
      </Box>
      {/* Premium table legs */}
      {[
        [-1, 0, -0.5],
        [1, 0, -0.5],
        [-1, 0, 0.5],
        [1, 0, 0.5],
      ].map((pos, i) => (
        <Cylinder key={i} args={[0.08, 0.08, 1.5]} position={pos}>
          <meshStandardMaterial {...createMaterial(config.colors.legs, config)} />
        </Cylinder>
      ))}
      {/* Accent trim */}
      <Box args={[2.3, 0.08, 1.3]} position={[0, 0.68, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
      </Box>
      <Text position={[0, 1.3, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
        {config.name}
      </Text>
    </group>
  )

  const renderPremiumLamp = (config: any) => (
    <group ref={meshRef}>
      {/* Premium lamp base */}
      <Cylinder args={[0.4, 0.4, 0.6]} position={[0, 0.3, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.base, config)} />
      </Cylinder>
      {/* Premium pole */}
      <Cylinder args={[0.06, 0.06, 1.8]} position={[0, 1.2, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.pole, config)} />
      </Cylinder>
      {/* Premium shade */}
      <Cone args={[0.6, 0.8, 12]} position={[0, 2.1, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.shade, config)} />
      </Cone>
      {/* Enhanced lighting effects */}
      <pointLight position={[0, 2.1, 0]} intensity={1.2} color="#FFF8DC" castShadow />
      <spotLight position={[0, 2.5, 0]} intensity={0.8} angle={Math.PI / 3} penumbra={0.5} castShadow />
      {/* Accent details */}
      <Cylinder args={[0.45, 0.45, 0.1]} position={[0, 0.65, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
      </Cylinder>
      <Text position={[0, 2.8, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
        {config.name}
      </Text>
    </group>
  )

  const renderPremiumPlant = (config: any) => (
    <group ref={meshRef}>
      {/* Premium ceramic pot */}
      <Cylinder args={[0.35, 0.4, 0.5]} position={[0, 0.25, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.pot, config)} />
      </Cylinder>
      {/* Decorative rim */}
      <Cylinder args={[0.42, 0.42, 0.08]} position={[0, 0.52, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
      </Cylinder>
      {/* Plant stem */}
      <Cylinder args={[0.06, 0.06, 1]} position={[0, 1, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.plant, config)} />
      </Cylinder>
      {/* Premium foliage */}
      {[
        [0.25, 1.2, 0.15],
        [-0.25, 1.3, -0.15],
        [0.15, 1.4, 0.25],
        [-0.15, 1.5, -0.25],
        [0.3, 1.1, -0.1],
        [-0.3, 1.6, 0.1],
      ].map((pos, i) => (
        <Sphere key={i} args={[0.18]} position={pos}>
          <meshStandardMaterial {...createMaterial(config.colors.plant, config)} />
        </Sphere>
      ))}
      <Text position={[0, 2, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
        {config.name}
      </Text>
    </group>
  )

  const renderPremiumSofa = (config: any) => (
    <group ref={meshRef}>
      {/* Premium sofa base with enhanced details */}
      <Box args={[2.8, 0.5, 1.2]} position={[0, 0.25, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.fabric, config)} />
      </Box>
      {/* Premium back cushions */}
      <Box args={[2.8, 1, 0.25]} position={[0, 0.75, -0.475]}>
        <meshStandardMaterial {...createMaterial(config.colors.fabric, config)} />
      </Box>
      {/* Premium armrests */}
      <Box args={[0.25, 0.8, 1.2]} position={[-1.275, 0.65, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.fabric, config)} />
      </Box>
      <Box args={[0.25, 0.8, 1.2]} position={[1.275, 0.65, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.fabric, config)} />
      </Box>
      {/* Premium legs */}
      {[
        [-1.2, -0.2, -0.5],
        [1.2, -0.2, -0.5],
        [-1.2, -0.2, 0.5],
        [1.2, -0.2, 0.5],
      ].map((pos, i) => (
        <Cylinder key={i} args={[0.08, 0.08, 0.4]} position={pos}>
          <meshStandardMaterial {...createMaterial(config.colors.legs, config)} />
        </Cylinder>
      ))}
      {/* Accent piping */}
      <Box args={[2.9, 0.05, 1.3]} position={[0, 0.52, 0]}>
        <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
      </Box>
      <Text position={[0, 1.5, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
        {config.name}
      </Text>
    </group>
  )

  if (!selectedModel) return null

  const config = getModelConfig(selectedModel)

  const renderDecorItem = (config: any) => {
    const modelType = selectedModel?.split("-")[1]
    
    if (modelType === "bookshelf") {
      return (
        <group ref={meshRef}>
          {/* Bookshelf frame */}
          <Box args={[1.5, 2, 0.4]} position={[0, 1, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.frame, config)} />
          </Box>
          {/* Shelves */}
          {[0.3, 0.9, 1.5].map((y, i) => (
            <Box key={i} args={[1.4, 0.05, 0.38]} position={[0, y, 0]}>
              <meshStandardMaterial {...createMaterial(config.colors.shelves, config)} />
            </Box>
          ))}
          <Text position={[0, 2.3, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    } else if (modelType === "mirror") {
      return (
        <group ref={meshRef}>
          {/* Mirror frame */}
          <Box args={[1.2, 1.8, 0.1]} position={[0, 1, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.frame, config)} />
          </Box>
          {/* Reflective surface */}
          <Box args={[1, 1.6, 0.05]} position={[0, 1, 0.06]}>
            <meshStandardMaterial {...createMaterial(config.colors.glass, config)} />
          </Box>
          <Text position={[0, 2.2, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    } else if (modelType === "rug") {
      return (
        <group ref={meshRef}>
          {/* Rug base */}
          <Box args={[2.5, 0.05, 1.8]} position={[0, 0.025, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.base, config)} />
          </Box>
          {/* Pattern details */}
          <Box args={[2.2, 0.06, 1.5]} position={[0, 0.06, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.pattern, config)} />
          </Box>
          <Text position={[0, 0.3, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    } else if (modelType === "art") {
      return (
        <group ref={meshRef}>
          {/* Frame */}
          <Box args={[1.2, 1.5, 0.08]} position={[0, 1, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.frame, config)} />
          </Box>
          {/* Canvas */}
          <Box args={[1, 1.3, 0.05]} position={[0, 1, 0.07]}>
            <meshStandardMaterial {...createMaterial(config.colors.canvas, config)} />
          </Box>
          <Text position={[0, 2, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    } else if (modelType === "sculpture") {
      return (
        <group ref={meshRef}>
          {/* Abstract sculpture */}
          <Sphere args={[0.4]} position={[0, 0.6, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.base, config)} />
          </Sphere>
          <Box args={[0.3, 0.8, 0.3]} position={[0, 1.2, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
          </Box>
          <Cone args={[0.25, 0.5]} position={[0, 1.8, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.detail, config)} />
          </Cone>
          <Text position={[0, 2.3, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    }
    return null
  }

  const renderStorageFurniture = (config: any) => {
    const modelType = selectedModel?.split("-")[1]
    
    if (modelType === "cabinet") {
      return (
        <group ref={meshRef}>
          {/* Cabinet body */}
          <Box args={[1.5, 1.2, 0.6]} position={[0, 0.6, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.body, config)} />
          </Box>
          {/* Doors */}
          <Box args={[0.72, 1.1, 0.05]} position={[-0.36, 0.6, 0.33]}>
            <meshStandardMaterial {...createMaterial(config.colors.doors, config)} />
          </Box>
          <Box args={[0.72, 1.1, 0.05]} position={[0.36, 0.6, 0.33]}>
            <meshStandardMaterial {...createMaterial(config.colors.doors, config)} />
          </Box>
          {/* Handles */}
          <Cylinder args={[0.02, 0.02, 0.08]} rotation={[0, 0, Math.PI / 2]} position={[-0.5, 0.6, 0.38]}>
            <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
          </Cylinder>
          <Cylinder args={[0.02, 0.02, 0.08]} rotation={[0, 0, Math.PI / 2]} position={[0.5, 0.6, 0.38]}>
            <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
          </Cylinder>
          <Text position={[0, 1.5, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    } else if (modelType === "dresser") {
      return (
        <group ref={meshRef}>
          {/* Dresser body */}
          <Box args={[1.8, 1, 0.6]} position={[0, 0.5, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.body, config)} />
          </Box>
          {/* Drawers */}
          {[0.25, 0.5, 0.75].map((y, i) => (
            <Box key={i} args={[1.7, 0.22, 0.05]} position={[0, y, 0.33]}>
              <meshStandardMaterial {...createMaterial(config.colors.drawers, config)} />
            </Box>
          ))}
          {/* Handles */}
          {[0.25, 0.5, 0.75].map((y, i) => (
            <Cylinder key={i} args={[0.02, 0.02, 0.1]} rotation={[0, 0, Math.PI / 2]} position={[0, y, 0.38]}>
              <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
            </Cylinder>
          ))}
          <Text position={[0, 1.3, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    } else if (modelType === "shelf") {
      return (
        <group ref={meshRef}>
          {/* Frame */}
          <Box args={[0.1, 2, 0.4]} position={[-0.7, 1, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.frame, config)} />
          </Box>
          <Box args={[0.1, 2, 0.4]} position={[0.7, 1, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.frame, config)} />
          </Box>
          {/* Shelves */}
          {[0.4, 0.9, 1.4, 1.9].map((y, i) => (
            <Box key={i} args={[1.5, 0.05, 0.4]} position={[0, y, 0]}>
              <meshStandardMaterial {...createMaterial(config.colors.shelves, config)} />
            </Box>
          ))}
          <Text position={[0, 2.3, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    } else if (modelType === "wardrobe") {
      return (
        <group ref={meshRef}>
          {/* Wardrobe body */}
          <Box args={[2, 2.2, 0.7]} position={[0, 1.1, 0]}>
            <meshStandardMaterial {...createMaterial(config.colors.body, config)} />
          </Box>
          {/* Doors */}
          <Box args={[0.95, 2.1, 0.05]} position={[-0.48, 1.1, 0.38]}>
            <meshStandardMaterial {...createMaterial(config.colors.doors, config)} />
          </Box>
          <Box args={[0.95, 2.1, 0.05]} position={[0.48, 1.1, 0.38]}>
            <meshStandardMaterial {...createMaterial(config.colors.doors, config)} />
          </Box>
          {/* Handles */}
          <Cylinder args={[0.03, 0.03, 0.1]} rotation={[0, 0, Math.PI / 2]} position={[-0.7, 1.1, 0.43]}>
            <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
          </Cylinder>
          <Cylinder args={[0.03, 0.03, 0.1]} rotation={[0, 0, Math.PI / 2]} position={[0.7, 1.1, 0.43]}>
            <meshStandardMaterial {...createMaterial(config.colors.accent, config)} />
          </Cylinder>
          <Text position={[0, 2.5, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
            {config.name}
          </Text>
        </group>
      )
    }
    return null
  }

  const renderModel = () => {
    // Render different model types
    if (selectedModel.includes("chair-")) return renderPremiumChair(config)
    if (selectedModel.includes("table-")) return renderPremiumTable(config)
    if (selectedModel.includes("lamp-")) return renderPremiumLamp(config)
    if (selectedModel.includes("plant-")) return renderPremiumPlant(config)
    if (selectedModel.includes("sofa-")) return renderPremiumSofa(config)
    if (selectedModel.includes("decor-")) return renderDecorItem(config)
    if (selectedModel.includes("storage-")) return renderStorageFurniture(config)
    return renderPremiumChair(config) // fallback
  }

  return (
    <>
      {/* Enhanced ground plane with subtle grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.02} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Subtle grid helper */}
      <gridHelper
        args={[15, 15, "#ffffff", "#ffffff"]}
        position={[0, -0.49, 0]}
        material-opacity={useGridView ? 0.3 : 0.1}
        material-transparent={true}
      />

      {renderModel()}

      {/* Enhanced lighting setup for premium materials */}
      <hemisphereLight intensity={0.5} groundColor="#444444" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight intensity={0.4} />

      {/* Additional accent lighting for premium feel */}
      <pointLight position={[-5, 5, 5]} intensity={0.3} color="#800080" />
      <pointLight position={[5, 5, -5]} intensity={0.3} color="#0000FF" />
    </>
  )
}
