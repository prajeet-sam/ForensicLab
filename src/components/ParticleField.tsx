import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: string
  baseAlpha: number
  phase: number
  spark: boolean
}

const PALETTE = ['#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#e11d48', '#ff5ec2']

const LINK_DIST = 120
const MOUSE_FIELD = 160
const MOUSE_LINK = 180

export function ParticleField({ density = 18000 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    let particles: Particle[] = []
    const pointer = { x: -9999, y: -9999, active: false }
    let lastMove = 0

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(30, Math.min(90, Math.floor((width * height) / density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        hue: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        baseAlpha: 0.25 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        spark: Math.random() < 0.12,
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        const wobble = Math.sin(t / 1400 + p.phase) * 0.05
        p.x += p.vx + wobble
        p.y += p.vy
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_FIELD * MOUSE_FIELD && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = (1 - d / MOUSE_FIELD) * 0.9
            p.x += (dx / d) * force
            p.y += (dy / d) * force
          }
        }

        const breathe = 0.75 + Math.sin(t / 900 + p.phase * 2) * 0.25
        ctx.globalAlpha = p.baseAlpha * breathe
        ctx.fillStyle = p.hue
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        if (p.spark) {
          ctx.globalAlpha = p.baseAlpha * 0.35 * breathe
          ctx.shadowColor = p.hue
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.16
            ctx.globalAlpha = alpha
            ctx.strokeStyle = '#ec4899'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      if (pointer.active) {
        for (const p of particles) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_LINK * MOUSE_LINK) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_LINK) * 0.12
            ctx.globalAlpha = alpha
            ctx.strokeStyle = '#f472b6'
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()
          }
        }
        ctx.globalAlpha = 0.5
        ctx.fillStyle = '#f472b6'
        ctx.shadowColor = '#f472b6'
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 2.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      ctx.globalAlpha = 1
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
      lastMove = Date.now()
    }

    const onLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    build()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', build)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}