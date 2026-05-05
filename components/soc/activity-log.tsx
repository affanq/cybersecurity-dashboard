"use client"

import { ScrollText, CheckCircle, AlertCircle, XCircle, Info, Clock } from "lucide-react"
import type { LogEntry } from "@/app/page"

interface ActivityLogProps {
  logs: LogEntry[]
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    color: "text-neon-green",
    bg: "bg-neon-green/10",
  },
  warning: {
    icon: AlertCircle,
    color: "text-neon-yellow",
    bg: "bg-neon-yellow/10",
  },
  error: {
    icon: XCircle,
    color: "text-neon-red",
    bg: "bg-neon-red/10",
  },
  info: {
    icon: Info,
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
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

export function ActivityLog({ logs }: ActivityLogProps) {
  return (
    <div className="glass-panel rounded-xl p-4 h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Activity Log</h2>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="font-mono">Live</span>
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-thin font-mono text-xs">
        {logs.map((log, index) => {
          const config = typeConfig[log.type]
          const Icon = config.icon
          
          return (
            <div
              key={log.id}
              className={`flex items-start gap-2 p-2 rounded ${config.bg} animate-slide-in`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <Icon className={`w-3 h-3 mt-0.5 ${config.color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <span className="text-muted-foreground">[{formatTime(log.timestamp)}]</span>{" "}
                <span className="text-foreground">{log.message}</span>
              </div>
            </div>
          )
        })}
        
        {logs.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No activity logged</p>
          </div>
        )}
      </div>
    </div>
  )
}
