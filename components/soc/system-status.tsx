"use client"

import { Shield, Wifi, Server, AlertTriangle, CheckCircle } from "lucide-react"
import type { ThreatLevel } from "@/app/page"

interface SystemStatusProps {
  threatLevel: ThreatLevel
  incidentCount: number
}

const threatLevelConfig: Record<ThreatLevel, { label: string; color: string; glow: string }> = {
  low: { label: "LOW", color: "text-neon-green", glow: "text-glow-green" },
  moderate: { label: "MODERATE", color: "text-neon-yellow", glow: "" },
  high: { label: "HIGH", color: "text-neon-red", glow: "text-glow-red" },
  critical: { label: "CRITICAL", color: "text-neon-red", glow: "text-glow-red" },
}

const statusItems = [
  { name: "Firewall", icon: Shield, status: "Active" },
  { name: "Antivirus", icon: Server, status: "Running" },
  { name: "Network Security", icon: Wifi, status: "Stable" },
]

export function SystemStatus({ threatLevel, incidentCount }: SystemStatusProps) {
  const levelConfig = threatLevelConfig[threatLevel]
  
  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">System Status</h2>
      </div>
      
      <div className="space-y-4">
        {/* Status Items */}
        {statusItems.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-green/10 rounded-lg">
                <item.icon className="w-4 h-4 text-neon-green" />
              </div>
              <span className="text-sm font-medium text-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-neon-green" />
              <span className="text-sm text-neon-green font-medium">{item.status}</span>
            </div>
          </div>
        ))}
        
        {/* Threat Level Indicator */}
        <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-5 h-5 ${levelConfig.color} ${threatLevel === "critical" ? "animate-pulse" : ""}`} />
              <span className="text-sm font-medium text-muted-foreground">Threat Level</span>
            </div>
            <span className={`text-lg font-bold ${levelConfig.color} ${levelConfig.glow}`}>
              {levelConfig.label}
            </span>
          </div>
          
          {/* Threat Level Progress Bar */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                threatLevel === "low" ? "w-1/4 bg-neon-green" :
                threatLevel === "moderate" ? "w-2/4 bg-neon-yellow" :
                threatLevel === "high" ? "w-3/4 bg-neon-red" :
                "w-full bg-neon-red animate-pulse"
              }`}
              style={{
                boxShadow: threatLevel === "critical" 
                  ? "0 0 10px var(--neon-red)" 
                  : threatLevel === "high"
                  ? "0 0 5px var(--neon-red)"
                  : "none"
              }}
            />
          </div>
          
          {/* Incident Counter */}
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Active Incidents</span>
            <span className={`font-mono font-bold ${incidentCount > 0 ? levelConfig.color : "text-foreground"}`}>
              {incidentCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
