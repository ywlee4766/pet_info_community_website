import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
  
import styled from "styled-components";

const ResultContainer = styled.div`
  width: 100%;
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);
  

const ShowResult = ({labels, probabilities}) => {
        // data: probabilities.map(() => Math.random()*100),
    const data = {
        labels,
        datasets: [
            {
            data: probabilities,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
            borderWidth: 0,
            },
        },
        responsive: false,
        plugins: {
            title: {
            display: false,
            },
        },
        scales: {
            x: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 10
                }
            }
        }
    };
    return (
        <ResultContainer>
           분석 결과
           <Bar data={data} width={400} height={'160'} options={options} />
        </ResultContainer>
    )
}





export default ShowResult;