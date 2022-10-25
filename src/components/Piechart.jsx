import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Supply - Demand Relationship',
        },
    },
};


const Piechart = (props) => {

    const {cropData} = props;
    let supply = 0.0;
    let demand = 0.0;

    cropData.map(crop => {
        crop.types.map(type => {
            supply += type.supply;
            demand += type.demand;
        });
    });

    console.log('PS', supply);
    console.log('PD', demand);

    const data = {

        labels: ['Demand', 'Supply'],
        datasets: [
            {
                label: '# of Votes',
                data: [demand, supply],
                // data: [60, 40],
                backgroundColor: [
                    '#fde047',
                    '#65a30d',
                ],
                borderColor: [
                    '#fde047',
                    '#65a30d',
                ],
                hoverBackgroundColor: [
                    '#fbbf24',
                    '#166534',

                ],
                //   radius: 100,
                borderWidth: 1,
            },
        ],
    };

    return (
        <Doughnut data={data} height={240}   options={options}

        />
    )
}

export default Piechart




