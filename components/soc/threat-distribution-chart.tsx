"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { PieChart as PieChartIcon } from "lucide-react"
import type { ThreatData } from "@/app/page"

interface ThreatDistributionChartProps {
  data: ThreatData
}

const COLORS = {
  phishing: "#fbbf24", // yellow
  malware: "#f87171", // red
  ransomware: "#a78bfa", // purple
  spyware: "#38bdf8", // cyan
}

const THREAT_LABELS: Record<keyof ThreatData, string> = {
  phishing: "Phishing",
  malware: "Malware",
  ransomware: "Ransomware",
  spyware: "Spyware",
}

export function ThreatDistributionChart({ data }: ThreatDistributionChartProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0)
  
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: THREAT_LABELS[key as keyof ThreatData],
    value,
    percentage: ((value / total) * 100).toFixed(1),
    color: COLORS[key as keyof ThreatData],
  }))

  return (
    <div className="glass-panel rounded-xl p-4 h-[350px]">
      <div className="flex items-center gap-2 mb-4">
        <PieChartIcon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Threat Distribution</h2>
      </div>
      
      <div className="h-[280px] flex items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="transparent"
              animationBegin={0}
              animationDuration={800}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                const RADIAN = Math.PI / 180
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)
                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-sm font-semibold"
                    style={{ 
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                      fontFamily: '"Outfit", sans-serif'
                    }}
                  >
                    {value}
                  </text>
                )
              }}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: `drop-shadow(0 0 8px ${entry.color}80)`,
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "8px",
                color: "#f8fafc",
              }}
              formatter={(value: number) => [`${value} incidents`, "Count"]}
              labelFormatter={(name) => `${name}`}
            />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{
                paddingLeft: "20px",
              }}
              formatter={(value, entry) => {
                const item = chartData.find((d) => d.name === value)
                return (
                  <span className="text-sm text-foreground">
                    {value} <span className="text-muted-foreground">({item?.percentage}%)</span>
                  </span>
                )
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
