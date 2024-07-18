import axios from "axios"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart() {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/1mo2/task/main/db.json')
            .then(({ data }) => setUserData(data.transactions))
            .catch((err) => console.log(err))
    }, [])



    return (
        <>

        <div className="w-full">
            <Line className="w-100" data={chartData}  options={chartOptions}/>
        </div> 
        

            
        </>
    )
}

export default Chart