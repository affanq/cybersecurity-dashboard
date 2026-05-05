"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/soc/header"
import { ThreatAlerts } from "@/components/soc/threat-alerts"
import { ThreatDistributionChart } from "@/components/soc/threat-distribution-chart"
import { SystemStatus } from "@/components/soc/system-status"
import { ActivityLog } from "@/components/soc/activity-log"
import { AdminPanel } from "@/components/soc/admin-panel"
import { AttackOrigins } from "@/components/soc/attack-origins"

export type ThreatType = "phishing" | "malware" | "ransomware" | "spyware" | "suspicious-login"
export type ThreatLevel = "low" | "moderate" | "high" | "critical"

export interface Alert {
  id: string
  type: ThreatType
  severity: "critical" | "warning" | "info"
  message: string
  timestamp: Date
  source?: string
  continent?: string
  direction?: string
}

export interface LogEntry {
  id: string
  message: string
  timestamp: Date
  type: "success" | "warning" | "error" | "info"
}

export interface ThreatData {
  phishing: number
  malware: number
  ransomware: number
  spyware: number
}

const initialThreatData: ThreatData = {
  phishing: 40,
  malware: 25,
  ransomware: 20,
  spyware: 15,
}

const threatMessages: Record<ThreatType, { alert: string; log: string; severity: Alert["severity"] }> = {
  phishing: {
    alert: "Phishing attempt detected from suspicious email",
    log: "Phishing email blocked and quarantined",
    severity: "warning",
  },
  malware: {
    alert: "Malware signature detected in network traffic",
    log: "Malware detected and quarantined successfully",
    severity: "critical",
  },
  ransomware: {
    alert: "CRITICAL: Ransomware encryption attempt blocked",
    log: "Ransomware attack neutralized - files protected",
    severity: "critical",
  },
  spyware: {
    alert: "Spyware activity detected on endpoint",
    log: "Spyware removed from system",
    severity: "warning",
  },
  "suspicious-login": {
    alert: "Suspicious login attempt from unknown location",
    log: "Suspicious login attempt flagged and blocked",
    severity: "warning",
  },
}

const attackSources = [
  { name: "Russia", continent: "Europe", direction: "East" },
  { name: "China", continent: "Asia", direction: "East" },
  { name: "North Korea", continent: "Asia", direction: "East" },
  { name: "Iran", continent: "Asia", direction: "East" },
  { name: "Unknown VPN", continent: "Unknown", direction: "Unknown" },
  { name: "Tor Network", continent: "Unknown", direction: "Unknown" },
  { name: "Brazil", continent: "South America", direction: "South" },
  { name: "Nigeria", continent: "Africa", direction: "South" },
  { name: "Canada", continent: "North America", direction: "North" },
  { name: "Germany", continent: "Europe", direction: "West" },
]

export default function SOCDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [threatData, setThreatData] = useState<ThreatData>(initialThreatData)
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>("low")
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const [incidentCount, setIncidentCount] = useState(0)

  const playAlertSound = useCallback(() => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.value = 0.1
      
      oscillator.start()
      setTimeout(() => {
        oscillator.stop()
        audioContext.close()
      }, 200)
    }
  }, [soundEnabled])

  const updateThreatLevel = useCallback((count: number) => {
    if (count >= 10) {
      setThreatLevel("critical")
    } else if (count >= 6) {
      setThreatLevel("high")
    } else if (count >= 3) {
      setThreatLevel("moderate")
    } else {
      setThreatLevel("low")
    }
  }, [])

  const simulateAttack = useCallback((type: ThreatType) => {
    const config = threatMessages[type]
    const sourceData = attackSources[Math.floor(Math.random() * attackSources.length)]
    
    // Add alert
    const newAlert: Alert = {
      id: `alert-${Date.now()}-${Math.random()}`,
      type,
      severity: config.severity,
      message: config.alert,
      timestamp: new Date(),
      source: sourceData.name,
      continent: sourceData.continent,
      direction: sourceData.direction,
    }
    setAlerts(prev => [newAlert, ...prev].slice(0, 50))
    
    // Add log entry
    const newLog: LogEntry = {
      id: `log-${Date.now()}-${Math.random()}`,
      message: config.log,
      timestamp: new Date(),
      type: config.severity === "critical" ? "error" : "warning",
    }
    setLogs(prev => [newLog, ...prev].slice(0, 100))
    
    // Update threat distribution
    const threatKey = type === "suspicious-login" ? "phishing" : type
    setThreatData(prev => ({
      ...prev,
      [threatKey]: prev[threatKey as keyof ThreatData] + 2,
    }))
    
    // Update incident count and threat level
    setIncidentCount(prev => {
      const newCount = prev + 1
      updateThreatLevel(newCount)
      return newCount
    })
    
    // Trigger visual effects
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 500)
    
    // Play sound
    playAlertSound()
  }, [playAlertSound, updateThreatLevel])

  const resetSystem = useCallback(() => {
    setAlerts([])
    setLogs([{
      id: `log-${Date.now()}`,
      message: "System reset - All threats cleared",
      timestamp: new Date(),
      type: "success",
    }])
    setThreatData(initialThreatData)
    setThreatLevel("low")
    setIncidentCount(0)
    setIsFlashing(false)
  }, [])

  // Add initial log entries
  useEffect(() => {
    const initialLogs: LogEntry[] = [
      { id: "1", message: "System initialized successfully", timestamp: new Date(), type: "success" },
      { id: "2", message: "Firewall rules updated", timestamp: new Date(Date.now() - 60000), type: "info" },
      { id: "3", message: "Security scan completed - no threats found", timestamp: new Date(Date.now() - 120000), type: "success" },
    ]
    setLogs(initialLogs)
  }, [])

  return (
    <div className={`min-h-screen bg-background relative overflow-hidden transition-all duration-300 ${isFlashing ? "bg-red-950/20" : ""}`}>
      {/* Background grid effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      
      <div className="relative z-10">
        <Header threatLevel={threatLevel} soundEnabled={soundEnabled} onSoundToggle={() => setSoundEnabled(!soundEnabled)} />
        
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Alerts & Activity */}
            <div className="lg:col-span-4 space-y-6">
              <ThreatAlerts alerts={alerts} />
              <ActivityLog logs={logs} />
            </div>
            
            {/* Center Column - Charts & Status */}
            <div className="lg:col-span-5 space-y-6">
              <ThreatDistributionChart data={threatData} />
              <AttackOrigins alerts={alerts} />
            </div>
            
            {/* Right Column - System Status & Admin */}
            <div className="lg:col-span-3 space-y-6">
              <SystemStatus threatLevel={threatLevel} incidentCount={incidentCount} />
              <AdminPanel onSimulateAttack={simulateAttack} onReset={resetSystem} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
