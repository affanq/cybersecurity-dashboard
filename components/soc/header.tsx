"use client"

import { Shield, Volume2, VolumeOff, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ThreatLevel } from "@/app/page"

interface HeaderProps {
  threatLevel: ThreatLevel
  soundEnabled: boolean
  onSoundToggle: () => void
}

export function Header({ threatLevel, soundEnabled, onSoundToggle }: HeaderProps) {
  const statusColor = threatLevel === "critical" || threatLevel === "high" 
    ? "text-neon-red" 
    : threatLevel === "moderate" 
    ? "text-neon-yellow" 
    : "text-neon-green"

  const statusGlow = threatLevel === "critical" || threatLevel === "high" 
    ? "text-glow-red" 
    : "text-glow-green"

  return (
    <header className="glass-panel border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-10 h-10 text-primary" />
              <div className="absolute inset-0 blur-md bg-primary/30 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                <span className="text-primary text-glow-cyan">CyberShield</span> Security Dashboard
              </h1>
              <p className="text-xs text-muted-foreground font-mono">v1.0</p>
            </div>
          </div>

          {/* Status & Controls */}
          <div className="flex items-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-2 px-4 py-2 glass-panel rounded-full">
              <Activity className={`w-4 h-4 ${statusColor} ${threatLevel === "critical" ? "animate-pulse" : ""}`} />
              <span className="text-sm font-medium text-muted-foreground">System Status:</span>
              <span className={`text-sm font-bold uppercase ${statusColor} ${statusGlow}`}>
                ACTIVE
              </span>
              <span className={`w-2 h-2 rounded-full ${statusColor === "text-neon-green" ? "bg-neon-green" : statusColor === "text-neon-yellow" ? "bg-neon-yellow" : "bg-neon-red"} animate-pulse`} />
            </div>

            {/* Sound Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSoundToggle}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeOff className="w-5 h-5" />}
              <span className="sr-only">{soundEnabled ? "Mute alerts" : "Enable alert sounds"}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
