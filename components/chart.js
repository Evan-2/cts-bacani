import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
ChartJS.register(ArcElement, Tooltip, Legend)

export const Chart = ({ covid }) => {
    const data = {
        labels: ["Positive", "Negative", "Asymptomatic"],
        datasets: [
            {
                label: "Covid-19 Overview",
                data: covid,
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 2
            }
        ]
    }

    return (
        <div className="chart container">
            <Doughnut data={data}></Doughnut>
        </div>
    )
}

export default Chart
