import axios from "axios"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart() {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/1mo2/task/main/db.json')
            .then(({ data }) => setUserData(data.transactions))
            .catch((err) => console.log(err))
    }, [])

    const chartData = {
        labels: userData.map((data) => data.date),
        datasets: [
            {
                label: 'Dataset',
                data: userData.map((data) => data.amount),
                borderColor: '#85bb65', // Changed to a teal color
                backgroundColor: '#85bb65', // Changed to a lighter teal
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
    }
    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: '#FFF' // Changed x-axis label color to blue
                }
            },
            y: {
                ticks: {
                    color: '#FFF' // Changed y-axis label color to pink
                }
            }
        }
    }

    return (
        <>

        <div className="w-full">
            <h1>Charts Component</h1>
            <Line className="w-100" data={chartData}  options={chartOptions}/>
        </div> 
        

            
        </>
    )
}

export default Chart