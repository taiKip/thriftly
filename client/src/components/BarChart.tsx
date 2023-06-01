import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { createTheme } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface barChartProps {
  barData: number[]
  label: string
  labels: string[]
  aspectRatio?: boolean
}
const BarChart = ({ barData, label, labels, aspectRatio }: barChartProps) => {
  const theme = createTheme()
  const options = {
    responsive: true,
    maintainAspectRatio: aspectRatio || false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: false
      }
    }
  }
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: barData,
        backgroundColor: 'purple'
      }
    ]
  }

  return <Bar data={data} options={options} />
}

export default BarChart
