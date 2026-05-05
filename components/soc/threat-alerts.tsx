"use client"

import { useState } from "react"
import { AlertTriangle, Shield, Bug, Lock, User, Clock, ChevronDown, ChevronUp, Globe, Compass } from "lucide-react"
import type { Alert, ThreatType } from "@/app/page"

interface ThreatAlertsProps {
  alerts: Alert[]
}

const threatIcons: Record<ThreatType, React.ReactNode> = {
  phishing: <User className="w-4 h-4" />,
  malware: <Bug className="w-4 h-4" />,
  ransomware: <Lock className="w-4 h-4" />,
  spyware: <Shield className="w-4 h-4" />,
  "suspicious-login": <AlertTriangle className="w-4 h-4" />,
}

const severityStyles = {
  critical: {
    bg: "bg-neon-red/10",
    border: "border-neon-red/50",
    text: "text-neon-red",
    badge: "bg-neon-red/20 text-neon-red",
    glow: "animate-pulse-glow",
  },
  warning: {
    bg: "bg-neon-yellow/10",
    border: "border-neon-yellow/50",
    text: "text-neon-yellow",
    badge: "bg-neon-yellow/20 text-neon-yellow",
    glow: "",
  },
  info: {
    bg: "bg-neon-cyan/10",
    border: "border-neon-cyan/50",
    text: "text-neon-cyan",
    badge: "bg-neon-cyan/20 text-neon-cyan",
    glow: "",
  },
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

function AlertCard({ alert, index }: { alert: Alert; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const styles = severityStyles[alert.severity]

  return (
    <div
      className={`${styles.bg} ${styles.border} border rounded-lg p-3 animate-slide-in ${alert.severity === "critical" ? styles.glow : ""}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className={`${styles.badge} p-2 rounded-lg`}>
          {threatIcons[alert.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold uppercase ${styles.text}`}>
              {alert.severity}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {alert.type.replace("-", " ")}
            </span>
          </div>
          <p className={`text-sm text-foreground ${isExpanded ? "" : "truncate"}`}>
            {alert.message}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">
              {formatTime(alert.timestamp)}
            </span>
          </div>
          
          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1 mt-2 text-xs ${styles.text} hover:opacity-80 transition-opacity`}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                Show Details
              </>
            )}
          </button>
          
          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
              <p className="text-sm text-foreground">{alert.message}</p>
              
              {alert.source && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Source: <span className="text-foreground">{alert.source}</span>
                  </span>
                </div>
              )}
              
              {alert.continent && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Continent: <span className="text-foreground">{alert.continent}</span>
                  </span>
                </div>
              )}
              
              {alert.direction && (
                <div className="flex items-center gap-2">
                  <Compass className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Direction: <span className="text-foreground">{alert.direction}</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ThreatAlerts({ alerts }: ThreatAlertsProps) {
  return (
    <div className="glass-panel rounded-xl p-4 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-neon-red" />
          <h2 className="text-lg font-bold text-foreground">Threat Alerts</h2>
        </div>
        <span className="px-2 py-1 text-xs font-mono bg-neon-red/20 text-neon-red rounded-full">
          {alerts.length} Active
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Shield className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-sm">No active threats detected</p>
            <p className="text-xs">System is secure</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <AlertCard key={alert.id} alert={alert} index={index} />
          ))
        )}
      </div>
    </div>
  )
}
