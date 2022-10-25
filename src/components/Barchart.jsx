import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },

        title: {
            display: true,
            text: 'Completed Supply of Crops',
        },
    },
    scales: {
        y:
            {
                min: 0,
                max: 100,
                stepSize: 10,
            },
    },

};


const Barchart = (props) => {

    const {cropData} = props;
    const labels = [];
    const typeData = [];

    cropData.map(crop => {
        labels.push(crop.category);
        let totalSupply = 0.0;
        let totalDemand = 0.0;
        let percSupply = 0.0;
        crop.types.map(type => {
            totalSupply += type.supply;
            totalDemand += type.demand;
        });
        percSupply = ((totalSupply / totalDemand) * 100);
        typeData.push(percSupply);
    });

    console.log('BC', labels);
    console.log('TS', typeData);

    const data = {
        // labels,
        labels,
        datasets: [
            {
                // label: 'Rice',
                data: typeData,
                // data: [45,64,32,78,91],
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: ["#4d7c0f", "#eab308", "#064e3b","#a3e635", "#ca8a04"],
                barThickness: 60,
            },
        ],
    };

    return (
        <Bar  data={data} width={100} height={320} options={options}  />
    )
}

export default Barchart

