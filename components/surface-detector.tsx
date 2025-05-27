"use client"

import { useRef, useEffect, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Plane, Text } from "@react-three/drei"
import * as THREE from "three"

interface SurfaceDetectorProps {
  onSurfaceDetected: (position: [number, number, number], normal: [number, number, number]) => void
}

export default function SurfaceDetector({ onSurfaceDetected }: SurfaceDetectorProps) {
  const [detectedSurfaces, setDetectedSurfaces] = useState<
    Array<{
      position: [number, number, number]
      normal: [number, number, number]
      confidence: number
    }>
  >([])
  const raycaster = useRef(new THREE.Raycaster())
  const { camera, scene } = useThree()

  useEffect(() => {
    // Simulate surface detection using raycasting
    const detectSurfaces = () => {
      const surfaces = []

      // Cast rays in a grid pattern to detect horizontal surfaces
      for (let x = -2; x <= 2; x += 0.5) {
        for (let z = -2; z <= 2; z += 0.5) {
          raycaster.current.set(new THREE.Vector3(x, 2, z), new THREE.Vector3(0, -1, 0))

          // Simulate ground plane detection
          const groundY = -0.5
          const distance = 2 - groundY

          if (distance > 0 && distance < 5) {
            surfaces.push({
              position: [x, groundY, z] as [number, number, number],
              normal: [0, 1, 0] as [number, number, number],
              confidence: Math.max(0.5, 1 - distance / 5),
            })
          }
        }
      }

      setDetectedSurfaces(surfaces)

      // Notify parent of best surface
      if (surfaces.length > 0) {
        const bestSurface = surfaces.reduce((best, current) => (current.confidence > best.confidence ? current : best))
        onSurfaceDetected(bestSurface.position, bestSurface.normal)
      }
    }

    const interval = setInterval(detectSurfaces, 1000)
    detectSurfaces() // Initial detection

    return () => clearInterval(interval)
  }, [onSurfaceDetected])

  return (
    <>
      {/* Render detected surfaces as subtle indicators */}
      {detectedSurfaces.map((surface, index) => (
        <group key={index} position={surface.position}>
          <Plane args={[0.3, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#00ff00" transparent opacity={surface.confidence * 0.3} side={THREE.DoubleSide} />
          </Plane>
          {surface.confidence > 0.8 && (
            <Text position={[0, 0.1, 0]} fontSize={0.05} color="#00ff00" anchorX="center" anchorY="middle">
              Surface Detected
            </Text>
          )}
        </group>
      ))}
    </>
  )
}
