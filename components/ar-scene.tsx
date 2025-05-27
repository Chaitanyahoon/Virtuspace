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
}

// Enhanced model configurations with ultra-realistic materials
const modelConfigs = {
  // Premium Seating
  "chair-executive": {
    name: "Executive Chair",
    colors: { seat: "#1C1C1C", back: "#1C1C1C", legs: "#C0C0C0", accent: "#B5A642" },
    materials: { metallic: 0.9, roughness: 0.1, leather: true },
  },
  "chair-barcelona": {
    name: "Barcelona Chair",
    colors: { seat: "#8B4513", back: "#8B4513", legs: "#C0C0C0", accent: "#2C2C2C" },
    materials: { metallic: 0.8, roughness: 0.2, leather: true },
  },
  "chair-eames": {
    name: "Eames Lounge",
    colors: { seat: "#654321", back: "#654321", legs: "#2C2C2C", accent: "#8B4513" },
    materials: { metallic: 0.3, roughness: 0.4, wood: true },
  },
  "chair-wingback": {
    name: "Wingback Chair",
    colors: { seat: "#1E3A8A", back: "#1E3A8A", legs: "#8B4513", accent: "#B5A642" },
    materials: { metallic: 0.1, roughness: 0.8, fabric: true },
  },

  // Premium Tables
  "table-conference": {
    name: "Conference Table",
    colors: { top: "#2C2C2C", legs: "#C0C0C0", accent: "#B5A642" },
    materials: { metallic: 0.7, roughness: 0.1, glass: true },
  },
  "table-marble": {
    name: "Marble Dining Table",
    colors: { top: "#F8F8FF", legs: "#B5A642", accent: "#2C2C2C" },
    materials: { metallic: 0.2, roughness: 0.05, marble: true },
  },
  "table-glass": {
    name: "Glass Coffee Table",
    colors: { top: "#F0F8FF", legs: "#C0C0C0", accent: "#2C2C2C" },
    materials: { metallic: 0.9, roughness: 0.0, glass: true },
  },
  "table-industrial": {
    name: "Industrial Desk",
    colors: { top: "#8B4513", legs: "#2C2C2C", accent: "#654321" },
    materials: { metallic: 0.6, roughness: 0.3, industrial: true },
  },

  // Premium Lighting
  "lamp-crystal": {
    name: "Crystal Chandelier",
    colors: { frame: "#FFD700", crystals: "#F0F8FF", accent: "#B5A642" },
    materials: { metallic: 0.9, roughness: 0.0, crystal: true },
  },
  "lamp-designer": {
    name: "Designer Floor Lamp",
    colors: { base: "#2C2C2C", pole: "#C0C0C0", shade: "#F5F5DC" },
    materials: { metallic: 0.8, roughness: 0.2, premium: true },
  },
  "lamp-smart": {
    name: "Smart Pendant Light",
    colors: { shade: "#2C2C2C", cord: "#654321", accent: "#4169E1" },
    materials: { metallic: 0.7, roughness: 0.1, tech: true },
  },
  "lamp-vintage": {
    name: "Vintage Edison Lamp",
    colors: { base: "#8B4513", pole: "#B5A642", shade: "#F5F5DC" },
    materials: { metallic: 0.6, roughness: 0.4, vintage: true },
  },

  // Premium Plants
  "plant-bonsai": {
    name: "Bonsai Tree",
    colors: { pot: "#2C2C2C", plant: "#228B22", accent: "#8B4513" },
    materials: { metallic: 0.1, roughness: 0.9, ceramic: true },
  },
  "plant-olive": {
    name: "Olive Tree",
    colors: { pot: "#8B4513", plant: "#556B2F", accent: "#654321" },
    materials: { metallic: 0.0, roughness: 0.8, natural: true },
  },
  "plant-bird": {
    name: "Bird of Paradise",
    colors: { pot: "#654321", plant: "#32CD32", accent: "#228B22" },
    materials: { metallic: 0.0, roughness: 0.9, tropical: true },
  },
  "plant-monstera": {
    name: "Monstera Deliciosa",
    colors: { pot: "#2C2C2C", plant: "#228B22", accent: "#32CD32" },
    materials: { metallic: 0.1, roughness: 0.8, modern: true },
  },

  // Premium Sofas
  "sofa-chesterfield": {
    name: "Chesterfield Sofa",
    colors: { fabric: "#654321", legs: "#2C2C2C", accent: "#B5A642" },
    materials: { metallic: 0.1, roughness: 0.6, leather: true },
  },
  "sofa-sectional": {
    name: "Sectional Sofa",
    colors: { fabric: "#4169E1", legs: "#C0C0C0", accent: "#2C2C2C" },
    materials: { metallic: 0.2, roughness: 0.7, fabric: true },
  },
  "sofa-mid-century": {
    name: "Mid-Century Sofa",
    colors: { fabric: "#8B4513", legs: "#654321", accent: "#DEB887" },
    materials: { metallic: 0.3, roughness: 0.5, vintage: true },
  },
  "sofa-modular": {
    name: "Modular Sofa System",
    colors: { fabric: "#808080", legs: "#2C2C2C", accent: "#C0C0C0" },
    materials: { metallic: 0.4, roughness: 0.4, modern: true },
  },

  // Standard models (fallback)
  "chair-dining": {
    name: "Dining Chair",
    colors: { seat: "#DEB887", back: "#DEB887", legs: "#8B4513" },
    materials: { metallic: 0.0, roughness: 0.6, wood: true },
  },
}

export default function ARScene({ selectedModel, transform, onTransformChange }: ARSceneProps) {
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
        const newRotation = [
          initialTransform.rotation[0],
          initialTransform.rotation[1] + deltaX * Math.PI * 2,
          initialTransform.rotation[2],
        ] as [number, number, number]

        onTransformChange({
          ...initialTransform,
          rotation: newRotation,
        })
      } else {
        const newPosition = [
          initialTransform.position[0] + deltaX * 5,
          initialTransform.position[1] - deltaY * 3,
          initialTransform.position[2],
        ] as [number, number, number]

        onTransformChange({
          ...initialTransform,
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

  useFrame((state) => {
    if (meshRef.current && selectedModel) {
      // Apply transform smoothly
      meshRef.current.position.lerp(new THREE.Vector3(...transform.position), 0.1)
      meshRef.current.rotation.set(...transform.rotation)
      meshRef.current.scale.lerp(new THREE.Vector3(...transform.scale), 0.1)

      // Subtle floating animation for premium feel
      const time = state.clock.getElapsedTime()
      const baseY = transform.position[1]
      meshRef.current.position.y = baseY + Math.sin(time * 1.5) * 0.005
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

  const renderModel = () => {
    // Premium models get enhanced rendering
    if (selectedModel.includes("chair-")) return renderPremiumChair(config)
    if (selectedModel.includes("table-")) return renderPremiumTable(config)
    if (selectedModel.includes("lamp-")) return renderPremiumLamp(config)
    if (selectedModel.includes("plant-")) return renderPremiumPlant(config)
    if (selectedModel.includes("sofa-")) return renderPremiumSofa(config)
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
        material-opacity={0.1}
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
