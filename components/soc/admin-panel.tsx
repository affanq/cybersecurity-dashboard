"use client"

import { Settings, Fish, Bug, Lock, Eye, User, RotateCcw, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ThreatType } from "@/app/page"

interface AdminPanelProps {
  onSimulateAttack: (type: ThreatType) => void
  onReset: () => void
}

const attackButtons: { type: ThreatType; label: string; icon: React.ReactNode; color: string }[] = [
  { type: "phishing", label: "Phishing Attack", icon: <Fish className="w-4 h-4" />, color: "hover:bg-neon-yellow/20 hover:border-neon-yellow/50 hover:text-neon-yellow" },
  { type: "malware", label: "Malware Detection", icon: <Bug className="w-4 h-4" />, color: "hover:bg-neon-red/20 hover:border-neon-red/50 hover:text-neon-red" },
  { type: "ransomware", label: "Ransomware Attack", icon: <Lock className="w-4 h-4" />, color: "hover:bg-destructive/20 hover:border-destructive/50 hover:text-destructive" },
  { type: "spyware", label: "Spyware Activity", icon: <Eye className="w-4 h-4" />, color: "hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:text-neon-cyan" },
  { type: "suspicious-login", label: "Suspicious Login", icon: <User className="w-4 h-4" />, color: "hover:bg-neon-yellow/20 hover:border-neon-yellow/50 hover:text-neon-yellow" },
]

export function AdminPanel({ onSimulateAttack, onReset }: AdminPanelProps) {
  return (
    <div className="glass-panel rounded-xl p-4 border-primary/30">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Simulation Controls</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Click to simulate cyber incidents
        </p>
        
        {attackButtons.map((btn) => (
          <Button
            key={btn.type}
            variant="outline"
            className={`w-full justify-start gap-2 bg-secondary/30 border-border/50 text-foreground transition-all duration-200 ${btn.color}`}
            onClick={() => onSimulateAttack(btn.type)}
          >
            {btn.icon}
            <span>Simulate {btn.label}</span>
          </Button>
        ))}
        
        <div className="pt-3 mt-3 border-t border-border/50">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 bg-neon-green/10 border-neon-green/30 text-neon-green hover:bg-neon-green/20 hover:border-neon-green/50 transition-all"
            onClick={onReset}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset System</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
