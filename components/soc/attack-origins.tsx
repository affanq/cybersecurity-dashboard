"use client"

import { Globe, MapPin } from "lucide-react"
import type { Alert } from "@/app/page"

interface AttackOriginsProps {
  alerts: Alert[]
}

// Count attacks by source
function countBySource(alerts: Alert[]): { source: string; count: number }[] {
  const counts: Record<string, number> = {}
  
  alerts.forEach((alert) => {
    if (alert.source) {
      counts[alert.source] = (counts[alert.source] || 0) + 1
    }
  })
  
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
}

const sourceColors: Record<string, string> = {
  "Russia": "bg-neon-red",
  "China": "bg-neon-yellow",
  "North Korea": "bg-destructive",
  "Iran": "bg-orange-500",
  "Unknown VPN": "bg-neon-cyan",
  "Tor Network": "bg-purple-500",
  "Eastern Europe": "bg-pink-500",
  "Southeast Asia": "bg-emerald-500",
}

export function AttackOrigins({ alerts }: AttackOriginsProps) {
  const sources = countBySource(alerts)
  const maxCount = Math.max(...sources.map(s => s.count), 1)
  
  return (
    <div className="glass-panel rounded-xl p-4 h-[300px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Attack Origins</h2>
      </div>
      
      {sources.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
          <MapPin className="w-12 h-12 mb-2 opacity-50" />
          <p className="text-sm">No attack origins detected</p>
          <p className="text-xs">Simulate attacks to see origins</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {sources.map((item, index) => {
            const barWidth = (item.count / maxCount) * 100
            const color = sourceColors[item.source] || "bg-neon-cyan"
            
            return (
              <div
                key={item.source}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3 h-3 ${color.replace("bg-", "text-")}`} />
                    <span className="text-sm text-foreground">{item.source}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {item.count} {item.count === 1 ? "attack" : "attacks"}
                  </span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} transition-all duration-500 rounded-full`}
                    style={{ 
                      width: `${barWidth}%`,
                      boxShadow: `0 0 10px ${color.includes("neon") ? `var(--${color.replace("bg-", "")})` : "currentColor"}`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
